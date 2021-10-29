import React, { useContext, useEffect, useMemo, useState } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Waypoint } from 'react-waypoint';

import Button from '@atlaskit/button';

import {
  LoadingState,
  NotificationTimeGroup,
  TimeGroup,
} from '../../../../common/types';
import ChangeBoardBanner from '../../../../common/ui/changeboard-banner';
import { DocumentSkeleton } from '../../../../common/ui/document';
import { NotificationsStoreContext } from '../../../../common/ui/notifications-context';
import {
  triggerMarkAllReadButtonClicked,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../common/utils/analytics';
import { useFeatureFlag } from '../../../../common/utils/feature-flags';
import messages from '../../../../common/utils/i18n/messages';
import { ListFocusProvider } from '../../../../common/utils/useFocusManager';

import NotificationItem, {
  NotificationItemWithKeyboardNavigation,
} from './notification-item';
import {
  BlankSkeletonPlaceholder,
  ButtonContainer,
  GroupHeadingWrapper,
  NotificationFeed,
  SectionWrapper,
  TimeGroupHeading,
} from './styled';
import {
  calculateAboveGroup,
  calculateBelowGroup,
  resolveTimeGroupMessage,
} from './utils';

type NotificationListProps = {
  updateGroupingHeaders: (message: FormattedMessage.MessageDescriptor) => void;
};

function useBatchedRenderingLogic() {
  /**
   * This is very basic optimisation for tab switching
   * to avoid rendering hundreds of items, potentially with ADF when you tab switch.
   * Instead it will render a few, and then after 100ms, it will render the rest.
   * This doesn't take into account height of the window - all hardcoded.
   */
  const [renderLimit, setRenderLimit] = useState<number | null>(8);
  const [forceContentLoading, setForceContentLoading] = useState(true);
  useEffect(() => {
    let renderLimitTimeout: number | any = null;
    let contentLoadingTimeout = setTimeout(() => {
      setForceContentLoading(false);
      renderLimitTimeout = setTimeout(() => {
        setRenderLimit(null);
      }, 150);
    }, 150);
    return () => {
      if (renderLimitTimeout !== null) {
        clearTimeout(renderLimitTimeout);
      }
      clearTimeout(contentLoadingTimeout);
    };
  }, []);
  return {
    forceContentLoading,
    renderLimit,
  };
}

function NotificationList({
  updateGroupingHeaders,
  intl,
}: NotificationListProps & InjectedIntlProps) {
  const {
    state: {
      notifications,
      fetchState,
      isMarkAllAsReadVisible,
      markAllNotificationsRead,
    },
  } = useContext(NotificationsStoreContext);
  const notificationTimeGroups = useMemo(
    () =>
      notifications.filter(
        (notificationTimeGroup) =>
          notificationTimeGroup.notifications.length > 0,
      ),
    [notifications],
  );

  const isKeyboardNavigationEnabled = useFeatureFlag(
    'enableKeyboardNavigation',
    false,
  );
  const { renderLimit, forceContentLoading } = useBatchedRenderingLogic();

  let listIndex = 0;
  let skeletonsRenderCounter = 0;

  const onlyOlderTimeGroup =
    notificationTimeGroups.length === 1 &&
    notificationTimeGroups[0].timeGroup === TimeGroup.OLDER;

  const fireTriggerMarkAllRead = useCreateFireAnalyticsFromTrigger(
    triggerMarkAllReadButtonClicked,
  );
  const handleOnMarkAllClick = (event: React.MouseEvent) => {
    markAllNotificationsRead();
    fireTriggerMarkAllRead();
  };

  // Enter from above to inside is fired when scrolling up from a current group to a new group
  const handleNewGroupAbove = (
    previousPosition: string,
    currentPosition: string,
    index: number,
    timeGroups: NotificationTimeGroup[],
  ) => {
    const timeGroupMessage = calculateAboveGroup(
      previousPosition,
      currentPosition,
      index,
      timeGroups,
      onlyOlderTimeGroup,
    );
    if (timeGroupMessage !== undefined) {
      updateGroupingHeaders(timeGroupMessage);
    }
    return timeGroupMessage;
  };

  // Leave from inside to above is fired when scrolling down into a new group
  const handleNewGroupBelow = (
    previousPosition: string,
    currentPosition: string,
    index: number,
    timeGroups: NotificationTimeGroup[],
  ) => {
    const timeGroupMessage = calculateBelowGroup(
      previousPosition,
      currentPosition,
      index,
      timeGroups,
      onlyOlderTimeGroup,
    );
    if (timeGroupMessage !== undefined) {
      updateGroupingHeaders(timeGroupMessage);
    }
    return timeGroupMessage;
  };

  return (
    <NotificationFeed
      aria-label={intl.formatMessage({ ...messages.allyListDescription })}
      role="feed"
      aria-busy={fetchState === LoadingState.LOADING}
    >
      <ListFocusProvider isEnabled={isKeyboardNavigationEnabled}>
        <ChangeBoardBanner />
        {notificationTimeGroups.map((notificationTimeGroup, index) => (
          <SectionWrapper key={`time-group-${notificationTimeGroup.timeGroup}`}>
            <GroupHeadingWrapper>
              <TimeGroupHeading
                data-testid={`time-group-heading-${notificationTimeGroup.timeGroup}`}
              >
                <FormattedMessage
                  {...resolveTimeGroupMessage(
                    notificationTimeGroup.timeGroup,
                    onlyOlderTimeGroup,
                  )}
                />
              </TimeGroupHeading>
              {isMarkAllAsReadVisible && index === 0 && (
                <ButtonContainer>
                  <Button
                    testId="mark-all-button"
                    spacing="none"
                    appearance="subtle-link"
                    onClick={handleOnMarkAllClick}
                  >
                    <FormattedMessage {...messages.markAllAsRead} />
                  </Button>
                </ButtonContainer>
              )}
            </GroupHeadingWrapper>
            <Waypoint
              onEnter={({ previousPosition, currentPosition }) =>
                handleNewGroupAbove(
                  previousPosition,
                  currentPosition,
                  index,
                  notificationTimeGroups,
                )
              }
              onLeave={({ previousPosition, currentPosition }) =>
                handleNewGroupBelow(
                  previousPosition,
                  currentPosition,
                  index,
                  notificationTimeGroups,
                )
              }
              topOffset="50px"
            />
            {notificationTimeGroup.notifications.map((notification) => {
              if (renderLimit !== null && listIndex + 1 > renderLimit) {
                skeletonsRenderCounter += 1;
                if (skeletonsRenderCounter <= 8) {
                  return (
                    <DocumentSkeleton
                      key={notification.id}
                      showQuoteSkeleton={notification.bodyItemCount === 2}
                      testId="notification-item-opt-skeleton"
                    />
                  );
                }
                return (
                  <BlankSkeletonPlaceholder
                    key={notification.id}
                    data-testid="notification-item-opt-skeleton"
                  />
                );
              }
              return isKeyboardNavigationEnabled ? (
                <NotificationItemWithKeyboardNavigation
                  key={notification.id}
                  notification={notification}
                  listIndex={listIndex++}
                  forceContentLoading={forceContentLoading}
                />
              ) : (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  listIndex={listIndex++}
                  forceContentLoading={forceContentLoading}
                />
              );
            })}
          </SectionWrapper>
        ))}
      </ListFocusProvider>
    </NotificationFeed>
  );
}

export default injectIntl(NotificationList);
