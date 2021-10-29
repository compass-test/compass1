import React from 'react';

import { IntlProvider } from 'react-intl';

import { PlanNameField } from '../src';

const PlanNameFieldWithEmptyFieldError = () => (
  <div style={{ width: 500, margin: '1% auto' }}>
    <IntlProvider locale={'en'}>
      <PlanNameField value="" validation="Empty" />
    </IntlProvider>
  </div>
);

export default PlanNameFieldWithEmptyFieldError;
