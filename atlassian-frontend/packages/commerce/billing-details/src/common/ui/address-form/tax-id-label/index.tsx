import React from 'react';

import InlineMessage from '@atlaskit/inline-message';

import {
  BillingCountry,
  BillingCountryState,
  LocalTaxId,
} from '../../../../common/types';

import { InlineRowWrapper } from './styled';

const defaultTaxId: LocalTaxId = {
  displayName: 'Tax ID',
  vat: false,
};

const getLocalTaxId = (
  country?: BillingCountry,
  state?: BillingCountryState,
): LocalTaxId => {
  if (state && state.localTaxId) {
    return state.localTaxId;
  }
  if (country && country.localTaxId) {
    return country.localTaxId;
  }
  return defaultTaxId;
};

type Props = {
  country?: BillingCountry;
  state?: BillingCountryState;
  defaultValue?: string;
};

export const TaxFieldLabel: React.FC<Props> = ({ country, state }) => {
  const { displayName: taxLabel, description: taxDescription } = getLocalTaxId(
    country,
    state,
  );

  if (taxDescription) {
    return (
      <InlineRowWrapper>
        {taxLabel}
        <InlineMessage type="info">{taxDescription}</InlineMessage>
      </InlineRowWrapper>
    );
  }

  return <span>{taxLabel}</span>;
};
