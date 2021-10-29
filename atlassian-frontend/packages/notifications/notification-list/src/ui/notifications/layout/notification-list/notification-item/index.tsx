import React, { useContext, useRef, useState } from 'react';

import { FormattedRelative, InjectedIntlProps, injectIntl } from 'react-intl';
import { Waypoint } from 'react-waypoint';

import {
  ExperienceSuccess,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

import {
  LoadingState,
  MarkRequestReadState,
  ReadState as RenderableReadState,
} from '../../../../../common/types';
import { AvatarSkeleton } from '../../../../../common/ui/avatar-layout';
import {
  DocumentError,
  DocumentSkeleton,
} from '../../../../../common/ui/document';
import ErrorBoundary from '../../../../../common/ui/error-boundary';
import { ErrorBoundarySuspense } from '../../../../../common/ui/error-boundary-suspense';
import { NotificationsStoreContext } from '../../../../../common/ui/notifications-context';
import {
  triggerDocumentCollapsed,
  triggerDocumentExpanded,
  triggerKeyboardShortcutUsed,
  triggerMarkOneReadButtonClicked,
  triggerNotificationLinkClicked,
  triggerNotificationViewedTrackEvent,
  useCreateFireAnalyticsFromTrigger,
} from '../../../../../common/utils/analytics';
import { LinkType } from '../../../../../common/utils/analytics/types';
import {
  AbortReason,
  Experiences,
} from '../../../../../common/utils/experience-tracking/types';
import { useFocus } from '../../../../../common/utils/useFocus';
import {
  keyboardEventToAction,
  useFocusManager,
} from '../../../../../common/utils/useFocusManager';
import { KeyboardActionToAnalyticSubject } from '../../../../../common/utils/useFocusManager/types';
import { RenderableNotification } from '../../../../../services/use-notification-list-store/types';

import AvatarContainer from './avatar-container';
import ReadStateIndicator from './read-state-indicator';
import {
  DocumentLeftSpacing,
  DocumentWrapper,
  EnableMouseEventsDocumentWrapper,
  EnableMouseEventsProfileWrapper,
  EntityIcon,
  EntityText,
  ItemContainer,
  MainAction,
  NotificationContainer,
  PathText,
  PathWrapper,
  SummaryContainer,
  SummaryText,
  Timestamp,
} from './styled';
import { buildPathText } from './utils';

const DocumentContainer = React.lazy(
  () =>
    import(
      /* webpackChunkName: "@atlaskit-internal_notification_body" */
      './document-container'
    ),
);

export type NotificationItemProps = {
  notification: RenderableNotification;
  forceContentLoading: boolean;
  listIndex: number;
};

const ViewedTracker = ({
  listIndex,
  notification,
}: Omit<NotificationItemProps, 'forceContentLoading'>) => {
  const fired = useRef(false);
  const [viewed, setViewed] = useState(false);
  const fireNotificationViewedTrackEvent = useCreateFireAnalyticsFromTrigger(
    triggerNotificationViewedTrackEvent,
  );

  const onEntered = () => {
    if (fired.current) {
      return;
    }
    fired.current = true;
    fireNotificationViewedTrackEvent(notification, listIndex);
    setViewed(true);
  };

  if (viewed) {
    return null;
  }
  return (
    <Waypoint key="notification-viewed" onEnter={onEntered}>
      <span />
    </Waypoint>
  );
};

function NotificationItem({
  notification,
  forceContentLoading,
  listIndex,
  intl,
}: NotificationItemProps & InjectedIntlProps) {
  const {
    state: { markBulkNotifications },
  } = useContext(NotificationsStoreContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const fireNotificationLinkClicked = useCreateFireAnalyticsFromTrigger(
    triggerNotificationLinkClicked,
  );
  const fireMarkOneReadClicked = useCreateFireAnalyticsFromTrigger(
    triggerMarkOneReadButtonClicked,
  );
  const fireTriggerDocumentExpanded = useCreateFireAnalyticsFromTrigger(
    triggerDocumentExpanded,
  );
  const fireTriggerDocumentCollapsed = useCreateFireAnalyticsFromTrigger(
    triggerDocumentCollapsed,
  );
  const experienceTracker = useContext(ExperienceTrackerContext);

  const ref = useRef<HTMLAnchorElement>(null);

  const handleDocumentChunkFail = () => {
    experienceTracker.abort({
      name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
      reason: AbortReason.CLIENT_ERROR,
    });
  };

  const pathText = buildPathText(
    notification.content.path,
    notification.content.entity,
  );

  const handleToggleReadState = () => {
    const toState =
      notification.readState === RenderableReadState.READ
        ? MarkRequestReadState.UNREAD
        : MarkRequestReadState.READ;
    fireMarkOneReadClicked(toState, notification, listIndex);
    markBulkNotifications([notification], toState);
  };

  const toggleExpanded = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    if (newIsExpanded) {
      fireTriggerDocumentExpanded(notification, listIndex);
    } else {
      fireTriggerDocumentCollapsed(notification, listIndex);
    }
  };

  const handleClick = (linkType: LinkType) => {
    if (notification.readState === RenderableReadState.UNREAD) {
      markBulkNotifications([notification], MarkRequestReadState.READ);
    }
    if (notification.content.entity?.link) {
      fireNotificationLinkClicked(notification, listIndex, linkType);
    }
  };

  const getMainActionLabel = () => {
    if (
      !notification.content.actions ||
      notification.content.actions.length === 0
    ) {
      return notification.content.message;
    }

    return notification.content.actions[0].title;
  };

  const expectedBodyItemCount = notification.bodyItemCount;
  const actualBodyItemCount = notification.content?.body?.items.length ?? 0;
  const bodyItemCount =
    notification.loadingState === LoadingState.COMPLETE
      ? actualBodyItemCount
      : expectedBodyItemCount;

  const showQuoteSkeleton = notification.bodyItemCount === 2;

  return (
    <React.Fragment>
      <ViewedTracker notification={notification} listIndex={listIndex} />
      <ItemContainer
        data-testid="notification-item-container"
        aria-describedby={notification.id + '_summary'}
        aria-posinset={listIndex}
        aria-setsize={-1} // -1 As the total list size in indeterminate
      >
        <ExperienceSuccess
          name={Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT}
          attributes={{ noNotificationsScreen: false }}
        />
        <MainAction
          ref={ref}
          href={notification.content.entity?.link?.url}
          onClick={() => handleClick(LinkType.MAIN_ACTION)}
          target="_top"
          data-testid="notification-item-main-action"
          aria-label={
            getMainActionLabel() +
            ' ' +
            intl.formatRelative(notification.timestamp)
          }
        />
        <NotificationContainer>
          <EnableMouseEventsProfileWrapper>
            <ErrorBoundary
              fallbackUI={<AvatarSkeleton />}
              subjectId="avatarContainer"
            >
              <AvatarContainer actors={notification.content.actors} />
            </ErrorBoundary>
          </EnableMouseEventsProfileWrapper>
          <SummaryContainer>
            <SummaryText id={notification.id + '_summary'}>
              {notification.content.message}
              <Timestamp>
                <FormattedRelative value={notification.timestamp} />
              </Timestamp>
            </SummaryText>
            <EntityText
              href={notification.content.entity?.link?.url}
              onClick={() => handleClick(LinkType.ENTITY)}
              target="_top"
              data-testid="notification-item-entity-link"
            >
              <EntityIcon
                src={
                  notification?.content?.entity?.icon &&
                  notification.content.entity.icon.url
                }
                aria-hidden={true}
              />
              {notification?.content?.entity &&
                notification.content.entity.title}
            </EntityText>
            <PathWrapper
              href={
                notification.content?.path[1]?.link?.url ??
                notification.content.entity?.link?.url
              }
              onClick={() => handleClick(LinkType.PATH)}
              target="_top"
              data-testid="notification-item-path-link"
            >
              <PathText>{pathText}</PathText>
            </PathWrapper>
          </SummaryContainer>
          <ReadStateIndicator
            read={notification.readState === RenderableReadState.READ}
            onToggle={handleToggleReadState}
            testId="read-state-indicator"
          />
        </NotificationContainer>
        {bodyItemCount > 0 && (
          <DocumentWrapper>
            <DocumentLeftSpacing />
            <EnableMouseEventsDocumentWrapper>
              <ErrorBoundarySuspense
                loadingFallback={
                  <DocumentSkeleton showQuoteSkeleton={showQuoteSkeleton} />
                }
                errorFallback={<DocumentError />}
                onErrorCallback={handleDocumentChunkFail}
                subjectId="document-chunk"
              >
                <DocumentContainer
                  onToggleExpand={toggleExpanded}
                  loadingState={
                    forceContentLoading
                      ? LoadingState.LOADING
                      : notification.loadingState
                  }
                  notificationContext={notification}
                  notificationPosition={listIndex}
                  isExpanded={isExpanded}
                />
              </ErrorBoundarySuspense>
            </EnableMouseEventsDocumentWrapper>
          </DocumentWrapper>
        )}
      </ItemContainer>
    </React.Fragment>
  );
}

/**
 * Description: Enables keyboard navigation and shortcuts within notifications
 * Owner: Recent Work (Josh Maloney)
 * Experiment ticket: https://product-fabric.atlassian.net/browse/ACT-2282
 */
function NotificationItemWithKeyboard({
  notification,
  forceContentLoading,
  listIndex,
  intl,
}: NotificationItemProps & InjectedIntlProps) {
  const {
    state: { markBulkNotifications },
  } = useContext(NotificationsStoreContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const fireTriggerKeyboardShortcutUsed = useCreateFireAnalyticsFromTrigger(
    triggerKeyboardShortcutUsed,
  );

  const fireNotificationLinkClicked = useCreateFireAnalyticsFromTrigger(
    triggerNotificationLinkClicked,
  );
  const fireMarkOneReadClicked = useCreateFireAnalyticsFromTrigger(
    triggerMarkOneReadButtonClicked,
  );
  const fireTriggerDocumentExpanded = useCreateFireAnalyticsFromTrigger(
    triggerDocumentExpanded,
  );
  const fireTriggerDocumentCollapsed = useCreateFireAnalyticsFromTrigger(
    triggerDocumentCollapsed,
  );
  const experienceTracker = useContext(ExperienceTrackerContext);

  const ref = useRef<HTMLAnchorElement>(null);
  const {
    focused,
    handleKeydown,
    handleOnFocus,
    handleOnBlur,
  } = useFocusManager(ref, listIndex);

  useFocus(ref, focused);

  const handleDocumentChunkFail = () => {
    experienceTracker.abort({
      name: Experiences.RENDER_NOTIFICATIONS_WITH_CONTENT,
      reason: AbortReason.CLIENT_ERROR,
    });
  };

  const pathText = buildPathText(
    notification.content.path,
    notification.content.entity,
  );

  const handleToggleReadState = () => {
    const toState =
      notification.readState === RenderableReadState.READ
        ? MarkRequestReadState.UNREAD
        : MarkRequestReadState.READ;
    fireMarkOneReadClicked(toState, notification, listIndex);
    markBulkNotifications([notification], toState);
  };

  const toggleExpanded = () => {
    const newIsExpanded = !isExpanded;
    setIsExpanded(newIsExpanded);
    if (newIsExpanded) {
      fireTriggerDocumentExpanded(notification, listIndex);
    } else {
      fireTriggerDocumentCollapsed(notification, listIndex);
    }
  };

  const handleClick = (linkType: LinkType) => {
    if (notification.readState === RenderableReadState.UNREAD) {
      markBulkNotifications([notification], MarkRequestReadState.READ);
    }
    if (notification.content.entity?.link) {
      fireNotificationLinkClicked(notification, listIndex, linkType);
    }
  };

  const getMainActionLabel = () => {
    if (
      !notification.content.actions ||
      notification.content.actions.length === 0
    ) {
      return notification.content.message;
    }

    return notification.content.actions[0].title;
  };

  const expectedBodyItemCount = notification.bodyItemCount;
  const actualBodyItemCount = notification.content?.body?.items.length ?? 0;
  const bodyItemCount =
    notification.loadingState === LoadingState.COMPLETE
      ? actualBodyItemCount
      : expectedBodyItemCount;

  const showQuoteSkeleton = notification.bodyItemCount === 2;

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'r': {
        fireTriggerKeyboardShortcutUsed(
          'markNotificationRead',
          notification,
          listIndex,
        );
        handleToggleReadState();
        return;
      }
      case 'e': {
        fireTriggerKeyboardShortcutUsed(
          'expandNotification',
          notification,
          listIndex,
        );
        toggleExpanded();
        return;
      }
      default: {
        const shortCutActionType = keyboardEventToAction(event);
        if (shortCutActionType) {
          event.preventDefault(); // stop scroll on keydown events
          fireTriggerKeyboardShortcutUsed(
            KeyboardActionToAnalyticSubject(shortCutActionType),
            notification,
            listIndex,
          );
        }
        handleKeydown(event);
      }
    }
  };

  return (
    <React.Fragment>
      <ViewedTracker notification={notification} listIndex={listIndex} />
      <ItemContainer
        data-testid="notification-item-container"
        aria-describedby={notification.id + '_summary'}
        aria-posinset={listIndex}
        aria-setsize={-1} // -1 As the total list size in indeterminate
      >
        <ExperienceSuccess
          name={Experiences.RENDER_NOTIFICATIONS_WITHOUT_CONTENT}
          attributes={{ noNotificationsScreen: false }}
        />
        <MainAction
          ref={ref}
          onKeyDown={onKeyDownHandler}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          href={notification.content.entity?.link?.url}
          onClick={() => handleClick(LinkType.MAIN_ACTION)}
          target="_top"
          data-testid="notification-item-main-action"
          aria-label={
            getMainActionLabel() +
            ' ' +
            intl.formatRelative(notification.timestamp)
          }
        />
        <NotificationContainer>
          <EnableMouseEventsProfileWrapper>
            <ErrorBoundary
              fallbackUI={<AvatarSkeleton />}
              subjectId="avatarContainer"
            >
              <AvatarContainer actors={notification.content.actors} />
            </ErrorBoundary>
          </EnableMouseEventsProfileWrapper>
          <SummaryContainer>
            <SummaryText id={notification.id + '_summary'}>
              {notification.content.message}
              <Timestamp>
                <FormattedRelative value={notification.timestamp} />
              </Timestamp>
            </SummaryText>
            <EntityText
              href={notification.content.entity?.link?.url}
              onClick={() => handleClick(LinkType.ENTITY)}
              target="_top"
              data-testid="notification-item-entity-link"
            >
              <EntityIcon
                src={
                  notification?.content?.entity?.icon &&
                  notification.content.entity.icon.url
                }
                aria-hidden={true}
              />
              {notification?.content?.entity &&
                notification.content.entity.title}
            </EntityText>
            <PathWrapper
              href={
                notification.content?.path[1]?.link?.url ??
                notification.content.entity?.link?.url
              }
              onClick={() => handleClick(LinkType.PATH)}
              target="_top"
              data-testid="notification-item-path-link"
            >
              <PathText>{pathText}</PathText>
            </PathWrapper>
          </SummaryContainer>
          <ReadStateIndicator
            read={notification.readState === RenderableReadState.READ}
            onToggle={handleToggleReadState}
            testId="read-state-indicator"
          />
        </NotificationContainer>
        {bodyItemCount > 0 && (
          <DocumentWrapper>
            <DocumentLeftSpacing />
            <EnableMouseEventsDocumentWrapper>
              <ErrorBoundarySuspense
                loadingFallback={
                  <DocumentSkeleton showQuoteSkeleton={showQuoteSkeleton} />
                }
                errorFallback={<DocumentError />}
                onErrorCallback={handleDocumentChunkFail}
                subjectId="document-chunk"
              >
                <DocumentContainer
                  onToggleExpand={toggleExpanded}
                  loadingState={
                    forceContentLoading
                      ? LoadingState.LOADING
                      : notification.loadingState
                  }
                  notificationContext={notification}
                  notificationPosition={listIndex}
                  isExpanded={isExpanded}
                />
              </ErrorBoundarySuspense>
            </EnableMouseEventsDocumentWrapper>
          </DocumentWrapper>
        )}
      </ItemContainer>
    </React.Fragment>
  );
}

export const NotificationItemWithKeyboardNavigation = injectIntl(
  NotificationItemWithKeyboard,
);

export default injectIntl(NotificationItem);
