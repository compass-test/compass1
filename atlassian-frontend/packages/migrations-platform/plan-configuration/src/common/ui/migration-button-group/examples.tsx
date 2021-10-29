import React from 'react';

import { IntlProvider } from 'react-intl';

import MigrationButtonGroup, { Props } from './index';

export const MigrationButtonGroupBasic = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <MigrationButtonGroup
        productMeta={{
          productName: 'Confluence',
          cloudDestination: 'spaces',
        }}
        getMigrationGatewayUrl={async () => {
          return 'dummy-mg-url';
        }}
        getCloudTrialUrl={async () => {
          return 'dummy-cloud-trial-url';
        }}
        {...props}
      />
    </IntlProvider>
  );
};
