import React from 'react';

import {
  AmexPaymentMethod,
  BorderlessPaymentMethod,
  DeferredPaymentMethod,
  MastercardPaymentMethod,
  NoNamePaymentMethod,
  PaymentMethodWithEditButton,
  PaymentMethodWithLongName,
  PaymentMethodWithName,
  UnrecognizedPaymentMethod,
  VisaPaymentMethod,
} from '../src/ui/examples';

const PaymentMethodUiDemo = () => (
  <div data-testid="ui-demo">
    <VisaPaymentMethod />
    <MastercardPaymentMethod />
    <AmexPaymentMethod />
    <NoNamePaymentMethod />
    <PaymentMethodWithName />
    <PaymentMethodWithEditButton />
    <PaymentMethodWithLongName />
    <DeferredPaymentMethod />
    <BorderlessPaymentMethod />
    <UnrecognizedPaymentMethod />
  </div>
);

export default PaymentMethodUiDemo;
