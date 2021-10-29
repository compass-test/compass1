import { useCallback, useContext, useRef } from 'react';

import { ExperienceTrackerContext } from '@atlassian/experience-tracker';

import {
  NotificationResponse,
  RequestCategory,
  RequestReadState,
  ResponseError,
} from '../../common/types';
import { NotificationsStoreContext } from '../../common/ui/notifications-context';
import {
  triggerNotificationsFailedToLoad,
  triggerNotificationsLoaded,
  useCreateFireAnalyticsFromTrigger,
} from '../../common/utils/analytics';
import PerformanceFacade from '../../common/utils/facade/performance';
import { useFetchService } from '../use-fetch-service';
import fetchNotifications from '../utils/inbox-client';
import { RequestExpand } from '../utils/inbox-client/types';

import { handleWithContentExperienceTracking } from './utils';

const performance = new PerformanceFacade(window.performance);

export type InboxClientOptions = {
  categoryFilter: RequestCategory;
  readStateFilter: RequestReadState;
  expand: RequestExpand;
};

export const useInboxClient = ({
  categoryFilter,
  readStateFilter,
  expand,
}: InboxClientOptions) => {
  const { intlLocale } = useContext(NotificationsStoreContext);
  const experienceTracker = useContext(ExperienceTrackerContext);
  const firstLoad = useRef(true);
  const fireNotificationsLoaded = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsLoaded,
  );
  const fireNotificationsFailedToLoad = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsFailedToLoad,
  );
  const withContent = expand === RequestExpand.CONTENT;
  const notificationsRequest = useCallback(
    (continuationToken?: string, limit: number = 8) => {
      const start = performance.now();
      return fetchNotifications(
        categoryFilter,
        readStateFilter,
        expand,
        intlLocale.current,
        continuationToken,
        limit,
      )
        .then((r) => {
          const duration = Math.trunc(performance.now() - start);
          fireNotificationsLoaded(
            firstLoad.current,
            withContent,
            duration,
            limit,
          );
          if (withContent) {
            handleWithContentExperienceTracking(r, experienceTracker);
          }
          firstLoad.current = false;
          return r;
        })
        .catch((e: ResponseError) => {
          fireNotificationsFailedToLoad(
            firstLoad.current,
            withContent,
            limit,
            e.code,
          );
          firstLoad.current = false;
          throw e;
        });
    },
    [
      categoryFilter,
      readStateFilter,
      expand,
      intlLocale,
      fireNotificationsLoaded,
      withContent,
      experienceTracker,
      fireNotificationsFailedToLoad,
    ],
  );

  const {
    loadingState,
    error,
    data,
    fetchData,
    lastCallTimestamp,
  } = useFetchService<
    NotificationResponse,
    [string | undefined, number | undefined]
  >(
    notificationsRequest,
    {
      notifications: [],
    },
    'inbox-client',
  );

  return {
    loadingState,
    error,
    data,
    lastCallTimestamp,
    fetchData,
  };
};
