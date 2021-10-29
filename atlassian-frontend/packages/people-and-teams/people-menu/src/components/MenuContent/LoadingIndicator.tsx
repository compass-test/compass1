import { useEffect } from 'react';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import { startMeasure, stopMeasure } from '../../utils/performance';
import { triggerAnalyticsForLoadingIndicator } from '../analytics';

function LoadingIndicator(props: WithAnalyticsEventsProps) {
  const { createAnalyticsEvent } = props;

  useEffect(() => {
    startMeasure('loadingIndicator');

    return () => {
      stopMeasure('loadingIndicator', (duration, startTime) => {
        triggerAnalyticsForLoadingIndicator(
          createAnalyticsEvent,
          duration,
          startTime,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default withAnalyticsEvents()(LoadingIndicator);
