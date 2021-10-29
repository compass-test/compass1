import React, { lazy, ReactElement, useContext, useEffect } from 'react';

import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

import { RequestReadState } from '../../../../../common/types';
import { ErrorBoundarySuspense } from '../../../../../common/ui/error-boundary-suspense';
import { NotificationsStoreContext } from '../../../../../common/ui/notifications-context';
import {
  triggerViewedAllNotificationsUIEvent,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../../common/utils/analytics';
import messages from '../../../../../common/utils/i18n/messages';

import { CenterLayout, SmallSVGContainer, Text } from './styled';

interface NoMoreToLoadProps {
  viewedCount: number;
}

const Flag = lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification-list/Flag" */
      '../../../../../common/ui/flag'
    ),
);

export const NoMoreToLoad = ({
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
    <CenterLayout data-testid="no-more-to-load">
      <SmallSVGContainer>
        <ErrorBoundarySuspense
          loadingFallback={<svg />}
          errorFallback={<svg />}
          subjectId="flag"
        >
          <Flag />
        </ErrorBoundarySuspense>
      </SmallSVGContainer>
      <Text>
        {readStateFilter === RequestReadState.UNREAD ? (
          <FormattedHTMLMessage {...messages.readAllNotifications} />
        ) : (
          <FormattedMessage {...messages.upToDateDescription} />
        )}
      </Text>
    </CenterLayout>
  );
};
