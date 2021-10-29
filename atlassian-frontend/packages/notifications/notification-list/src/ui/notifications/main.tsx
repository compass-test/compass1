import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import { NotificationsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import {
  collectAll,
  ExperienceStart,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

import { initialFilters } from '../../common/constants';
import {
  AnalyticsContext,
  LoadingState,
  RequestReadState,
} from '../../common/types';
import ErrorBoundary from '../../common/ui/error-boundary';
import {
  NotificationsStoreContext,
  NotificationsStoreState,
} from '../../common/ui/notifications-context';
import { SloFailureReason } from '../../common/utils/analytics/types';
import { getAnalyticsContext } from '../../common/utils/analytics/utils';
import { ChangeBoardContextProvider } from '../../common/utils/changeboard-context';
import NotificationsExperienceTracker from '../../common/utils/experience-tracking';
import {
  ExperienceIds,
  Experiences,
} from '../../common/utils/experience-tracking/types';
import {
  FeatureFlags,
  FeatureFlagsProvider,
} from '../../common/utils/feature-flags';
import NotificationIntlProvider from '../../common/utils/i18n/intl-provider';
import { loadReadStateFilterFromLocalStorage } from '../../services/utils/local-storage-util';

import NotificationsLayout from './layout';

type NotificationsProps = {
  /** Optional current UserId for ADF mention highlighting **/
  userId?: string;
  testId?: string;
  cloudId?: string;
  product?: string;
  featureFlags?: FeatureFlags;
};

export default function Notifications({
  testId,
  userId,
  cloudId,
  product,
  featureFlags,
}: NotificationsProps) {
  const experienceTracker = useContext(ExperienceTrackerContext);

  const errorBoundaryExperienceCallback = () => {
    experienceTracker.fail({
      name: Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT,
      error: new Error(SloFailureReason.ROOT_ERROR_BOUNDARY),
    });

    experienceTracker.fail({
      name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
      error: new Error(SloFailureReason.ROOT_ERROR_BOUNDARY),
    });
  };

  const analyticsContextRef = React.useRef<AnalyticsContext>({
    readStateFilter: loadReadStateFilterFromLocalStorage(),
    requestCategory: initialFilters.categoryFilter,
    cloudId,
    product,
  });
  const [notificationsState, updateNotificationsState] = React.useState<
    NotificationsStoreState
  >({
    userId,
    notifications: [],
    canLoadMore: false,
    fetchState: LoadingState.INITIAL,
    fetchData: () => {},
    isMarkAllAsReadVisible: false,
    markBulkNotifications: () => {},
    markAllNotificationsRead: () => {},
    readStateFilter: RequestReadState.ANY,
    requestCategory: initialFilters.categoryFilter,
    toggleReadStateFilter: () => {},
  });

  const analyticsContextData = useMemo(() => getAnalyticsContext(), []);
  const updateAnalyticsContext = useCallback(
    (fn: (prevContext: AnalyticsContext) => AnalyticsContext) => {
      analyticsContextRef.current = fn(analyticsContextRef.current);
    },
    [],
  );

  const intlLocaleRef = React.useRef<string>('en-US');
  const updateIntlLocaleRef = (intlLocale: string) => {
    intlLocaleRef.current = intlLocale;
  };

  useEffect(() => {
    updateNotificationsState((previousState) => ({
      ...previousState,
      userId,
    }));
  }, [userId, updateNotificationsState]);

  useEffect(() => {
    updateAnalyticsContext((previousState) => ({
      ...previousState,
      cloudId,
    }));
  }, [cloudId, updateAnalyticsContext]);

  return (
    <NotificationsStoreContext.Provider
      value={{
        state: notificationsState,
        updateState: updateNotificationsState,
        analyticsContext: analyticsContextRef,
        updateAnalyticsContext,
        intlLocale: intlLocaleRef,
        updateIntlLocale: updateIntlLocaleRef,
      }}
    >
      <NotificationIntlProvider>
        <NotificationsAnalyticsContext data={analyticsContextData}>
          <NotificationsExperienceTracker>
            <FeatureFlagsProvider flags={featureFlags}>
              <ErrorBoundary
                subjectId="root"
                onErrorCallback={errorBoundaryExperienceCallback}
                isCritical
              >
                <ExperienceStart
                  name={Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT}
                  id={ExperienceIds.FIRST_LOAD}
                />
                <ExperienceStart
                  name={Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT}
                  id={ExperienceIds.FIRST_LOAD}
                  collect={collectAll([
                    Experiences.RENDER_NOTIFICATION_PAGE_WITH_CONTENT,
                  ])}
                />
                <ChangeBoardContextProvider>
                  <NotificationsLayout testId={testId} />
                </ChangeBoardContextProvider>
              </ErrorBoundary>
            </FeatureFlagsProvider>
          </NotificationsExperienceTracker>
        </NotificationsAnalyticsContext>
      </NotificationIntlProvider>
    </NotificationsStoreContext.Provider>
  );
}
