import {
  GasV3Integration as BaseGasV3Integration,
  MetalIntegration as BaseMetalIntegration,
  SentryBrowserIntegration as BaseSentryBrowserIntegration,
} from '@atlassian/commerce-telemetry/integrations';

export type {
  GasV3IntegrationProps,
  MetalIntegrationProps,
  SentryBrowserIntegrationProps,
} from '@atlassian/commerce-telemetry/integrations';

import { withSafeGuard } from './telemetry-version-safe-guard';

export const MetalIntegration = withSafeGuard(BaseMetalIntegration);
export const GasV3Integration = withSafeGuard(BaseGasV3Integration);
export const SentryBrowserIntegration = withSafeGuard(
  BaseSentryBrowserIntegration,
);
