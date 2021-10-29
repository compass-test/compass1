import React from 'react';

import { IntlProvider } from 'react-intl';

import { PlanNameFieldProps } from './types';

import PlanNameField from './index';

const WithIntlProvider: React.FC = ({ children }) => (
  <IntlProvider locale={'en'}>{children}</IntlProvider>
);

export const PlanNameFieldDefaultWithoutName: React.FC<Partial<
  PlanNameFieldProps
>> = ({ onChange = () => {} }) => (
  <WithIntlProvider>
    <PlanNameField value="" onChange={onChange} validation={'Duplicate'} />
  </WithIntlProvider>
);

export const PlanNameFieldWithLabel = () => (
  <WithIntlProvider>
    <PlanNameField value="" label="My label" />
  </WithIntlProvider>
);
