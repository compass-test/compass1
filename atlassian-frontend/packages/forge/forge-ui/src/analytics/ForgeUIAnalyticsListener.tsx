import React from 'react';
import {
  UIAnalyticsEvent,
  AnalyticsListener,
  UIAnalyticsEventHandler,
} from '@atlaskit/analytics-next';
import {
  GasPureScreenEventPayload,
  GasPurePayload,
  UI_EVENT_TYPE,
  OPERATIONAL_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';

import { ForgeUIAnalyticsContext, GasV3Payload } from './types';

export const FORGE_UI_ANALYTICS_CHANNEL = 'forge-ui';

export interface AnalyticsWebClient {
  sendUIEvent: (event: GasPurePayload) => void;
  sendOperationalEvent: (event: GasPurePayload) => void;
  sendTrackEvent: (event: GasPurePayload) => void;
  sendScreenEvent: (event: GasPureScreenEventPayload) => void;
}

export const sendEvent = (
  client: AnalyticsWebClient | Promise<AnalyticsWebClient>,
) => (event: GasV3Payload) => {
  switch (event.eventType) {
    case UI_EVENT_TYPE:
      Promise.resolve(client).then((c) => c.sendUIEvent(event));
      break;

    case OPERATIONAL_EVENT_TYPE:
      Promise.resolve(client).then((c) => c.sendOperationalEvent(event));
      break;

    case TRACK_EVENT_TYPE:
      Promise.resolve(client).then((c) => c.sendTrackEvent(event));
      break;

    case SCREEN_EVENT_TYPE:
      Promise.resolve(client).then((c) => c.sendScreenEvent(event));
      break;
  }
};

interface ForgeUIAnalyticsListenerProps {
  children: React.ReactNode;
  client: AnalyticsWebClient | Promise<AnalyticsWebClient>;
  /** @deprecated use commonAttributes instead */
  actionSubjectId?: string;
  commonAttributes?: Record<string, string>;
}

/** extract the attributes from event context which should be in the top-level payload */
function getPayloadAttributesFromContext(
  contexts: UIAnalyticsEvent['context'],
): ForgeUIAnalyticsContext {
  const context =
    contexts.find((obj) => obj && obj.forgeUIAnalyticsContext) || {};
  const forgeUIAnalyticsContext = context.forgeUIAnalyticsContext as ForgeUIAnalyticsContext;
  return {
    source: 'unknown',
    ...forgeUIAnalyticsContext,
  };
}

const ForgeUIAnalyticsListener = ({
  children,
  client,
  commonAttributes = {},
}: ForgeUIAnalyticsListenerProps) => {
  const listenerHandler: UIAnalyticsEventHandler = (event) => {
    const { eventType, data } = event.payload;
    const { action, actionSubject, actionSubjectId, attributes } = data;

    const forgeUIAnalyticsContext = getPayloadAttributesFromContext(
      event.context,
    );

    const payload = {
      action,
      actionSubject,
      actionSubjectId,
      ...forgeUIAnalyticsContext,
      attributes: {
        ...commonAttributes,
        ...event.context.reduce((prev, curr) => {
          // Only extract attributes passed as an object via the forgeUIAttributes key
          const forgeUIAttributes =
            curr &&
            curr.forgeUIAttributes &&
            typeof curr.forgeUIAttributes === 'object'
              ? curr.forgeUIAttributes
              : {};
          return {
            ...prev,
            ...forgeUIAttributes,
          };
        }, {}),
        ...attributes,
      },
    };

    sendEvent(client)({ eventType: eventType, ...payload });
  };

  return (
    <AnalyticsListener
      onEvent={listenerHandler}
      channel={FORGE_UI_ANALYTICS_CHANNEL}
    >
      {children}
    </AnalyticsListener>
  );
};

export default ForgeUIAnalyticsListener;
