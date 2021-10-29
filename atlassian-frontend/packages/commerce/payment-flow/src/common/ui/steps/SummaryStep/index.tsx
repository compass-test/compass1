import React, { useCallback, useRef, useState } from 'react';

import {
  BillingDetails,
  BillingDetailsInline,
} from '@atlassian/commerce-billing-details';
import {
  isFailure,
  StripePaymentMethod,
  useCCPConfirmCardSetup,
} from '@atlassian/commerce-credit-card-ccp';
import { timeDuration } from '@atlassian/commerce-events-telemetry-react/timing';
import {
  ErrorMessage,
  TaskH2,
  TaskLayout,
  TaskSection,
} from '@atlassian/commerce-layout';
import {
  CommercePolicyAgreementExplicit,
  CommercePolicyAgreementSubscriptionGeneric,
} from '@atlassian/commerce-legal-notes';
import {
  PaymentMethod,
  PaymentMethodPanel,
  useDefaultPaymentMethodUpdateService,
} from '@atlassian/commerce-payment-methods';
import {
  InvoiceGroupId,
  RenewalFrequency,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { BILLING_CONFIRMATION_SCREEN } from '../../../constants/breadcrumb-names';
import { FlowControl } from '../../../controllers/use-flow-control/types';
import {
  RepackageAtlaskitEvent,
  useSummarySubmitEventDispatch,
  withPaymentDetailsBreadcrumb,
} from '../../../utils/analytics';
import { FlowControlButtons } from '../../Flow/flow-control-buttons';
import { FlowStep, FlowStepComponent } from '../../Flow/step';

export type SummaryStepIn = {
  paymentMethod: PaymentMethod;
  paymentMethods: PaymentMethod[];
  stripePaymentMethodId?: StripePaymentMethod['id'];
  billingDetails: BillingDetails;
  renewalFrequency: RenewalFrequency;
  manualSubscription: boolean;
  txa: TransactionAccountId;
  ig: InvoiceGroupId;
};
export type SummaryStepOut = {};

export const SUBMIT_BUTTON_TEST_ID =
  'commerce-payment-flow.src.ui.submit-button';

const SummaryStep: FlowStepComponent<SummaryStepIn, SummaryStepOut> = ({
  flowControl,
  flowState: {
    txa,
    ig,
    paymentMethod,
    paymentMethods,
    stripePaymentMethodId,
    billingDetails,
    manualSubscription,
  },
}) => {
  const [agreed, setAgreed] = useState(false);
  const confirmationRef = useRef<HTMLInputElement>(null);
  const dispatchEvent = useSummarySubmitEventDispatch();
  const {
    error: paymentMethodUpdateError,
    update,
  } = useDefaultPaymentMethodUpdateService(txa, ig);
  const [updating, setUpdating] = useState(false);

  const confirm = useCCPConfirmCardSetup();

  const handleClickNext = useCallback(
    async ({ moveBack, moveForward }: FlowControl<SummaryStepOut>) => {
      if (!confirm) {
        throw new Error('confirm is not ready');
      }

      if (!agreed) {
        confirmationRef.current && confirmationRef.current.focus();
        return;
      }
      setUpdating(true);
      const timingData = await timeDuration(async () => {
        try {
          if (stripePaymentMethodId) {
            const result = await confirm(stripePaymentMethodId);
            if (isFailure(result)) {
              return {
                paymentMethod,
                stripeFailure: true,
                error: new Error(
                  'Card confirmation setup failed. Details: ' +
                    JSON.stringify(result),
                ),
              };
            }
          }

          await update(paymentMethod.id);
          return {
            paymentMethod,
          };
        } catch (error) {
          return {
            paymentMethod,
            error,
          };
        }
      });
      setUpdating(false);

      dispatchEvent(timingData);
      if (timingData.timedPayload.error) {
        if (timingData.timedPayload.stripeFailure) {
          // move back to display the error on the credit card step
          moveBack({
            isUpdatingPaymentMethod: true,
            paymentMethod: null,
            paymentMethods: paymentMethods.filter(
              (pm) => pm.id !== paymentMethod.id,
            ),
          });
        }
        // don't move, error would be displayed on this screen
      } else {
        moveForward({});
      }
    },
    [
      confirm,
      agreed,
      dispatchEvent,
      stripePaymentMethodId,
      update,
      paymentMethod,
      paymentMethods,
    ],
  );

  return (
    <TaskLayout
      title="Confirm your billing details"
      testId="commerce.payment-flow.summary-step--display"
      actions={
        <FlowControlButtons
          flowControl={flowControl}
          loading={updating || !confirm}
          failed={Boolean(paymentMethodUpdateError)}
          disabled={!agreed}
          onNext={handleClickNext}
          nextButtonTestId={SUBMIT_BUTTON_TEST_ID}
          entityName="Summary"
          lastScreenButtonData={
            manualSubscription
              ? {
                  label: 'Confirm',
                }
              : {
                  label: 'Subscribe',
                }
          }
        />
      }
      actionError={
        <>
          {paymentMethodUpdateError && (
            <ErrorMessage
              testId="commerce-payment-flow--error-message"
              title="Error processing payment method"
            >
              Your payment method couldn’t be processed. Please try again or
              contact support.
            </ErrorMessage>
          )}
        </>
      }
    >
      <TaskSection>
        <TaskH2>Billing address</TaskH2>
        <BillingDetailsInline billingDetails={billingDetails} />
      </TaskSection>
      <TaskSection>
        <TaskH2>Payment method</TaskH2>
        <PaymentMethodPanel paymentMethod={paymentMethod} />
      </TaskSection>
      <TaskSection>
        <CommercePolicyAgreementSubscriptionGeneric />
      </TaskSection>
      <TaskSection>
        <RepackageAtlaskitEvent actionSubjectId="agreeToToS">
          <CommercePolicyAgreementExplicit
            onAgreedChanged={setAgreed}
            ref={confirmationRef}
          />
        </RepackageAtlaskitEvent>
      </TaskSection>
    </TaskLayout>
  );
};

export const summaryStep: FlowStep<SummaryStepIn, SummaryStepOut> = {
  caption: 'Summary',
  component: withPaymentDetailsBreadcrumb(
    SummaryStep,
    BILLING_CONFIRMATION_SCREEN,
  ),
};
