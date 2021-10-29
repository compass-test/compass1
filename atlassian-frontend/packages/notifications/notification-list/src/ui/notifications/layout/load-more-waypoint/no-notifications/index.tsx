import React, { lazy, ReactElement, useContext, useEffect } from 'react';

import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

import { ExperienceSuccess } from '@atlassian/experience-tracker';

import { RequestReadState } from '../../../../../common/types';
import { ErrorBoundarySuspense } from '../../../../../common/ui/error-boundary-suspense';
import { NotificationsStoreContext } from '../../../../../common/ui/notifications-context';
import {
  triggerViewedAllNotificationsUIEvent,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../../common/utils/analytics';
import { Experiences } from '../../../../../common/utils/experience-tracking/types';
import messages from '../../../../../common/utils/i18n/messages';

import {
  CenterLayout,
  NoNotificationsSkeleton,
  NoNotificationsTextContainer,
  Text,
} from './styled';

interface NoMoreToLoadProps {
  viewedCount: number;
}

const NoNotificationsSVG = lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification-list/NoNotificationsSVG" */
      '../../../../../common/ui/no-notifications'
    ),
);

export const NoMoreNotifications = ({
  viewedCount,
}: NoMoreToLoadProps): ReactElement => {
  const {
    state: { readStateFilter },
  } = useContext(NotificationsStoreContext);
  const fireViewedAllNotifications = useCreateFireAnalyticsFromTrigger(
    triggerViewedAllNotificationsUIEvent,
  );
  useEffect(() => {
    fireViewedAllNotifications(viewedCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CenterLayout data-testid="no-more-notifications">
      <ExperienceSuccess
        name={Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT}
        attributes={{ noNotificationsScreen: true }}
      />
      <ErrorBoundarySuspense
        loadingFallback={
          <span>
            <NoNotificationsSkeleton />
          </span>
        }
        errorFallback={
          <span>
            <NoNotificationsSkeleton noAnimation />
          </span>
        }
        subjectId="noNotifications"
      >
        <NoNotificationsSVG />
      </ErrorBoundarySuspense>
      <NoNotificationsTextContainer>
        <Text>
          {readStateFilter === RequestReadState.ANY ? (
            <FormattedMessage {...messages.noNotificationsLoadingDescription} />
          ) : (
            <FormattedHTMLMessage {...messages.noUnreadNotifications} />
          )}
        </Text>
      </NoNotificationsTextContainer>
    </CenterLayout>
  );
};
