import React, { useState } from 'react';

import { CommerceMockedEnvironment } from '@atlassian/commerce-environment/mocks';
import { CountryIsoCode, StateIsoCode } from '@atlassian/commerce-types';

import { AddressFormValues } from '../../types';
import {
  australiaStates,
  scenarios,
  successScenariosForDefaultCountries,
} from '../../utils/billing-country-states/mocks';
import { defaultCountries } from '../../utils/billing-country/mocks';

import { AddressFields, AddressFormFrame } from './index';

const fullAddress: AddressFormValues = {
  organization: 'Atlassian',
  country: 'AU' as CountryIsoCode,
  'address-level2': 'Sydney',
  'address-line1': 'Level 6',
  'address-line2': '341 George St',
  'postal-code': '2000',
  'address-level1': 'NSW' as StateIsoCode,
  'tax-id': 'ABN-12345',
};

export const FilledFieldsExample = () => (
  <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
    <AddressFormFrame onSubmit={() => {}} initialValues={fullAddress}>
      <AddressFields
        countries={defaultCountries}
        sharedCountryStates={australiaStates}
      />
    </AddressFormFrame>
  </CommerceMockedEnvironment>
);

export const EmptyFieldsExample = () => {
  const [countryStates] = useState({});

  return (
    <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
      <AddressFormFrame onSubmit={() => {}} initialValues={undefined}>
        <AddressFields
          sharedCountryStates={countryStates}
          countries={defaultCountries}
        />
      </AddressFormFrame>
    </CommerceMockedEnvironment>
  );
};

export const PreLoadingStatesExample = () => {
  const [countryStates] = useState({});

  return (
    <CommerceMockedEnvironment scenarios={successScenariosForDefaultCountries}>
      <AddressFormFrame onSubmit={() => {}} initialValues={fullAddress}>
        <AddressFields
          sharedCountryStates={countryStates}
          countries={defaultCountries}
        />
      </AddressFormFrame>
    </CommerceMockedEnvironment>
  );
};

export const ErrorLoadingStatesExample = () => {
  const [countryStates] = useState({});

  return (
    <CommerceMockedEnvironment scenarios={[scenarios.failureAustralia]}>
      <AddressFormFrame onSubmit={() => {}} initialValues={fullAddress}>
        <AddressFields
          sharedCountryStates={countryStates}
          countries={defaultCountries}
        />
      </AddressFormFrame>
    </CommerceMockedEnvironment>
  );
};
