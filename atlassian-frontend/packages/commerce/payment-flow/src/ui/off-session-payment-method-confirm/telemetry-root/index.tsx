import React from 'react';

import * as BillingDetailsListeners from '@atlassian/commerce-billing-details/telemetry-listeners';
import * as BillingHistoryListeners from '@atlassian/commerce-billing-history/telemetry-listeners';
import * as CreditCardListeners from '@atlassian/commerce-credit-card-ccp/telemetry-listeners';
import * as CommerceEnviromentListeners from '@atlassian/commerce-environment/telemetry-listeners';
import {
  ChannelVersionFragmentationSafeGuard,
  InternalCommerceTelemetryIntegrations,
} from '@atlassian/commerce-telemetry';

export const TelemetryRoot: React.FC = ({ children }) => {
  return (
    <InternalCommerceTelemetryIntegrations>
      <ChannelVersionFragmentationSafeGuard
        childPackageListenerModules={[
          CommerceEnviromentListeners,
          BillingDetailsListeners,
          BillingHistoryListeners,
          CreditCardListeners,
        ]}
      >
        {children}
      </ChannelVersionFragmentationSafeGuard>
    </InternalCommerceTelemetryIntegrations>
  );
};
