import React, { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import Form from '@atlaskit/form';

import WorkspaceField, { Props } from './main';
import { workspaces } from './mocks';

const FormWrapper: FC = ({ children }) => {
  return (
    <IntlProvider locale="en">
      <Form onSubmit={() => {}}>
        {(formProps) => {
          return <form {...formProps}>{children}</form>;
        }}
      </Form>
    </IntlProvider>
  );
};

const baseProps = {
  options: workspaces,
  onChange: action('onChange'),
  productMeta: {
    cloudDestination: 'workspace',
    productName: 'Bitbucket',
  },
  getMigrationGatewayUrl: () => Promise.resolve('getMigrationGatewayUrl'),
  getCloudTrialUrl: () => Promise.resolve('getCloudTrialUrl'),
};

export const WorkspaceFieldSelectBasic = (props: Partial<Props>) => {
  return (
    <FormWrapper>
      <WorkspaceField {...baseProps} {...props} />
    </FormWrapper>
  );
};

export const WorkspaceFieldSelectPreSelected = (props: Partial<Props>) => {
  return (
    <FormWrapper>
      <WorkspaceField {...baseProps} {...props} defaultOption={workspaces[1]} />
    </FormWrapper>
  );
};
