import { COMMERCE_LIBRARIES, CommerceService, UNKNOWN } from './index';

export const responsibleServiceIncludesCommerceLibraries = (
  responsibleService: CommerceService,
): boolean =>
  responsibleService === COMMERCE_LIBRARIES || responsibleService === UNKNOWN;
