export const GET_ITEM_COUNT = 7;
export const VISIBILITY_TIMEOUT = 60 * 1000;
export const MAX_ATTEMPTS = 10;

/**
 * The IndexedDbEventCountGuard uses this EVENT_COUNT_LIMIT to limit the number of analytics events
 * stored in AWC IndexedDB object store per product.
 *
 * The EventCountGuards uses this EVENT_COUNT_LIMIT to limit the number of analytics events
 * stored in AWC resilienceDB.
 */
 export const EVENT_COUNT_LIMIT: number = 5000;
