import React from 'react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { DEFAULT_GAS_CHANNEL, LimitedGasPayload } from './events';

export const useAnalytics = () => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  return {
    fireAnalyticsEvent: React.useCallback(
      (payload: LimitedGasPayload) =>
        createAnalyticsEvent(payload).fire(DEFAULT_GAS_CHANNEL),
      [createAnalyticsEvent],
    ),
  };
};
