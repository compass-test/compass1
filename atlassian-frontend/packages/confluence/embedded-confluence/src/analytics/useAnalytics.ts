import { useRef, useEffect } from 'react';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import type { ExperienceTrackerAPI } from '@atlassian/experience-tracker/ExperienceTracker';

import { EXPERIENCE_NAME_PREFIX } from '../experience-tracker/ExperienceNames';
import { ANALYTICS_CHANNEL } from '.';
import { createExperienceTrackerAnalyticsEventPayload } from './createExperienceTrackerAnalyticsEventPayload';

export const useAnalytics = (experienceTracker: ExperienceTrackerAPI) => {
  const unsubscribeRef = useRef<
    ReturnType<ExperienceTrackerAPI['subscribe']>
  >();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  if (!unsubscribeRef.current && experienceTracker) {
    unsubscribeRef.current = experienceTracker.subscribe((event) => {
      if (event.name.startsWith(EXPERIENCE_NAME_PREFIX)) {
        // Fire the analytic event to dedicated ANALYTICS_CHANNEL channel for EP analytics.
        createAnalyticsEvent(
          createExperienceTrackerAnalyticsEventPayload(event),
        ).fire(ANALYTICS_CHANNEL);
      }
    });
  }

  useEffect(() => unsubscribeRef.current, []);
};
