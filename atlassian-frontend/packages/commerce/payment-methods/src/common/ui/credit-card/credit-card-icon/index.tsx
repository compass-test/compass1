import React from 'react';

import { CreditCardBrand } from '../../../types';

import { PaymentAmex } from './assets/payment-amex';
import { PaymentDefault } from './assets/payment-default';
import { PaymentMastercard } from './assets/payment-mastercard';
import { PaymentVisa } from './assets/payment-visa';

export const CreditCardIcon: React.FC<{ brand: CreditCardBrand }> = ({
  brand,
}) => {
  switch (brand.toLowerCase()) {
    case 'visa':
      return <PaymentVisa />;
    case 'amex':
      return <PaymentAmex />;
    case 'mastercard':
      return <PaymentMastercard />;
    default:
      return <PaymentDefault />;
  }
};
