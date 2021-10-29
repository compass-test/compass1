import React from 'react';

import { IntlProvider } from 'react-intl';

import Form from '@atlaskit/form';

import { WorkspaceFieldSelect } from '../src';
import { workspaces } from '../src/ui/workspace-field-select/mocks';

export default () => (
  <IntlProvider locale="en">
    <Form onSubmit={() => {}}>
      {(formProps) => {
        return (
          <form {...formProps}>
            <WorkspaceFieldSelect
              options={workspaces}
              defaultOption={workspaces[1]}
              productMeta={{
                cloudDestination: 'workspace',
                productName: 'Bitbucket',
              }}
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
