import React from 'react';

import { IntlProvider } from 'react-intl';

import TrialButton, { Props } from './index';

export const TrialButtonBasic = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <TrialButton
        productName="Confluence"
        getUrl={async () => {
          return 'dummy-url';
        }}
        {...props}
      />
    </IntlProvider>
  );
};
