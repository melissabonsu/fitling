import { getApiUrl } from '@/config/api';
import { getToken } from '@/lib/auth';

export type FitlingStats = {
  strength: number;
  stamina: number;
  discipline: number;
  confidence: number;
  flexibility: number;
  style: number;
  recovery: number;
};

export type Fitling = {
  id: number;
  name: string;
  level: number;
  xp: number;
  stats: FitlingStats;
};

export class UnauthorizedError extends Error {}

export async function getFitling(): Promise<Fitling> {
  const token = await getToken();
  if (!token) throw new UnauthorizedError();

  const response = await fetch(`${getApiUrl()}/api/fitling`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 401) throw new UnauthorizedError();
  if (!response.ok) throw new Error('Failed to load Fitling');

  return response.json();
}
