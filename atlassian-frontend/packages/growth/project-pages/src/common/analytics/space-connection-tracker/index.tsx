import { useEffect } from 'react';
import { sendTrackAnalyticsEvent } from '../analytics-web-client';
import { Props } from './types';

const SpaceConnectionTracker = ({
  connectionState,
  isGranularPagesExperiment,
}: Props) => {
  useEffect(() => {
    if (!['CONNECTED', 'NOT_CONNECTED', 'ERROR'].includes(connectionState)) {
      return;
    }
    sendTrackAnalyticsEvent({
      source: 'space.tracker',
      action: 'retrieved',
      actionSubject: 'fetchSpaceConnectionStatus',
      attributes: { status: connectionState, isGranularPagesExperiment },
    });
  }, [connectionState, isGranularPagesExperiment]);
  return null;
};

export default SpaceConnectionTracker;
