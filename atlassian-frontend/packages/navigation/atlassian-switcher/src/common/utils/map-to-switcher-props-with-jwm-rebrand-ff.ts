/**
 * This will need to be removed once JWM rebrand is rolled out to 100%.
 */

import {
  AvailableProductDetails,
  ProductConfigurationMap,
  SwitcherProductType,
} from '../../types';

export const getProductDataWithJwmRebrandFF = (
  productConfigurationMap: ProductConfigurationMap,
  productType: SwitcherProductType,
  jwmRebrandEnabled?: boolean,
): AvailableProductDetails | undefined => {
  if (productType === 'JIRA_BUSINESS' && jwmRebrandEnabled) {
    return productConfigurationMap['JIRA_WORK_MANAGEMENT'];
  }

  return productConfigurationMap[productType];
};
