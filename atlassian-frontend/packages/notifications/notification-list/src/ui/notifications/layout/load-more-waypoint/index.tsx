import React, { useContext } from 'react';

import { Waypoint } from 'react-waypoint';

import { LoadingState } from '../../../../common/types';
import { ErrorBoundarySuspense } from '../../../../common/ui/error-boundary-suspense';
import { NotificationsStoreContext } from '../../../../common/ui/notifications-context';
import { TextSkeleton } from '../../../../common/ui/text-skeleton';
import { useFeatureFlag } from '../../../../common/utils/feature-flags';

import { NoMoreToLoad } from './no-more-to-load';
import { NoMoreNotifications } from './no-notifications';
import NotificationItemSkeleton from './notification-item-skeleton';
import { PlaceholderSpacing } from './styled';
import { TotalFailure } from './total-failure';

const ShortcutsProTip = React.lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification-list/pro-tip" */
      '../../../../common/ui/shortcut-pro-tip'
    ),
);

const LoadMoreWaypoint = () => {
  const {
    state: { notifications, fetchState, canLoadMore, fetchData },
  } = useContext(NotificationsStoreContext);

  const listSize = notifications.reduce<number>((curr, notificationGroup) => {
    return curr + notificationGroup.notifications.length;
  }, 0);

  const skeletonsToRender = listSize >= 6 ? 1 : 6 - listSize;
  const isProTipEnabled = useFeatureFlag('enableKeyboardNavigation', false);

  switch (fetchState) {
    case LoadingState.ERROR: {
      return <TotalFailure notificationsRendered={listSize} />;
    }
    case LoadingState.LOADING: {
      return (
        <>
          {listSize === 0 && <TextSkeleton width={'50px'} marginBottom="8px" />}
          {[...Array(skeletonsToRender)].map((_, index) => (
            <NotificationItemSkeleton key={index} />
          ))}
        </>
      );
    }
    case LoadingState.COMPLETE: {
      if (canLoadMore) {
        return (
          <>
            <Waypoint key="load-more" onEnter={fetchData}>
              <PlaceholderSpacing data-testid="load-more-waypoint" />
            </Waypoint>
            {/* Show the spinner to avoid the flicker effect of going from LOADING -> COMPLETE -> LOADING */}
            <NotificationItemSkeleton />
          </>
        );
      }

      if (listSize === 0) {
        return (
          <>
            <NoMoreNotifications viewedCount={listSize} />
            {isProTipEnabled && (
              <ErrorBoundarySuspense
                subjectId="shortcuts-pro-tip"
                loadingFallback={<></>}
              >
                <ShortcutsProTip />
              </ErrorBoundarySuspense>
            )}
          </>
        );
      }
      return (
        <>
          <NoMoreToLoad viewedCount={listSize} />
          {isProTipEnabled && (
            <ErrorBoundarySuspense
              subjectId="shortcuts-pro-tip"
              loadingFallback={<></>}
            >
              <ShortcutsProTip />
            </ErrorBoundarySuspense>
          )}
        </>
      );
    }
    case LoadingState.INITIAL:
    default: {
      return null;
    }
  }
};

export default LoadMoreWaypoint;
