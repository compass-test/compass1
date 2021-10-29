import {
  networksScenarios,
  ok,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';
import {
  CountryIsoCode,
  Currency,
  StateIsoCode,
} from '@atlassian/commerce-types';

import { BillingCountry } from '../../types';

import { BILLING_COUNTRIES_URL } from './index';

export const canada: BillingCountry = {
  currency: 'USD' as Currency,
  isoCode: 'CA' as CountryIsoCode,
  localTaxId: {
    description: 'Business Number',
    displayName: 'BN / NE',
    vat: true,
  },
  name: 'Canada',
  states: [
    {
      isoCode: 'SK' as StateIsoCode,
      name: 'Saskatchewan',
    },
    {
      isoCode: 'PE' as StateIsoCode,
      name: 'Prince Edward Island',
    },
    {
      isoCode: 'NB' as StateIsoCode,
      name: 'New Brunswick',
    },
    {
      isoCode: 'AB' as StateIsoCode,
      name: 'Alberta',
    },
    {
      isoCode: 'MB' as StateIsoCode,
      name: 'Manitoba',
    },
    {
      isoCode: 'NS' as StateIsoCode,
      name: 'Nova Scotia',
    },
    {
      isoCode: 'NL' as StateIsoCode,
      name: 'Newfoundland and Labrador',
    },
    {
      isoCode: 'QC' as StateIsoCode,
      localTaxId: {
        description: 'Quebec Sales Tax',
        displayName: 'QST',
        vat: true,
      },
      name: 'Quebec',
    },
    {
      isoCode: 'BC' as StateIsoCode,
      name: 'British Columbia',
    },
    {
      isoCode: 'NU' as StateIsoCode,
      name: 'Nunavut',
    },
    {
      isoCode: 'YT' as StateIsoCode,
      name: 'Yukon',
    },
    {
      isoCode: 'ON' as StateIsoCode,
      name: 'Ontario',
    },
    {
      isoCode: 'NT' as StateIsoCode,
      name: 'Northwest Territories',
    },
  ],
};

export const australia: BillingCountry = {
  currency: 'AUD' as Currency,
  isoCode: 'AU' as CountryIsoCode,
  localTaxId: {
    description: 'Australian Business Number',
    displayName: 'ABN',
    vat: true,
  },
  name: 'Australia',
  states: [
    {
      isoCode: 'TAS' as StateIsoCode,
      name: 'Tasmania',
    },
    {
      isoCode: 'ACT' as StateIsoCode,
      name: 'Australian Capital Territory',
    },
    {
      isoCode: 'NSW' as StateIsoCode,
      name: 'New South Wales',
    },
    {
      isoCode: 'QLD' as StateIsoCode,
      name: 'Queensland',
    },
    {
      isoCode: 'WA' as StateIsoCode,
      name: 'Western Australia',
    },
    {
      isoCode: 'VIC' as StateIsoCode,
      name: 'Victoria',
    },
    {
      isoCode: 'NT' as StateIsoCode,
      name: 'Northern Territory',
    },
    {
      isoCode: 'SA' as StateIsoCode,
      name: 'South Australia',
    },
  ],
};

export const germany: BillingCountry = {
  currency: 'USD' as Currency,
  isoCode: 'DE' as CountryIsoCode,
  localTaxId: {
    description: 'Umsatzsteuer-Identifikationsnummer',
    displayName: 'USt-IdNr',
    vat: true,
  },
  name: 'Germany',
  states: [],
};

export const japan: BillingCountry = {
  currency: 'JPY' as Currency,
  isoCode: 'JP' as CountryIsoCode,
  localTaxId: {
    description: 'Consumption Tax Identification Number',
    displayName: 'TIN',
    vat: false,
  },
  name: 'Japan',
  states: [],
};

export const defaultCountries: BillingCountry[] = [
  canada,
  australia,
  germany,
  japan,
];

export const nonExistingCountry: BillingCountry = {
  isoCode: 'AS' as CountryIsoCode,
  name: 'Atlantis',
  currency: 'ASD' as Currency,
  states: [],
};

export const defaultCountriesJapanese: BillingCountry[] = [
  { ...canada, name: 'カナダ' },
  { ...australia, name: 'オーストラリア' },
  { ...germany, name: 'ドイツ' },
  { ...japan, name: '日本' },
];

export const scenarios = networksScenarios({
  success: {
    request: url(BILLING_COUNTRIES_URL),
    response: ok<BillingCountry[]>(defaultCountries),
  },
  successJapanese: {
    request: {
      url: BILLING_COUNTRIES_URL,
      method: 'GET',
      queryParams: { lang: 'ja' },
    },
    response: ok<BillingCountry[]>(defaultCountriesJapanese),
  },
  failure: {
    request: url(BILLING_COUNTRIES_URL),
    response: serverFailure(),
  },
});
