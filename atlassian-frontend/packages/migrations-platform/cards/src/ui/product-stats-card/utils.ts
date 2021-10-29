import { getBytesSize, pluralize } from '@atlassian/mpt-utils';

import type { ProductInstanceStats, ProductKey } from './types';

export const formatSizeOfAttachments = (
  productKey: ProductKey,
  sizeOfAttachments: number,
): string => {
  return productKey !== 'bitbucket-server'
    ? `, ${getBytesSize(sizeOfAttachments)}`
    : '';
};

export const buildGetNumberOfContainers = (
  productKey: ProductKey,
  objectsUnit: string,
  objectsUnitPlural?: string,
) => {
  return (stats?: ProductInstanceStats): string | null => {
    if (!stats) {
      return null;
    }
    if (productKey === 'jira-server') {
      return `${stats.numberOfContainers}`;
    }
    return `${stats.numberOfContainers} (${stats.numberOfObjects} ${pluralize(
      stats.numberOfObjects,
      objectsUnit,
      objectsUnitPlural,
      !!objectsUnitPlural,
    )}${formatSizeOfAttachments(productKey, stats.sizeOfAttachments)})`;
  };
};
