import React, { useCallback, useState } from 'react';

import { SlideIn } from '@atlaskit/motion';
import {
  CreditCardErrorMessage,
  CreditCardForm,
  isSuccessful,
  useCCPCreatePaymentMethodAndConfirmCardSetup,
} from '@atlassian/commerce-credit-card-ccp';
import {
  ErrorMessage,
  TaskGap,
  TaskLayout,
  TaskPrimaryAction,
} from '@atlassian/commerce-layout';
import {
  CommercePolicyAgreementSubscriptionGeneric,
  CommerceVisaLegalNote,
} from '@atlassian/commerce-legal-notes';
import { useDefaultPaymentMethodUpdateService } from '@atlassian/commerce-payment-methods';
import {
  InvoiceGroupId,
  TransactionAccountId,
} from '@atlassian/commerce-types';

type UpdatePaymentMethodProps = {
  ig: InvoiceGroupId;
  txa: TransactionAccountId;
  onSuccess: () => void;
};

export const UpdatePaymentMethod: React.FC<UpdatePaymentMethodProps> = ({
  txa,
  ig,
  onSuccess,
}) => {
  const [committing, setCommitting] = useState(false);
  const { update: updatePaymentMethod } = useDefaultPaymentMethodUpdateService(
    txa,
    ig,
  );
  const createPaymentMethodAndConfirmCardSetup = useCCPCreatePaymentMethodAndConfirmCardSetup();
  const handleSubmit = useCallback(async () => {
    if (!createPaymentMethodAndConfirmCardSetup) {
      return;
    }

    setCommitting(true);

    try {
      const result = await createPaymentMethodAndConfirmCardSetup();
      if (isSuccessful(result)) {
        await updatePaymentMethod(result.payload.ccpPaymentMethodId);
        onSuccess();
      }
    } finally {
      setCommitting(false);
    }
  }, [createPaymentMethodAndConfirmCardSetup, onSuccess, updatePaymentMethod]);

  return (
    <SlideIn enterFrom="right" fade="in">
      {(props) => (
        <TaskLayout
          {...props}
          title="Update payment method"
          testId="commerce-payment-flow.offsession-update-payment-method"
          actions={
            <TaskPrimaryAction
              onClick={handleSubmit}
              label="Update and pay"
              actionSubjectId="updateAndPay"
              loading={committing}
              failed={false}
            />
          }
          actionError={<CreditCardErrorMessage />}
          genericError={
            <ErrorMessage title="Your payment was declined">
              Your card authentication failed. Update your payment details to
              retry your payment.
            </ErrorMessage>
          }
        >
          <CreditCardForm />
          <CommercePolicyAgreementSubscriptionGeneric />
          <CommerceVisaLegalNote style="gray" />
          <TaskGap />
        </TaskLayout>
      )}
    </SlideIn>
  );
};
