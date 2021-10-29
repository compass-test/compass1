import React from 'react';

import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';
import { Currency } from '@atlassian/commerce-types';

import { BillingCountrySelect, useBillingCountriesService } from '../src';
import { billingCountriesScenarios } from '../src/mocks';

const Example = () => {
  const { data } = useBillingCountriesService();
  if (data) {
    return (
      <BillingCountrySelect
        onChange={() => {}}
        countries={data}
        currencyRestriction={'JPY' as Currency}
      />
    );
  }
  return null;
};

export default () => (
  <CommerceMockedEnvironment scenarios={[billingCountriesScenarios.success]}>
    <Example />
  </CommerceMockedEnvironment>
);
