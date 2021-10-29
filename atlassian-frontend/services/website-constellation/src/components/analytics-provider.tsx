import React, { useRef, useCallback } from 'react';
import { AnalyticsListener, UIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  extractAWCDataFromEvent,
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
  ContextualAnalyticsData,
  ANALYTICS_BRIDGE_CHANNEL,
} from '@atlassian/analytics-bridge';

import { createAnalyticsClient } from '../utils/analytics';
import { version } from '../../package.json';

function getEnv() {
  // We require this so it is lazily instantiated (doesn't run on SSR!)
  const { envType } = require('@atlassiansox/analytics-web-client');
  const defaultEnvironment = envType.LOCAL;
  return (
    envType[process.env.GATSBY_CONSTELLATION_ENVIRONMENT] || defaultEnvironment
  );
}

function getLang() {
  if (typeof navigator === 'undefined') {
    return;
  }

  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  } else {
    return navigator.language;
  }
}

function getUrlData() {
  if (typeof location === 'undefined') {
    return undefined;
  }

  return {
    url: location.href,
  };
}

export function injectUrlToAttributes(payload) {
  return {
    ...payload,
    attributes: {
      ...payload.attributes,
      ...getUrlData(),
    },
  };
}

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = useRef(null);

  const onAnalyticEventFired = useCallback((event: UIAnalyticsEvent) => {
    if (!client.current) {
      client.current = createAnalyticsClient({
        version,
        product: 'designSystemDocs',
        env: getEnv(),
        locale: getLang(),
        useLegacyUrl: true,
      });
      client.current.startUIViewedEvent();
    }

    let { type, payload } = extractAWCDataFromEvent(event);
    payload = injectUrlToAttributes(payload);

    switch (type) {
      case UI_EVENT_TYPE:
        client.current.sendUIEvent(payload);
        break;
      case TRACK_EVENT_TYPE:
        client.current.sendTrackEvent(payload);
        break;
      case OPERATIONAL_EVENT_TYPE:
        client.current.sendOperationalEvent(payload);
        break;
      case SCREEN_EVENT_TYPE:
        client.current.sendScreenEvent(payload.name, null, payload.attributes);
        break;
      default:
        break;
    }
  }, []);

  return (
    <AnalyticsListener
      channel={ANALYTICS_BRIDGE_CHANNEL}
      onEvent={onAnalyticEventFired}
    >
      <ContextualAnalyticsData>{children}</ContextualAnalyticsData>
    </AnalyticsListener>
  );
}
