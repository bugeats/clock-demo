import { Degrees } from './types';

export function safeDegrees (n?: number): Degrees {
  if (!Number.isFinite(n)) {
    return 0;
  }

  return Math.max(0, (n || 0) % 360);
}


