import React from 'react';

import { IntlProvider } from 'react-intl';

import { PlanNameField } from '../src';

const PlanNameFieldWithDuplicateValidationError = () => (
  <div style={{ width: 500, margin: '1% auto' }}>
    <IntlProvider locale={'en'}>
      <PlanNameField value="Duplicate name" validation="Duplicate" />
    </IntlProvider>
  </div>
);

export default PlanNameFieldWithDuplicateValidationError;
