import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { ProviderInlineValue } from '@atlassian/mpt-elements';
import { getBytesSize, pluralize, toTitleCase } from '@atlassian/mpt-utils';

import DataGridCard from '../data-grid-card';

import { productConstants } from './constants';
import messages from './messages';
import type {
  GetAppsStats,
  GetCustomersStats,
  GetProductInstanceStats,
  GetUsersAndGroupsStats,
  ProductKey,
} from './types';
import { buildGetNumberOfContainers } from './utils';
export type Props = {
  productKey: ProductKey;
  getProductInstanceStats?: GetProductInstanceStats;
  getUsersAndGroupsStats?: GetUsersAndGroupsStats;
  getAppsStats?: GetAppsStats;
  getCustomersStats?: GetCustomersStats;
};

const ProductStatsCard: FC<Props & InjectedIntlProps> = ({
  intl,
  productKey,
  getProductInstanceStats,
  getUsersAndGroupsStats,
  getAppsStats,
  getCustomersStats,
}) => {
  const { containersUnit, objectsUnitPlural, objectsUnit } = productConstants[
    productKey
  ];
  const items = [];

  // UserAndGroups
  if (getUsersAndGroupsStats) {
    items.push(
      {
        label: intl.formatMessage(messages.groups),
        value: (
          <ProviderInlineValue
            provider={getUsersAndGroupsStats}
            reducer={(stats) => (stats ? stats.numberOfGroups : null)}
          />
        ),
      },
      {
        label: intl.formatMessage(messages.users),
        value: (
          <ProviderInlineValue
            provider={getUsersAndGroupsStats}
            reducer={(stats) => (stats ? stats.numberOfUsers : null)}
          />
        ),
      },
    );
  }

  // Customers
  if (getCustomersStats) {
    items.push({
      label: intl.formatMessage(messages.customers),
      value: (
        <ProviderInlineValue
          provider={getCustomersStats}
          reducer={(stats) => (stats ? stats.numberOfCustomers : null)}
        />
      ),
    });
  }

  // ProductInstances
  if (getProductInstanceStats) {
    items.push({
      label: toTitleCase(pluralize(0, containersUnit)),
      value: (
        <ProviderInlineValue
          provider={getProductInstanceStats}
          reducer={buildGetNumberOfContainers(
            productKey,
            objectsUnit,
            objectsUnitPlural,
          )}
        />
      ),
    });
    // Issues and Attachments
    if (productKey === 'jira-server') {
      items.push(
        {
          label: intl.formatMessage(messages.issues),
          value: (
            <ProviderInlineValue
              provider={getProductInstanceStats}
              reducer={(stats) => (stats ? stats.numberOfObjects : null)}
            />
          ),
        },
        {
          label: intl.formatMessage(messages.attachments),
          value: (
            <ProviderInlineValue
              provider={getProductInstanceStats}
              reducer={(stats) =>
                stats ? getBytesSize(stats.sizeOfAttachments) : null
              }
            />
          ),
        },
      );
    }
  }

  // Apps
  if (getAppsStats) {
    items.push({
      label: intl.formatMessage(messages.apps),
      value: (
        <ProviderInlineValue
          provider={getAppsStats}
          reducer={(stats) => (stats ? stats.count : null)}
        />
      ),
    });
  }

  return <DataGridCard items={items} />;
};

export default injectIntl(ProductStatsCard);
