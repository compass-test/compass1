import { useEffect } from 'react';

import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';

import useUsersTeamsData from '../../hooks/useUsersTeamsData';
import { Product } from '../../types';
import { startMeasure, stopMeasure } from '../../utils/performance';
import {
  triggerAnalyticsForFetchingData,
  triggerAnalyticsForPreFetchData,
} from '../analytics';

interface Props {
  cloudId: string;
  orgId?: string;
  userId: string;
  product: Product;
  tenantUrl?: string;
}

// A dummy component is rendered to trigger to pre-fetch users and teams data.
export function UsersTeamsPreFetchInternal({
  cloudId,
  orgId,
  userId,
  product,
  tenantUrl,
  createAnalyticsEvent,
}: Props & WithAnalyticsEventsProps) {
  useEffect(() => {
    triggerAnalyticsForPreFetchData(createAnalyticsEvent);
    // measure duration time of fetching users and teams data
    startMeasure('fetchingData');
  }, [createAnalyticsEvent]);

  const { isLoading } = useUsersTeamsData(
    cloudId,
    userId,
    product,
    tenantUrl,
    undefined,
    orgId,
  );

  // stop to measure fetching data time when isLoading is finished.
  useEffect(() => {
    if (!isLoading) {
      stopMeasure('fetchingData', (duration, startTime) => {
        triggerAnalyticsForFetchingData(
          createAnalyticsEvent,
          duration,
          startTime,
        );
      });
    }
  }, [createAnalyticsEvent, isLoading]);

  return null;
}

export const UsersTeamsPreFetch = withAnalyticsEvents()(
  UsersTeamsPreFetchInternal,
);
