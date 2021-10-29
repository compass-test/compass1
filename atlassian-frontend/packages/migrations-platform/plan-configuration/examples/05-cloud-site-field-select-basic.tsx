import React from 'react';

import { IntlProvider } from 'react-intl';

import Form from '@atlaskit/form';

import { CloudSiteFieldSelect } from '../src';
import { cloudSites } from '../src/ui/plan-creation-form/cloud-site-field-select/mocks';

export default () => (
  <IntlProvider locale="en">
    <Form onSubmit={() => {}}>
      {(formProps) => {
        return (
          <form {...formProps}>
            <CloudSiteFieldSelect
              options={cloudSites}
              defaultOption={cloudSites[1]}
              productMeta={{
                cloudDestination: 'spaces',
                productName: 'Confluence',
              }}
              plansUrl="http://example.com/#confluence-cloud-plans"
              getMigrationGatewayUrl={() => {
                return Promise.resolve('getMigrationGatewayUrl');
              }}
              getCloudTrialUrl={() => {
                return Promise.resolve('getCloudTrialUrl');
              }}
            />
          </form>
        );
      }}
    </Form>
  </IntlProvider>
);
