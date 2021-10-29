import React, { FC } from 'react';

import {
  Breadcrumb,
  InternalCommerceTelemetryIntegrations,
  useTaskTracker,
} from '@atlassian/commerce-telemetry';

export { useTaskTracker, Breadcrumb };

export const TelemetryRoot: FC = ({ children }) => (
  <InternalCommerceTelemetryIntegrations>
    {children}
  </InternalCommerceTelemetryIntegrations>
);
