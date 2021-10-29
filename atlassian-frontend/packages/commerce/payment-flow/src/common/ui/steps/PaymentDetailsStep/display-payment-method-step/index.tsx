import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button';
import { StackLayout, TaskGap, TaskLayout } from '@atlassian/commerce-layout';
import {
  CreditCardPaymentMethod,
  isCreditCardPaymentMethod,
  PaymentMethodPanel,
  PaymentMethodsWallet,
} from '@atlassian/commerce-payment-methods';

import { DISPLAY_PAYMENT_METHOD_SCREEN } from '../../../../constants/breadcrumb-names';
import { FlowControl } from '../../../../controllers/use-flow-control/types';
import { withPaymentDetailsBreadcrumb } from '../../../../utils/analytics';
import { FlowControlButtons } from '../../../Flow/flow-control-buttons';
import { FlowStep, FlowStepComponent } from '../../../Flow/step';
import { LegalNoteSelector } from '../../../legal-notes';
import { PaymentDetailsStepIn, PaymentDetailsStepOut } from '../types';

import { Separator, WalletHeading } from './styled';

const DisplayPaymentDetailsStep: FlowStepComponent<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = ({
  flowState: { initialPaymentMethod, paymentMethod, paymentMethods },
  updateFlowState,
  flowControl,
}) => {
  const onEdit = useCallback(
    // this will end "display payment" mode
    () => updateFlowState({ isUpdatingPaymentMethod: true }),
    [updateFlowState],
  );

  const [paymentMethodSelected, selectPaymentMethod] = useState<
    CreditCardPaymentMethod | undefined
  >(paymentMethod as CreditCardPaymentMethod);

  const handleClickNext = useCallback(
    ({ moveForward }: FlowControl<PaymentDetailsStepOut>) => {
      moveForward({
        paymentMethod: paymentMethodSelected!,
      });
    },
    [paymentMethodSelected],
  );

  const displayingNonCreditCardFlow =
    initialPaymentMethod && !isCreditCardPaymentMethod(initialPaymentMethod);

  const taskTitle = `${
    displayingNonCreditCardFlow ? 'Edit' : 'Choose your'
  } payment method`;

  return (
    <TaskLayout
      title={taskTitle}
      actions={
        <FlowControlButtons
          flowControl={flowControl}
          loading={false}
          disabled={!paymentMethodSelected}
          failed={false}
          onNext={handleClickNext}
          entityName="PaymentMethod"
          nextButtonTestId="commerce.payment-flow.submit-button"
        />
      }
      testId="commerce-payment-flow.flow--display"
    >
      {!displayingNonCreditCardFlow ? (
        <StackLayout>
          <p>
            Select a saved payment method or add a new one to continue with your
            order.
          </p>

          <WalletHeading>Saved payment methods</WalletHeading>
          <PaymentMethodsWallet
            defaultPaymentMethod={
              initialPaymentMethod as CreditCardPaymentMethod | undefined
            }
            paymentMethodsList={paymentMethods}
            selectedPaymentMethod={paymentMethodSelected}
            onPaymentMethodSelected={selectPaymentMethod}
          />
          <Separator />
          <div>
            <Button appearance="link" spacing="none" onClick={onEdit}>
              Add payment method
            </Button>
          </div>
        </StackLayout>
      ) : (
        <>
          <PaymentMethodPanel paymentMethod={paymentMethod!} />
          <TaskGap />
          <LegalNoteSelector paymentMethod={paymentMethod!} />
        </>
      )}
    </TaskLayout>
  );
};

export const displayPaymentDetailsStep: FlowStep<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = {
  caption: 'Payment',
  component: withPaymentDetailsBreadcrumb(
    DisplayPaymentDetailsStep,
    DISPLAY_PAYMENT_METHOD_SCREEN,
  ),
};
