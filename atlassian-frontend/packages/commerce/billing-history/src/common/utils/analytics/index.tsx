import React from 'react';

import { InternalCommerceTelemetryIntegrations } from '@atlassian/commerce-telemetry';
import {
  Breadcrumb,
  RepackageAtlaskitEvent,
} from '@atlassian/commerce-telemetry/dispatch-hooks';

import { BILLING_HISTORY_TABLE } from '../../constants/breadcrumb-names';

export { RepackageAtlaskitEvent };

export const AnalyticsRoot: React.FC = ({ children }) => (
  <InternalCommerceTelemetryIntegrations>
    <Breadcrumb name={BILLING_HISTORY_TABLE}>{children}</Breadcrumb>
  </InternalCommerceTelemetryIntegrations>
);
