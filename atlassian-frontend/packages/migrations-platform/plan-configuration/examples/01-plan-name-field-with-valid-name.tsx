import React from 'react';

import { IntlProvider } from 'react-intl';

import { PlanNameField } from '../src';

const PlanNameFieldWithValidName = () => (
  <div style={{ width: 500, margin: '1% auto' }}>
    <IntlProvider locale={'en'}>
      <PlanNameField value="My first plan" validation="Valid" />
    </IntlProvider>
  </div>
);

export default PlanNameFieldWithValidName;
