import React, { useState } from 'react';

import { CCPCreditCardFormState } from '@atlassian/commerce-credit-card-ccp';
import { NarrowLayout, RevealContainer } from '@atlassian/commerce-layout';
import { isCreditCardPaymentMethod } from '@atlassian/commerce-payment-methods';
import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import {
  InvoiceGroupId,
  RenewalFrequency,
  TransactionAccountId,
} from '@atlassian/commerce-types';

import { FormErrorMessage } from '../../common/ui/error-message';
import { defineFlow, Flow } from '../../common/ui/Flow';
import {
  billingDetailsStep,
  BillingStepLoadingState,
} from '../../common/ui/steps/BillingDetailsStep';
import { paymentDetailsStep } from '../../common/ui/steps/PaymentDetailsStep';
import { summaryStep, SummaryStepOut } from '../../common/ui/steps/SummaryStep';
import { PaymentCaptureFlowBreadcrumb } from '../../common/utils/analytics';
import {
  FlowStartTimeProvider,
  FlowStartTimeRecorder,
} from '../../common/utils/flow-start-time';
import {
  InitialDetails,
  useInitialDataLoaderService,
} from '../../service/initial-payment-flow-data';

type FlowProps = {
  onComplete(data: SummaryStepOut): void;
  onCancel?(): void;
  txa: TransactionAccountId;
  ig: InvoiceGroupId;
  renewalFrequency?: RenewalFrequency;
  manualSubscription?: boolean;
};

const createAddFlowDefinition = (props: FlowProps & InitialDetails) =>
  defineFlow(
    {
      ...props,
      isUpdatingPaymentMethod: false,
      paymentMethod: undefined,
    },
    billingDetailsStep,
    paymentDetailsStep,
    summaryStep,
  );

const createUpdateFlowDefinition = (props: FlowProps & InitialDetails) =>
  defineFlow(
    {
      ...props,
      isUpdatingPaymentMethod: false,
      paymentMethod: props.initialPaymentMethod,
    },
    billingDetailsStep,
    paymentDetailsStep,
  );

const createChooseCardFlowDefinition = (props: FlowProps & InitialDetails) =>
  defineFlow(
    {
      ...props,
      isUpdatingPaymentMethod: false,
      paymentMethod: props.initialPaymentMethod,
    },
    billingDetailsStep,
    paymentDetailsStep,
    summaryStep,
  );

const createFlowDefinition = (data: FlowProps & InitialDetails) => {
  if (data.initialPaymentMethod) {
    return isCreditCardPaymentMethod(data.initialPaymentMethod)
      ? createChooseCardFlowDefinition({ ...data })
      : createUpdateFlowDefinition({ ...data });
  }
  return data.paymentMethods.filter(isCreditCardPaymentMethod).length > 0
    ? createChooseCardFlowDefinition({
        ...data,
      })
    : createAddFlowDefinition({ ...data });
};

const FlowLoader: React.FC<FlowProps & { retry: () => void }> = (props) => {
  const { txa, ig, retry, onComplete, onCancel } = props;
  const { loading, error, data } = useInitialDataLoaderService(txa, ig);

  return (
    <RevealContainer
      condition={!loading}
      fallback={<BillingStepLoadingState />}
    >
      {!error && data ? (
        <CCPCreditCardFormState accountId={txa}>
          <Flow
            definition={createFlowDefinition({ ...props, ...data })}
            onComplete={onComplete}
            onCancel={onCancel}
          />
        </CCPCreditCardFormState>
      ) : (
        <FormErrorMessage retry={retry} />
      )}
    </RevealContainer>
  );
};

export const PaymentDetailsFlow: React.FC<FlowProps> = ({
  txa,
  ig,
  renewalFrequency = 'monthly',
  manualSubscription = false,
  onComplete,
  onCancel,
}) => {
  const [retry, setRetry] = useState(0);

  return (
    <FlowStartTimeProvider>
      <FlowStartTimeRecorder />
      <InternalCommerceTelemetryIntegrations>
        <PaymentCaptureFlowBreadcrumb>
          <NarrowLayout>
            <FlowLoader
              key={retry}
              txa={txa}
              ig={ig}
              renewalFrequency={renewalFrequency}
              manualSubscription={manualSubscription}
              onComplete={onComplete}
              onCancel={onCancel}
              retry={() => setRetry((retry) => retry + 1)}
            />
          </NarrowLayout>
        </PaymentCaptureFlowBreadcrumb>
      </InternalCommerceTelemetryIntegrations>
    </FlowStartTimeProvider>
  );
};
