import React, { useCallback, useRef, useState } from 'react';

import { Invoice } from '@atlassian/commerce-billing-history';
import {
  isSuccessful,
  useCCPConfirmCardPayment,
} from '@atlassian/commerce-credit-card-ccp';
import {
  TaskGap,
  TaskH2,
  TaskLayout,
  TaskPrimaryAction,
  TaskSection,
} from '@atlassian/commerce-layout';
import {
  CommerceBasePolicyAgreementSubscriptionGeneric,
  CommercePolicyAgreementExplicit,
} from '@atlassian/commerce-legal-notes';
import { PaymentMethodPanel } from '@atlassian/commerce-payment-methods';

import { useOffsessionConfirmationEventDispatch } from '../../../common/utils/analytics';
import { DetailedInvoicePaymentData } from '../../../service/invoice-payment/types';

import { InvoiceSummary } from './invoice-summary';

type PaymentConfirmationProps = DetailedInvoicePaymentData & {
  error?: Error;
  invoice: Invoice;
  onSuccess: () => void;
  onPaymentConfirmationFailure: () => void;
};

export const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  paymentMethod,
  invoice,
  invoicePaymentData,
  onSuccess,
  onPaymentConfirmationFailure,
}) => {
  const [agreed, setAgreed] = useState(false);
  const confirmationRef = useRef<HTMLInputElement>(null);
  const confirm = useCCPConfirmCardPayment();
  const dispatchEvent = useOffsessionConfirmationEventDispatch();
  const payCta = 'Pay now';

  const onConfirm = useCallback(async () => {
    if (!agreed) {
      confirmationRef.current && confirmationRef.current.focus();
      return;
    }
    const result = await confirm!(invoicePaymentData.paymentIntentClientSecret);

    dispatchEvent(result);
    if (isSuccessful(result)) {
      onSuccess();
    } else {
      onPaymentConfirmationFailure();
    }
  }, [
    agreed,
    confirm,
    dispatchEvent,
    invoicePaymentData.paymentIntentClientSecret,
    onSuccess,
    onPaymentConfirmationFailure,
  ]);

  return (
    <TaskLayout
      title={`Retry payment for ${invoice.number}`}
      testId="commerce-off-session-payment-flow.flow--display"
      actions={
        <TaskPrimaryAction
          testId="commerce.offsession-payment-method-confirm.submit-button"
          actionSubjectId={payCta}
          onClick={onConfirm}
          failed={false}
          loading={!confirm}
          label={payCta}
        />
      }
    >
      <TaskSection>
        <TaskH2>Payment method</TaskH2>
        <PaymentMethodPanel paymentMethod={paymentMethod} />
      </TaskSection>
      <TaskSection>
        <TaskH2>Billing summary</TaskH2>
        <InvoiceSummary invoice={invoice} />
      </TaskSection>
      <TaskSection>
        <CommerceBasePolicyAgreementSubscriptionGeneric />
        <TaskGap />
        <CommercePolicyAgreementExplicit
          onAgreedChanged={setAgreed}
          ref={confirmationRef}
        />
      </TaskSection>
    </TaskLayout>
  );
};
