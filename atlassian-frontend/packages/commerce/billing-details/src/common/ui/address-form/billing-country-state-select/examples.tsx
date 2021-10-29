import React from 'react';

import { statesOfAustralia } from '../../../utils/billing-country-states/mocks';
import { defaultCountries } from '../../../utils/billing-country/mocks';

import { BillingCountryStateSelect } from './index';

const states = statesOfAustralia;

export const StateFieldComponent: React.FC = () => (
  <BillingCountryStateSelect
    disabled={!defaultCountries}
    value={states[0].isoCode}
    onChange={() => {}}
    countryStates={states}
    loading={false}
  />
);
export const StateFieldLoading: React.FC = () => (
  <BillingCountryStateSelect
    disabled={!defaultCountries}
    onChange={() => {}}
    countryStates={[]}
    loading={true}
  />
);

export const StateFieldNoSelectedState: React.FC = () => (
  <BillingCountryStateSelect
    disabled={!defaultCountries}
    onChange={() => {}}
    countryStates={states}
    loading={false}
  />
);

export const StateFieldNoStatesNoSelected: React.FC = () => (
  <BillingCountryStateSelect
    disabled={!defaultCountries}
    onChange={() => {}}
    countryStates={[]}
    loading={false}
  />
);
