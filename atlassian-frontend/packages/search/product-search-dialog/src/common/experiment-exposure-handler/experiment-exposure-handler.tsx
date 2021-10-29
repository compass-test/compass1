import { useEffect } from 'react';
import { useAnalytics } from '../analytics';
import { useSearchSessionId } from '../search-session-provider';

export default () => {
  const searchSessionId = useSearchSessionId();
  const { fireAnalyticsEvent } = useAnalytics();

  useEffect(() => {
    fireAnalyticsEvent({
      eventType: 'operational',
      action: 'exposed',
      actionSubject: 'quickSearchExperiment',
      source: 'searchDialog',
      // ABTest will be added as part of the context
    });
    // We keep the searchSessionId here because we want a new experiment exposure event every new session
  }, [fireAnalyticsEvent, searchSessionId]);

  return null;
};
