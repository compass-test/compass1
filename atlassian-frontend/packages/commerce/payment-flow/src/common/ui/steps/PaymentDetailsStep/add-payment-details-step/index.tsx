import React, { useCallback, useState } from 'react';

import Button from '@atlaskit/button/custom-theme-button';
import {
  CreditCardErrorMessage,
  CreditCardForm,
  isSuccessful,
  StripePaymentMethod,
  useCCPCreatePaymentMethod,
  useCCPCreatePaymentMethodAndConfirmCardSetup,
  useCreditCardFailure,
} from '@atlassian/commerce-credit-card-ccp';
import { ErrorMessage, TaskLayout } from '@atlassian/commerce-layout';
import {
  PaymentMethod,
  PaymentMethodId,
  useDefaultPaymentMethodUpdateService,
} from '@atlassian/commerce-payment-methods';

import { PAYMENT_METHOD_SCREEN } from '../../../../constants/breadcrumb-names';
import { FlowControl } from '../../../../controllers/use-flow-control/types';
import {
  RepackageAtlaskitEvent,
  withPaymentDetailsBreadcrumb,
} from '../../../../utils/analytics';
import { FlowControlButtons } from '../../../Flow/flow-control-buttons';
import { FlowStep, FlowStepComponent } from '../../../Flow/step';
import { LegalNoteSelector } from '../../../legal-notes';
import { PaymentDetailsStepIn, PaymentDetailsStepOut } from '../types';

import { SmallGap } from './styled';

const stripePaymentDetailsToPaymentMethod = (stripe: {
  paymentMethod: StripePaymentMethod;
  ccpPaymentMethodId: PaymentMethodId;
}): PaymentMethod => {
  const { paymentMethod, ccpPaymentMethodId } = stripe;
  const card = paymentMethod.card!;

  return {
    id: ccpPaymentMethodId,
    type: 'CARD',
    default: false,
    card: {
      name: paymentMethod.billing_details.name ?? undefined,
      brand: card!.brand,
      expMonth: card.exp_month,
      expYear: card.exp_year,
      last4: card.last4,
    },
  };
};

const ContentInCreditCardContext: FlowStepComponent<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = ({
  updateFlowState,
  flowState: { ig, isUpdatingPaymentMethod, txa, paymentMethods },
  flowControl,
}) => {
  const {
    update: updatePaymentMethod,
    error: savingFailure,
  } = useDefaultPaymentMethodUpdateService(txa, ig);

  const [committing, setCommitting] = useState(false);
  const createPaymentMethod = useCCPCreatePaymentMethod();
  const createPaymentMethodAndConfirmCardSetup = useCCPCreatePaymentMethodAndConfirmCardSetup();

  const failure = useCreditCardFailure();

  const handleClickNext = useCallback(
    async ({
      hasNextStep,
      moveForward,
    }: FlowControl<PaymentDetailsStepOut>) => {
      const commit = hasNextStep
        ? createPaymentMethod
        : createPaymentMethodAndConfirmCardSetup;

      if (!commit) {
        return;
      }
      setCommitting(true);
      try {
        const commitResult = await commit();
        if (isSuccessful(commitResult)) {
          if (!hasNextStep) {
            await updatePaymentMethod(commitResult.payload.ccpPaymentMethodId);
          }

          const newPaymentMethod = stripePaymentDetailsToPaymentMethod(
            commitResult.payload,
          );

          updateFlowState({
            paymentMethods: [newPaymentMethod, ...paymentMethods],
            // if moved back one will list of payment methods, with this one selected
            isUpdatingPaymentMethod: false,
          });
          moveForward({
            paymentMethod: newPaymentMethod,
            stripePaymentMethodId: commitResult.payload.paymentMethod.id,
          });
        }
      } finally {
        setCommitting(false);
      }
    },
    [
      createPaymentMethod,
      createPaymentMethodAndConfirmCardSetup,
      paymentMethods,
      updateFlowState,
      updatePaymentMethod,
    ],
  );

  return (
    <TaskLayout
      title="Add your payment method"
      testId="commerce-payment-flow.flow--add"
      actions={
        <>
          {isUpdatingPaymentMethod && (
            <RepackageAtlaskitEvent actionSubjectId="useExistingPaymentMethod">
              <Button
                appearance="link"
                onClick={() =>
                  // this will start "display payment" mode
                  updateFlowState({ isUpdatingPaymentMethod: false })
                }
              >
                Use existing payment method
              </Button>
            </RepackageAtlaskitEvent>
          )}
          <FlowControlButtons
            flowControl={flowControl}
            loading={committing}
            failed={Boolean(failure) || Boolean(savingFailure)}
            onNext={handleClickNext}
            entityName="PaymentDetails"
            nextButtonTestId="commerce.payment-flow.submit-button"
          />
        </>
      }
      actionError={
        <>
          <CreditCardErrorMessage />
          {savingFailure && (
            <ErrorMessage testId="commerce-payment-flow--error-message">
              We’re having trouble saving your payment method
            </ErrorMessage>
          )}
        </>
      }
    >
      <CreditCardForm />
      <LegalNoteSelector />
      <SmallGap />
    </TaskLayout>
  );
};
const AddPaymentDetailsStep: FlowStepComponent<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = (props) => <ContentInCreditCardContext {...props} />;

export const addPaymentDetailsStep: FlowStep<
  PaymentDetailsStepIn,
  PaymentDetailsStepOut
> = {
  caption: 'Payment',
  component: withPaymentDetailsBreadcrumb(
    AddPaymentDetailsStep,
    PAYMENT_METHOD_SCREEN,
  ),
};
