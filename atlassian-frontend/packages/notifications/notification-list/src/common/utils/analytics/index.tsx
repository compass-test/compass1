import { useContext, useMemo } from 'react';

import {
  CreateUIAnalyticsEvent,
  useAnalyticsEvents,
} from '@atlaskit/analytics-next';

import { AnalyticsContext, MarkRequestReadState } from '../../../common/types';
import { NotificationsStoreContext } from '../../../common/ui/notifications-context';
import { Notification } from '../../types';
import { AbortReason } from '../experience-tracking/types';

import { LinkType, SloFailureReason } from './types';
import {
  getCrossAttributes,
  getDefaultAttributes,
  getNotificationAttributes,
  getNotificationContainer,
  getRenderBucket,
  triggerOperationalEvent,
  triggerScreenEvent,
  triggerTrackEvent,
  triggerUIEvent,
} from './utils';

/**
 * SCREEN events
 */

export const triggerNotificationFilterViewed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (firstRender: boolean, firstFilterView: boolean) => {
  triggerScreenEvent(
    createAnalyticsEvent,
    {
      name: 'notificationList',
      attributes: {
        firstFilterView: firstFilterView.toString(),
        firstRender: firstRender.toString(),
        ...getDefaultAttributes(analyticsContext),
      },
    },
    analyticsContext,
  );
};

export const triggerShortcutsDialogViewed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => () => {
  triggerScreenEvent(
    createAnalyticsEvent,
    {
      name: 'notificationsKeyboardShortcutsDialog',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
      },
    },
    analyticsContext,
  );
};

/**
 * UI events
 */

export const triggerNotificationLinkClicked = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (notification: Notification, listIndex: number, linkType: LinkType) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'clicked',
      actionSubject: 'link',
      actionSubjectId: linkType,
      attributes: {
        ...getCrossAttributes(notification, analyticsContext),
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

export const triggerDocumentExpanded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (notification: Notification, listIndex: number) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'expanded',
      actionSubject: 'notification',
      actionSubjectId: 'document',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
        feature: 'expand',
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

export const triggerDocumentCollapsed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (notification: Notification, listIndex: number) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'collapsed',
      actionSubject: 'notification',
      actionSubjectId: 'document',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
        feature: 'expand',
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

export const triggerViewedAllNotificationsUIEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (viewedCount: number) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'viewed',
      actionSubject: 'message',
      actionSubjectId: 'allNotificationsViewed',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        viewedCount,
      },
    },
    analyticsContext,
  );
};

export const triggerChangeboardLearnMoreClicked = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (linkType: LinkType) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'clicked',
      actionSubject: 'link',
      actionSubjectId: linkType,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
      },
    },
    analyticsContext,
  );
};

/**
 * Track events
 */

export const triggerNotificationViewedTrackEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (notification: Notification, listIndex: number) => {
  triggerTrackEvent(
    createAnalyticsEvent,
    {
      action: 'viewed',
      actionSubject: 'notification',
      actionSubjectId: notification.id,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

export const triggerMarkAllReadButtonClicked = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => () => {
  triggerTrackEvent(
    createAnalyticsEvent,
    {
      action: 'marked',
      actionSubject: 'notification',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        toState: MarkRequestReadState.READ.toLocaleLowerCase(),
        markType: 'all',
      },
    },
    analyticsContext,
  );
};

export const triggerMarkOneReadButtonClicked = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  toReadState: MarkRequestReadState,
  notification: Notification,
  listIndex: number,
) => {
  triggerTrackEvent(
    createAnalyticsEvent,
    {
      action: 'marked',
      actionSubject: 'notification',
      actionSubjectId: notification.id,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
        toState: toReadState.toLocaleLowerCase(),
        markType: 'single',
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

export const triggerKeyboardShortcutUsed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (shortcut: string, notification: Notification, listIndex: number) => {
  triggerUIEvent(
    createAnalyticsEvent,
    {
      action: 'pressed',
      actionSubject: 'keyboardShortcut',
      actionSubjectId: `${shortcut}KeyboardShortcut`,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        ...getNotificationAttributes(notification, listIndex),
      },
      ...getNotificationContainer(notification),
    },
    analyticsContext,
  );
};

/**
 * Trigger operational events
 */

export const triggerChangeboardingBannerStartFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (errorName: string) => {
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'failedToStart',
      actionSubject: 'changeBoardingBanner',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        errorName,
      },
    },
    analyticsContext,
  );
};

export const triggerChangeboardingBannerStopFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (errorName: string) => {
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'failedToStop',
      actionSubject: 'changeBoardingBanner',
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        errorName,
      },
    },
    analyticsContext,
  );
};

export const triggerErrorBoundaryRenderedEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  errorBoundaryType: string,
  isCritical = false,
  notificationContext?: Notification,
  listIndex?: number,
) => {
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'rendered',
      actionSubject: 'errorBoundary',
      actionSubjectId: errorBoundaryType,
      attributes: {
        errorBoundaryType,
        isCritical,
        ...getDefaultAttributes(analyticsContext),
        ...(notificationContext &&
          listIndex !== undefined &&
          getNotificationAttributes(notificationContext, listIndex)),
      },
      ...(notificationContext &&
        listIndex !== undefined &&
        getNotificationContainer(notificationContext)),
    },
    analyticsContext,
  );
};

export const triggerFailedToRetrieveNotificationsEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (notificationsRendered: number) => {
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'rendered',
      actionSubject: 'errorBoundary',
      actionSubjectId: 'notificationRetrieval',
      attributes: {
        errorBoundaryType: 'notificationRetrieval',
        notificationsRendered,
        ...getDefaultAttributes(analyticsContext),
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsAPICallSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (route: string) => {
  const actionSubject = 'notificationsAPI';
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'succeeded',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        route,
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsAPICallFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (route: string, statusCode: number) => {
  const actionSubject = 'notificationsAPI';
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'failed',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        route,
        statusCode,
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsLoaded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  limit: number,
) => {
  const actionSubject = withContent
    ? 'notificationsWithContent'
    : 'notificationsWithoutContent';
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'fetched',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        firstLoad,
        duration,
        bucket: getRenderBucket(
          duration,
          withContent ? withContentBuckets : withoutContentBuckets,
        ),
        limit,
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsFailedToLoad = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  firstLoad: boolean,
  withContent: boolean,
  limit: number,
  statusCode: number,
) => {
  const actionSubject = withContent
    ? 'notificationsWithContent'
    : 'notificationsWithoutContent';
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'failedFetch',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        firstLoad,
        limit,
        statusCode,
      },
    },
    analyticsContext,
  );
};

export const triggerI18nFailedToLoad = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (locale: string) => {
  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'fetchFailed',
      actionSubject: 'i18nMessages',
      attributes: {
        locale,
      },
    },
    analyticsContext,
  );
};

const withoutContentBuckets = [
  '8000',
  '6000',
  '4000',
  '3000',
  '2500',
  '2000',
  '1000',
  '500',
];
const withContentBuckets = [
  '15000',
  '10000',
  '8000',
  '6000',
  '4000',
  '2000',
  '1000',
];
export const triggerNotificationsRenderSucceeded = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  noNotificationsScreen: boolean,
) => {
  const actionSubject = withContent
    ? 'notificationsWithContent'
    : 'notificationsWithoutContent';
  const buckets = withContent ? withContentBuckets : withoutContentBuckets;

  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'renderSucceeded',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        firstLoad,
        duration,
        bucket: getRenderBucket(duration, buckets),
        noNotificationsScreen,
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsRenderFailed = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  failureReason: SloFailureReason,
  extraAttributes: { [key: string]: any },
) => {
  const actionSubject = withContent
    ? 'notificationsWithContent'
    : 'notificationsWithoutContent';
  const buckets = withContent ? withContentBuckets : withoutContentBuckets;

  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'renderFailed',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        firstLoad,
        duration,
        bucket: getRenderBucket(duration, buckets),
        failureReason,
        ...extraAttributes,
      },
    },
    analyticsContext,
  );
};

export const triggerNotificationsRenderAborted = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  analyticsContext: AnalyticsContext,
) => (
  firstLoad: boolean,
  withContent: boolean,
  duration: number,
  abortReason: AbortReason,
  extraAttributes: { [key: string]: any },
) => {
  const actionSubject = withContent
    ? 'notificationsWithContent'
    : 'notificationsWithoutContent';
  const buckets = withContent ? withContentBuckets : withoutContentBuckets;

  triggerOperationalEvent(
    createAnalyticsEvent,
    {
      action: 'renderAborted',
      actionSubject,
      attributes: {
        ...getDefaultAttributes(analyticsContext),
        firstLoad,
        duration,
        bucket: getRenderBucket(duration, buckets),
        abortReason,
        ...extraAttributes,
      },
    },
    analyticsContext,
  );
};

/**
 * Misc.
 */

export const useCreateFireAnalyticsFromTrigger = <T,>(
  createTrigger: (
    createUIAnalyticEvent: CreateUIAnalyticsEvent,
    analyticsContext: AnalyticsContext,
  ) => T,
) => {
  const { analyticsContext } = useContext(NotificationsStoreContext);
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const currentAnalyticsContext = analyticsContext.current;
  const fire = useMemo(
    () => createTrigger(createAnalyticsEvent, currentAnalyticsContext),
    [currentAnalyticsContext, createAnalyticsEvent, createTrigger],
  );
  return fire;
};
