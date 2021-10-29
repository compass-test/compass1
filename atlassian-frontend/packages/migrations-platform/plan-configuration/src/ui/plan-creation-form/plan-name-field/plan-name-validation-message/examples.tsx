import React from 'react';

import { IntlProvider } from 'react-intl';

import PlanNameValidationMessage from './index';

const WithIntlProvider: React.FC = ({ children }) => (
  <IntlProvider locale={'en'}>{children}</IntlProvider>
);

export const PlanNameFieldRunningValidationMessage = () => (
  <WithIntlProvider>
    <PlanNameValidationMessage validation="Running" />
  </WithIntlProvider>
);

export const PlanNameFieldValidValidationMessage = () => (
  <WithIntlProvider>
    <PlanNameValidationMessage validation="Valid" />
  </WithIntlProvider>
);

export const PlanNameFieldDuplicateValidationMessage = () => (
  <WithIntlProvider>
    <PlanNameValidationMessage validation="Duplicate" />
  </WithIntlProvider>
);

export const PlanNameFieldEmptyValidationMessage = () => (
  <WithIntlProvider>
    <PlanNameValidationMessage validation="Empty" />
  </WithIntlProvider>
);
