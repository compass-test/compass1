import { AccessProductId, ProductKeys } from '../../common/constants';

export const getProductId = (product: ProductKeys): string => {
  switch (product) {
    case ProductKeys.JIRA_SOFTWARE:
      return AccessProductId.JIRA_SOFTWARE;
    case ProductKeys.CONFLUENCE:
      return AccessProductId.CONFLUENCE;
    default:
      return AccessProductId.JIRA_SOFTWARE;
  }
};
