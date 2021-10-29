import { ErrorWithStatus } from '../types';

/**
 * We use this helper to detect a real failed requests from service so that we can count number of fa operation events.
 */
export function isRealErrorFromService(error?: ErrorWithStatus) {
  if (!error) {
    return false;
  }

  // we don't count 401 or 403 as a real error from services
  return !(error.status === 401 || error.status === 403);
}
