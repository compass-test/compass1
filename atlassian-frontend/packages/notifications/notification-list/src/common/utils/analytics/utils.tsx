import {
  GasPayload,
  GasScreenEventPayload,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { FabricChannel } from '@atlaskit/analytics-listeners/types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import { packageName, packageVersion } from '../../constants';
import {
  AnalyticsContext,
  Notification,
  RequestCategory,
  RequestReadState,
} from '../../types';

import { CrossType } from './types';

export const NOTIFICATION_CHANNEL = FabricChannel.notifications;

export const NOTIFICATION_SOURCE = 'notificationList';

export const NOTIFICATION_COMPONENT = 'notificationList';

export type NotificationGasEventPayload = Partial<GasPayload> & {
  attributes: NotificationCommonAttributes & NotificationFilterAttributes;
};

export type NotificationGasOperationalEventPayload = Partial<GasPayload> & {
  attributes: NotificationCommonAttributes &
    Partial<NotificationFilterAttributes>;
};

export type NotificationCommonAttributes = {
  userHourOfDay?: number;
  notificationAgeInSeconds?: number;
  listIndex?: number;
  notificationCategory?: string;
  notificationReadState?: string;
};

export type NotificationFilterAttributes = {
  categoryFilter: RequestCategory;
  readStateFilter: RequestReadState;
};

/**
 * @returns Analytic attributes that are inserted into all event attributes
 */
export const getAnalyticsContext = () => ({
  source: NOTIFICATION_SOURCE,
  component: NOTIFICATION_COMPONENT,
  packageName,
  packageVersion,
});

export const triggerScreenEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  payload: Omit<GasScreenEventPayload, 'eventType'>,
  analyticsContext: AnalyticsContext,
) => {
  const analyticsEvent = createAnalyticsEvent({
    ...payload,
    eventType: SCREEN_EVENT_TYPE,
    attributes: {
      ...payload.attributes,
    },
    name: payload.name,
    ...getTenantFields(analyticsContext),
  });
  analyticsEvent.clone();
  analyticsEvent.fire(NOTIFICATION_CHANNEL);
};

export const triggerUIEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  payload: NotificationGasEventPayload,
  analyticsContext: AnalyticsContext,
) => {
  const analyticsEvent = createAnalyticsEvent({
    ...payload,
    eventType: UI_EVENT_TYPE,
    attributes: {
      ...payload.attributes,
    },
    ...getTenantFields(analyticsContext),
  });
  analyticsEvent.clone();
  analyticsEvent.fire(NOTIFICATION_CHANNEL);
};

export const triggerOperationalEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  payload: NotificationGasOperationalEventPayload,
  analyticsContext: AnalyticsContext,
) => {
  createAnalyticsEvent({
    ...payload,
    eventType: OPERATIONAL_EVENT_TYPE,
    attributes: {
      ...payload.attributes,
    },
    ...getTenantFields(analyticsContext),
  }).fire(NOTIFICATION_CHANNEL);
};

export const triggerTrackEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  payload: NotificationGasEventPayload,
  analyticsContext: AnalyticsContext,
) => {
  const analyticsEvent = createAnalyticsEvent({
    ...payload,
    eventType: TRACK_EVENT_TYPE,
    attributes: {
      ...payload.attributes,
    },
    ...getTenantFields(analyticsContext),
  });
  analyticsEvent.clone();
  analyticsEvent.fire(NOTIFICATION_CHANNEL);
};

const getUserHourOfDay = () => new Date().getHours();

const getTenantFields = (analyticsContext: AnalyticsContext) => {
  if (analyticsContext.cloudId) {
    return { tenantIdType: 'cloudId', tenantId: analyticsContext.cloudId };
  } else {
    return { tenantIdType: 'none' };
  }
};

const isCrossSite = (
  notification: Notification,
  analyticsContext: AnalyticsContext,
) => {
  if (
    analyticsContext.cloudId === undefined ||
    notification.analyticsAttributes.cloudId === undefined
  ) {
    return CrossType.UNKNOWN;
  } else if (
    notification.analyticsAttributes.cloudId !== undefined &&
    analyticsContext.cloudId.toUpperCase() !==
      notification.analyticsAttributes.cloudId.toUpperCase()
  ) {
    return CrossType.TRUE;
  }
  return CrossType.FALSE;
};

const isCrossProduct = (
  notification: Notification,
  analyticsContext: AnalyticsContext,
) => {
  if (analyticsContext.product === undefined) {
    return CrossType.UNKNOWN;
  } else if (
    analyticsContext.product.toUpperCase() !==
    notification.analyticsAttributes.registrationProduct.toUpperCase()
  ) {
    return CrossType.TRUE;
  }
  return CrossType.FALSE;
};

const INFINITY = '+Inf';

export const getRenderBucket = (
  renderTime: number,
  buckets: string[],
): string | null => {
  return renderTime >= 0
    ? buckets.reduce((lowestBucket, currentBucket) => {
        return renderTime <= parseInt(currentBucket)
          ? currentBucket
          : lowestBucket;
      }, INFINITY)
    : null;
};

export const getDefaultAttributes = (analyticsContext: AnalyticsContext) => ({
  userHourOfDay: getUserHourOfDay(),
  readStateFilter: analyticsContext.readStateFilter,
  categoryFilter: analyticsContext.requestCategory,
  product: analyticsContext.product,
});

export const getNotificationAttributes = (
  notification: Notification,
  listIndex: number,
) => {
  return {
    listIndex,
    notificationAgeInSeconds: Math.floor(
      (Date.now() - new Date(notification.timestamp).getTime()) / 1000,
    ),
    notificationCategory: notification.category || 'watching',
    notificationReadState: notification.readState,
    ...notification.analyticsAttributes,
  };
};

export const getCrossAttributes = (
  notification: Notification,
  analyticsContext: AnalyticsContext,
) => {
  return {
    isCrossSite: isCrossSite(notification, analyticsContext),
    isCrossProduct: isCrossProduct(notification, analyticsContext),
  };
};

export const getNotificationContainer = (notification: Notification) => {
  return {
    containers: {
      notification: {
        id: notification.id,
      },
    },
  };
};
