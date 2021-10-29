import React from 'react';

import { IntlProvider } from 'react-intl';

import { ProductStatsCard } from '../src';

export default function ConfluenceProductStatsCard() {
  return (
    <div style={{ width: '600px', margin: '1% auto' }}>
      <IntlProvider locale="en">
        <ProductStatsCard
          productKey="confluence-server"
          getUsersAndGroupsStats={async () => ({
            numberOfUsers: 10,
            numberOfGroups: 20,
          })}
          getProductInstanceStats={async () => ({
            numberOfContainers: 50,
            numberOfGroups: 3,
            numberOfObjects: 500,
            numberOfUsers: 30,
            sizeOfAttachments: 100 * 1024 * 1024,
            totalMigrationTime: 1000,
          })}
          getAppsStats={async () => ({
            count: 1,
          })}
        />
      </IntlProvider>
    </div>
  );
}
