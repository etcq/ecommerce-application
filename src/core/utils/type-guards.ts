import { ICategoryRedirectState } from '@/interfaces/interfaces.ts';

export function isLocationState(state: unknown, stateItem: string): state is ICategoryRedirectState {
  return typeof state === 'object' && state !== null && stateItem in state;
}
