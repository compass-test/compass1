import React from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import MigrationGatewayModal, { Props } from './index';

export const MigrationGatewayModalBasic = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <MigrationGatewayModal
        destination="spaces"
        isLoading={false}
        onContinue={action('onContinue')}
        onClose={action('onClose')}
        {...props}
      />
    </IntlProvider>
  );
};
