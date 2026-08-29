import Constants from 'expo-constants';

const BACKEND_PORT = 3000;

/**
 * In Expo Go / dev builds, derive the API host from the Metro bundler's own
 * host (works for the simulator, emulator, and a physical device on the same
 * Wi-Fi network). Falls back to localhost for web/simulator edge cases.
 */
export function getApiUrl(): string {
  const hostUri = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.hostUri;
  const host = hostUri?.split(':')[0];
  return `http://${host ?? 'localhost'}:${BACKEND_PORT}`;
}
