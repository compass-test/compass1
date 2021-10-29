import React, { useCallback, useState } from 'react';

import { NarrowLayout, RevealContainer } from '@atlassian/commerce-layout';
import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import { TransactionAccountId } from '@atlassian/commerce-types';

import { BILLING_DETAILS_CAPTURE_FLOW } from '../../common/constants/breadcrumb-names';
import { FormErrorMessage } from '../../common/ui/error-message';
import { defineFlow, Flow } from '../../common/ui/Flow';
import {
  billingDetailsStep,
  BillingStepLoadingState,
  BillingStepOut,
} from '../../common/ui/steps/BillingDetailsStep';
import { Breadcrumb } from '../../common/utils/analytics';
import {
  FlowStartTimeProvider,
  FlowStartTimeRecorder,
} from '../../common/utils/flow-start-time';
import {
  BillingInitialDetails,
  useBillingDetailsDataLoaderService,
} from '../../service/initial-payment-flow-data';

type FlowProps = {
  onComplete(data: {
    billingDetails: BillingStepOut['billingDetails'];
    changed: boolean;
  }): void;
  onCancel?(): void;
  txa: TransactionAccountId;
};

const createFlowDefinition = (props: FlowProps & BillingInitialDetails) =>
  defineFlow(
    {
      ...props,
    },
    billingDetailsStep,
  );

const FlowLoader: React.FC<FlowProps & { retry: () => void }> = (props) => {
  const { txa, retry, onComplete, onCancel } = props;
  const { loading, error, data } = useBillingDetailsDataLoaderService(txa);

  const reduceDataOnComplete = useCallback(
    ({ billingDetails, billingDetailsChanged }: BillingStepOut) => {
      onComplete({
        billingDetails,
        changed: billingDetailsChanged,
      });
    },
    [onComplete],
  );

  return (
    <RevealContainer
      condition={!loading}
      fallback={<BillingStepLoadingState />}
    >
      {!error && data ? (
        <Flow
          definition={createFlowDefinition({ ...props, ...data })}
          onComplete={reduceDataOnComplete}
          onCancel={onCancel}
          displayProgress={false}
        />
      ) : (
        <FormErrorMessage retry={retry} />
      )}
    </RevealContainer>
  );
};

export const BillingDetailsFlow: React.FC<FlowProps> = ({
  txa,
  onComplete,
  onCancel,
}) => {
  const [retry, setRetry] = useState(0);

  return (
    <FlowStartTimeProvider>
      <FlowStartTimeRecorder />
      <InternalCommerceTelemetryIntegrations>
        <Breadcrumb name={BILLING_DETAILS_CAPTURE_FLOW}>
          <NarrowLayout>
            <FlowLoader
              key={retry}
              txa={txa}
              onComplete={onComplete}
              onCancel={onCancel}
              retry={() => setRetry((retry) => retry + 1)}
            />
          </NarrowLayout>
        </Breadcrumb>
      </InternalCommerceTelemetryIntegrations>
    </FlowStartTimeProvider>
  );
};
