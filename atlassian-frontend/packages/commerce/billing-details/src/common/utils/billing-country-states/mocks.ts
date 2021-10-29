import {
  networksScenarios,
  ok,
  Scenario,
  serverFailure,
  url,
} from '@atlassian/commerce-environment/mocks';
import { StateIsoCode } from '@atlassian/commerce-types';

import { BillingCountryState, BillingCountryStateLookup } from '../../types';
import { australia, canada, germany, japan } from '../billing-country/mocks';

import { billingCountryStateUrl } from './index';

const statesOfCanada: BillingCountryState[] = [
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
];

export const canadaStates: BillingCountryStateLookup = {
  [canada.isoCode]: statesOfCanada,
};

export const statesOfAustralia: BillingCountryState[] = [
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
];

export const australiaStates: BillingCountryStateLookup = {
  [australia.isoCode]: statesOfAustralia,
};

export const scenarios = networksScenarios({
  successAustralia: {
    request: url(billingCountryStateUrl(australia.isoCode)),
    response: ok<BillingCountryState[]>(statesOfAustralia),
  },
  successCanada: {
    request: url(billingCountryStateUrl(canada.isoCode)),
    response: ok<BillingCountryState[]>(statesOfCanada),
  },
  successGermany: {
    request: url(billingCountryStateUrl(germany.isoCode)),
    response: ok<BillingCountryState[]>([]),
  },
  successJapan: {
    request: url(billingCountryStateUrl(japan.isoCode)),
    response: ok<BillingCountryState[]>([]),
  },
  failureAustralia: {
    request: url(billingCountryStateUrl(australia.isoCode)),
    response: serverFailure(),
  },
});

export const successScenariosForDefaultCountries: Scenario[] = [
  scenarios.successAustralia,
  scenarios.successCanada,
  scenarios.successGermany,
  scenarios.successJapan,
];
