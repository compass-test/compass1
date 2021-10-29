import { useCallbackWithAnalytics } from '@atlaskit/analytics-next';

import { MPT_ANALYTICS_CHANNEL } from '../../common/constants';
import type { AllMigrationPayload } from '../../common/types';

type AnyFunction = (...args: any[]) => void;

const useCallbackWithAnalyticsController = (
  method: AnyFunction,
  payload: AllMigrationPayload,
): AnyFunction => {
  return useCallbackWithAnalytics(method, payload, MPT_ANALYTICS_CHANNEL);
};

export default useCallbackWithAnalyticsController;
