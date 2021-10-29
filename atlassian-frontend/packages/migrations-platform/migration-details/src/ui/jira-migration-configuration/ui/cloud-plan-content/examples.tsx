import React from 'react';

import { IntlProvider } from 'react-intl';

import CloudPlanContent, { Props } from './index';

export const BasicCloudPlanContent = (props: Partial<Props>) => {
  return (
    <IntlProvider locale="en">
      <CloudPlanContent
        destinationCloudProducts={[
          {
            edition: 'free',
            productKey: 'jira-core.ondemand',
          },
          {
            edition: 'standard',
            productKey: 'jira-software.ondemand',
          },
          {
            edition: 'premium',
            productKey: 'jira-servicedesk.ondemand',
          },
        ]}
        {...props}
      />
    </IntlProvider>
  );
};
