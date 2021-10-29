import { useCallback } from 'react';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';

import { MPT_ANALYTICS_CHANNEL } from '../../common/constants';
import type { AllMigrationPayload } from '../../common/types';

// The wrapper to make sure the consumer create the event with the designated payloads
type CreateMigrationAnalyticsEvent = (
  payload: AllMigrationPayload,
) => UIAnalyticsEvent;

const useAnalyticsEventsController = (): CreateMigrationAnalyticsEvent => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  return useCallback<CreateMigrationAnalyticsEvent>(
    (payload) => {
      const analyticsEvent = createAnalyticsEvent(payload);

      // Attach the channel so the consumer need not to worry about that
      analyticsEvent.fire = analyticsEvent.fire.bind(
        analyticsEvent,
        MPT_ANALYTICS_CHANNEL,
      );
      return analyticsEvent;
    },
    [createAnalyticsEvent],
  );
};

export default useAnalyticsEventsController;
