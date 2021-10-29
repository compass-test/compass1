import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { useInitialiseGspFeatureFlags } from '../../controllers/feature-flags';
import { Environment } from '../../common/types';

export interface InitialiseFeatureFlagsProps {
  analyticsClient: typeof AnalyticsWebClient;
  environment: Environment;
  cloudId: string;
  children: JSX.Element;
}

export const InitialiseFeatureFlags = ({
  analyticsClient,
  environment,
  cloudId,
  children,
}: InitialiseFeatureFlagsProps) => {
  const { isInitialised } = useInitialiseGspFeatureFlags(
    analyticsClient,
    environment,
    cloudId,
  );
  return isInitialised ? children : null;
};
