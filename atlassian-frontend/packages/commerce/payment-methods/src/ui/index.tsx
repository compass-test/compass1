import React, { ComponentProps } from 'react';

import { EditablePanel } from '@atlassian/commerce-layout';

import {
  isCreditCardPaymentMethod,
  isDeferredPaymentMethod,
  PaymentMethod,
} from '../common/types';
import { CreditCardPanel } from '../common/ui/credit-card';
import { PaymentMethodBox } from '../common/ui/styled';

import { DeferredPanel } from './deferred';

export { PaymentMethodsWallet } from './wallet';

type PaymentMethodElementProps = {
  paymentMethod: PaymentMethod;
};

export const PaymentMethodElement: React.FC<PaymentMethodElementProps> = ({
  paymentMethod,
}) => (
  <PaymentMethodBox>
    {isCreditCardPaymentMethod(paymentMethod) ? (
      <CreditCardPanel {...paymentMethod.card} />
    ) : isDeferredPaymentMethod(paymentMethod) ? (
      <DeferredPanel />
    ) : (
      <span>Your payment method: {paymentMethod.type}</span>
    )}

    {/*CCP only support self service payment method updates for credit card*/}
  </PaymentMethodBox>
);

export const PaymentMethodPanel: React.FC<
  PaymentMethodElementProps & {
    onEdit?: ComponentProps<typeof EditablePanel>['onEdit'];
  }
> = ({ onEdit, ...props }) => {
  const isDeferred = props.paymentMethod.type === 'DEFERRED';
  return (
    <EditablePanel
      onEdit={isDeferred ? undefined : onEdit}
      editLabel="Edit payment method"
      testId="commerce-payment-methods.src.ui.edit-button"
      size="MEDIUM"
    >
      <PaymentMethodElement {...props} />
    </EditablePanel>
  );
};
