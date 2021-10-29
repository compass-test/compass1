import React, { useCallback } from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  extractAWCDataFromEvent,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
  ANALYTICS_BRIDGE_CHANNEL,
} from '@atlassian/analytics-bridge';
import { initialiseErrorAnalyticsClient } from '@atlassian/error-handling';

import { CustomAnalyticsEvent, ProductInfo } from './types';
import { Tenant, User } from '../../types';

export type Props = {
  children: ({
    analyticsClient,
  }: {
    analyticsClient: typeof AnalyticsWebClient;
  }) => JSX.Element;
  productInfo: ProductInfo;
  tenant?: Tenant;
  user?: User;
};

let analyticsWebClient: typeof AnalyticsWebClient | null = null;

const getAnalyticsWebClient = (
  productInfo: ProductInfo,
  tenant?: Tenant,
  user?: User,
) => {
  if (analyticsWebClient === null) {
    analyticsWebClient = new AnalyticsWebClient(productInfo);
    if (tenant) {
      analyticsWebClient.setTenantInfo(tenant.type, tenant.id);
    }
    if (user) {
      analyticsWebClient.setUserInfo(user.type, user.id);
    }
  }
  return analyticsWebClient;
};

export const AnalyticsProvider: React.FC<Props> = (props) => {
  const { children, productInfo, tenant, user } = props;

  const analyticsClient = getAnalyticsWebClient(productInfo, tenant, user);

  initialiseErrorAnalyticsClient(analyticsClient);

  const sendEvent = useCallback(
    (event: CustomAnalyticsEvent) => {
      const { type, payload } = event;
      switch (type) {
        case UI_EVENT_TYPE:
          analyticsClient.sendUIEvent(payload);
          break;
        case TRACK_EVENT_TYPE:
          analyticsClient.sendTrackEvent(payload);
          break;
        case OPERATIONAL_EVENT_TYPE:
          analyticsClient.sendOperationalEvent(payload);
          break;
        case SCREEN_EVENT_TYPE:
          analyticsClient.sendScreenEvent(
            payload.name,
            null,
            payload.attributes,
          );
          break;
        default:
          break;
      }
    },
    [analyticsClient],
  );

  return (
    <AnalyticsListener
      channel={ANALYTICS_BRIDGE_CHANNEL}
      onEvent={(event) => sendEvent(extractAWCDataFromEvent(event))}
    >
      {children({ analyticsClient })}
    </AnalyticsListener>
  );
};
