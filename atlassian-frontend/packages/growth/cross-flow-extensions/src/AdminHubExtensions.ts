import { AdminHubExtensionsOptions } from './types';
import { createProductExtensions } from './utils';

export { Editions } from './types';
export type { AdminHubExtensionsOptions } from './types';

export const adminHubExtensionsWhitelist = ['edition', 'migrationSourceUuid'];

export const createAdminHubExtensions = createProductExtensions<
  AdminHubExtensionsOptions
>(adminHubExtensionsWhitelist);
