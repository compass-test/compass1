import { StartExtensionsOptions } from './types';
import { createProductExtensions } from './utils';

export { Editions } from './types';
export type { StartExtensionsOptions } from './types';

export const startExtensionsWhitelist = ['edition', 'migrationSourceUuid'];

export const createStartExtensions = createProductExtensions<
  StartExtensionsOptions
>(startExtensionsWhitelist);
