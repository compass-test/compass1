import React from 'react';

import { CreditCard } from '../../types';
import {
  DetailsContainer,
  IconWrapper,
  PaymentContainer,
  PaymentMethodText,
  PaymentMethodTitle,
} from '../styled';

import { CreditCardIcon } from './credit-card-icon';
import { formatCCNumber } from './utils';

export const CreditCardPanel: React.FC<CreditCard> = ({
  name,
  brand,
  expMonth,
  expYear,
  last4,
}) => {
  return (
    <PaymentContainer data-testid="commerce-payment-methods.card-content">
      <IconWrapper>
        <CreditCardIcon brand={brand} />
      </IconWrapper>
      <DetailsContainer>
        <PaymentMethodTitle>{formatCCNumber(last4, brand)}</PaymentMethodTitle>
        {name && <PaymentMethodText>{name}</PaymentMethodText>}
        <PaymentMethodText>
          Expires {expMonth}/{expYear}
        </PaymentMethodText>
      </DetailsContainer>
    </PaymentContainer>
  );
};
