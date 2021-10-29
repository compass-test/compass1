import type { CloudProduct } from '../../../../common/types';

import { jiraConstants } from './constants';

/***
 * Commenting this code as JSM is now available
 */
// const getSupportedCloudProducts = (
//   cloudProducts: CloudProduct[],
// ): CloudProduct[] => {
//   return (
//     cloudProducts
//       // Filter out JSD until it's supported
//       .filter(({ productKey }) => {
//         return productKey !== 'jira-servicedesk.ondemand';
//       })
//   );
// };

export const getSupportedProductNamesAndEditions = (
  cloudProducts: CloudProduct[],
): { productName: string; productEdition: string }[] => {
  const scores = jiraConstants.cloudProductScores;
  const names = jiraConstants.cloudProductNames;
  const editions = jiraConstants.cloudEditionNames;

  return cloudProducts
    .sort((p1, p2) => {
      return scores[p1.productKey] - scores[p2.productKey];
    })
    .map(({ edition, productKey }) => {
      const productName = names[productKey];
      const productEdition = editions[edition];

      return {
        productName,
        productEdition,
      };
    });
};
