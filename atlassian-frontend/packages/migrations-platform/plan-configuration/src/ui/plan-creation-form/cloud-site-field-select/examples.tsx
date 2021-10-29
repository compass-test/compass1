import React, { FC } from 'react';

import { action } from '@storybook/addon-actions';
import { IntlProvider } from 'react-intl';

import Form from '@atlaskit/form';

import CloudSiteFieldSelect, { Props } from './main';
import { cloudSites } from './mocks';

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
  options: cloudSites,
  onChange: action('onChange'),
  productMeta: {
    cloudDestination: 'spaces',
    productName: 'Confluence',
  },
  plansUrl: 'http://example.com/#confluence-cloud-plans',
  getMigrationGatewayUrl: () => Promise.resolve('getMigrationGatewayUrl'),
  getCloudTrialUrl: () => Promise.resolve('getCloudTrialUrl'),
};

export const CloudSiteFieldSelectBasic = (props: Partial<Props>) => {
  return (
    <FormWrapper>
      <CloudSiteFieldSelect {...baseProps} {...props} />
    </FormWrapper>
  );
};

export const CloudSiteFieldSelectPreSelected = (props: Partial<Props>) => {
  return (
    <FormWrapper>
      <CloudSiteFieldSelect
        {...baseProps}
        {...props}
        defaultOption={cloudSites[2]}
      />
    </FormWrapper>
  );
};
