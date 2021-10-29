import React, { useCallback, useEffect, useMemo } from 'react';

import AnalyticsWebClient, {
  tenantType,
  userType,
} from '@atlassiansox/analytics-web-client';

import { AnalyticsListener } from '@atlaskit/analytics-next';
import UIAnalyticsEvent from '@atlaskit/analytics-next/UIAnalyticsEvent';
import {
  extractAWCDataFromEvent,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlassian/analytics-bridge';
import { Environment } from '@atlassian/dragonfruit-tenant-context';
import { isInDevMode } from '@atlassian/dragonfruit-utils';
import {
  initialiseErrorAnalyticsClient,
  installGlobalHandler,
} from '@atlassian/error-handling';

import { CustomAnalyticsEvent } from './types';

declare const COMPASS_BUILD_KEY: string;
declare const COMPASS_BUILD_COMMIT_HASH: string;

const SENTRY_URL =
  'https://f60910ec97ef4ed0ad08bda8b1198395@sentry.prod.atl-paas.net/1185';

export type Props = {
  channel: string;
  environment?: Environment;
  analyticsClient: typeof AnalyticsWebClient | undefined;
};

export const AnalyticsProvider: React.FC<Props> = (props) => {
  const {
    children,
    channel,
    analyticsClient,
    // Default environment to production
    environment = Environment.PROD,
  } = props;

  useEffect(() => {
    // initialise Sentry browser for sending error details
    installGlobalHandler(
      SENTRY_URL,
      {
        // Check if application is running in development mode.
        // To make analytics less noisy all dev builds should be treated as local environment.
        environment: isInDevMode ? Environment.LOCAL : environment,

        // The release version of the application.
        // Also used when uploading respective source maps to allow Sentry to
        // resolve the correct source maps when processing events.
        release: COMPASS_BUILD_COMMIT_HASH,

        // Additional data to be tagged onto the error.
        tags: {
          build_key: COMPASS_BUILD_KEY,
          git_commit: COMPASS_BUILD_COMMIT_HASH,
        },
      },
      () => {
        return {};
      },
    );

    initialiseErrorAnalyticsClient(analyticsClient);
  }, [analyticsClient, environment]);

  const sendEvent = useCallback(
    (event: CustomAnalyticsEvent) => {
      // Try and send the event again in 100ms if the client hasn't been initialised
      if (!analyticsClient) {
        setTimeout(() => sendEvent(event), 100);
        return;
      }

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

  const handleEvent = useCallback(
    (event: UIAnalyticsEvent) => sendEvent(extractAWCDataFromEvent(event)),
    [sendEvent],
  );

  return (
    <AnalyticsListener channel={channel} onEvent={handleEvent}>
      {children}
    </AnalyticsListener>
  );
};

export const useGetAnalyticsClient = (
  environment: string | undefined,
  cloudId: string | undefined,
  accountId: string | undefined,
): typeof AnalyticsWebClient | undefined => {
  return useMemo(() => {
    // Required data not present
    if (!environment || !cloudId || !accountId) {
      return undefined;
    }

    const productInfo = {
      env: environment,
      product: 'compass',
    };

    const settings = {};

    const client = new AnalyticsWebClient(productInfo, settings);
    client.setTenantInfo(tenantType.CLOUD_ID, cloudId);
    client.setUserInfo(userType.ATLASSIAN_ACCOUNT, accountId);
    // This event is for MAU checks. It is throttled and will only send an event once an hour.
    client.startUIViewedEvent();

    return client;
  }, [environment, cloudId, accountId]);
};
