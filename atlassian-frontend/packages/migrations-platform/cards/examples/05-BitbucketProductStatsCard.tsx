import React from 'react';

import { IntlProvider } from 'react-intl';

import { ProductStatsCard } from '../src';

export default function BitbucketProductStatsCard() {
  return (
    <div style={{ width: '600px', margin: '1% auto' }}>
      <IntlProvider locale="en">
        <ProductStatsCard
          productKey="bitbucket-server"
          getProductInstanceStats={async () => ({
            numberOfContainers: 50,
            numberOfGroups: 3,
            numberOfObjects: 500,
            numberOfUsers: 30,
            sizeOfAttachments: 100 * 1024 * 1024,
            totalMigrationTime: 1000,
          })}
        />
      </IntlProvider>
    </div>
  );
}
