import React from 'react';

import { CountryIsoCode, Currency } from '@atlassian/commerce-types';

import { BillingCountry } from '../../../../common/types';
import {
  australia,
  defaultCountries,
  germany,
} from '../../../utils/billing-country/mocks';

import { BillingCountrySelect } from './index';

const atlantis: BillingCountry = {
  isoCode: 'AS' as CountryIsoCode,
  name: 'Atlantis',
  currency: 'ASD' as Currency,
  states: [],
};
const countries: BillingCountry[] = defaultCountries;

export const CountrySelect = () => (
  <BillingCountrySelect countries={countries} onChange={() => {}} />
);

export const SingleCountrySelect = () => (
  <BillingCountrySelect countries={[australia]} onChange={() => {}} />
);

export const SelectedCountrySelect = () => (
  <BillingCountrySelect
    value={germany.isoCode}
    countries={countries}
    onChange={() => {}}
  />
);

export const NotExistingSelectedCountrySelect = () => (
  <BillingCountrySelect
    value={atlantis.isoCode}
    countries={countries}
    onChange={() => {}}
  />
);

export const DisplayedCurrenciesCountrySelect = () => (
  <BillingCountrySelect
    displayCurrency
    countries={countries}
    onChange={() => {}}
  />
);

export const CurrencyRestrictedCountrySelect = () => (
  <BillingCountrySelect
    currencyRestriction={'USD' as Currency}
    countries={countries}
    onChange={() => {}}
  />
);

export const CurrencyRestrictedCustomMessageCountrySelect = () => (
  <BillingCountrySelect
    currencyRestriction={'USD' as Currency}
    countries={countries}
    onChange={() => {}}
    components={{
      CurrencyRestrictionWarning: ({ currency }) => (
        <span>Select warning! {currency}</span>
      ),
    }}
  />
);

export const CurrencyRestrictedSingleCountrySelect = () => (
  <BillingCountrySelect
    currencyRestriction={'AUD' as Currency}
    countries={countries}
    onChange={() => {}}
  />
);

export const CurrencyRestrictedCustomMessageSingleCountrySelect = () => (
  <BillingCountrySelect
    currencyRestriction={'AUD' as Currency}
    countries={countries}
    components={{
      CurrencyRestrictionSingleCountryWarning: ({ currency }) => (
        <span>Warning! {currency}</span>
      ),
    }}
    onChange={() => {}}
  />
);

export const NonExistingCurrencyCountrySelect = () => (
  <BillingCountrySelect
    currencyRestriction={'ASD' as Currency}
    countries={countries}
    onChange={() => {}}
  />
);
