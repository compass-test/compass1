import { useEffect, useRef } from 'react';

import { ResponseError } from '../../common/types';
import {
  triggerNotificationsAPICallFailed,
  triggerNotificationsAPICallSucceeded,
  useCreateFireAnalyticsFromTrigger,
} from '../../common/utils/analytics';
import {
  markSeenApiRoute,
  markSeenNotificationsFetch,
} from '../utils/mark-seen-client';

export type MarkSeenServiceTypes = {
  firstRequestCompleted: boolean;
};

export const useMarkSeenService = ({
  firstRequestCompleted,
}: MarkSeenServiceTypes) => {
  const unseenCalled = useRef(false);
  const fireNotificationsAPICallSucceeded = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsAPICallSucceeded,
  );
  const fireNotificationsAPICallFailed = useCreateFireAnalyticsFromTrigger(
    triggerNotificationsAPICallFailed,
  );

  useEffect(() => {
    if (firstRequestCompleted && !unseenCalled.current) {
      markSeenNotificationsFetch()
        .then((_) => fireNotificationsAPICallSucceeded(markSeenApiRoute))
        .catch((e: ResponseError) =>
          fireNotificationsAPICallFailed(markSeenApiRoute, e.code),
        );
      unseenCalled.current = true;
    }
  }, [
    fireNotificationsAPICallSucceeded,
    fireNotificationsAPICallFailed,
    firstRequestCompleted,
    unseenCalled,
  ]);
};
