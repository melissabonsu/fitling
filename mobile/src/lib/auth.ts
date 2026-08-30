import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { getApiUrl } from '@/config/api';

const TOKEN_KEY = 'fitling_auth_token';

export type AuthUser = { id: number; name: string | null; email: string };
export type AuthResult = { token: string; user: AuthUser };

export class AuthError extends Error {
  constructor(public messages: string[]) {
    super(messages.join(', '));
  }
}

async function postForm(path: string, fields: Record<string, string>): Promise<AuthResult> {
  const body = Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  let response: Response;
  try {
    response = await fetch(`${getApiUrl()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    throw new AuthError(["Can't reach the Fitling server. Make sure the backend is running."]);
  }

  const data = await response.json();

  if (!response.ok) {
    throw new AuthError(data.errors ?? ['Something went wrong. Please try again.']);
  }

  return data as AuthResult;
}

export function signUp(name: string, email: string, password: string): Promise<AuthResult> {
  return postForm('/api/signup', { name, email, password });
}

export function logIn(email: string, password: string): Promise<AuthResult> {
  return postForm('/api/login', { email, password });
}

// expo-secure-store has no web implementation (there's no OS keychain to back
// it), so the web build — used for local preview/testing, not a shipped
// target — falls back to localStorage instead of throwing.
export async function saveToken(token: string): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken(): Promise<void> {
  if (Platform.OS === 'web') {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
