import React from 'react';

import {
  canada,
  nonExistingCountry,
} from '../../../utils/billing-country/mocks';

import { TaxFieldLabel } from './index';

export const TaxFieldLabelForNoCountrySelected = () => <TaxFieldLabel />;

export const TaxFieldLabelWithLocalCountryTax = () => (
  <TaxFieldLabel country={canada} />
);

export const TaxFieldLabelWithoutLocalCountryTax = () => (
  <TaxFieldLabel country={nonExistingCountry} />
);

export const TaxFieldLabelWithLocalStateTax = () => (
  <TaxFieldLabel
    country={canada}
    state={canada.states!.find((it) => it.name === 'Quebec')}
  />
);

export const TaxFieldLabelWithOutLocalStateTax = () => (
  <TaxFieldLabel
    country={canada}
    state={canada.states!.find((it) => it.name === 'Ontario')}
  />
);
