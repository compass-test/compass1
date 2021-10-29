import React, { ComponentProps, ReactNode, useCallback } from 'react';

import { AnalyticsListener } from '@atlaskit/analytics-next';

import { MPT_ANALYTICS_CHANNEL } from '../../common/constants';
import type {
  AnySourceScreen,
  ScreenEvent,
  TrackEvent,
  UIEvent,
} from '../../common/types';

import { getSourceScreenFromContext, isMigrationPayload } from './utils';

type OnEvent = ComponentProps<typeof AnalyticsListener>['onEvent'];

export type Props<S extends AnySourceScreen> = {
  createScreenEvent: (event: ScreenEvent<S>) => Promise<void>;
  createTrackEvent: (event: TrackEvent<S>) => Promise<void>;
  createUIEvent: (event: UIEvent<S>) => Promise<void>;
  children: ReactNode; // `children` is required so we don't use the `FC` or other types
  fallbackSourceScreen: S;
};

const MigrationAnalyticsListener = <
  S extends AnySourceScreen = AnySourceScreen
>({
  children,
  createScreenEvent,
  createTrackEvent,
  createUIEvent,
  fallbackSourceScreen,
}: Props<S>) => {
  const onEvent = useCallback<OnEvent>(
    ({ context, payload }) => {
      // Only react if the payload is a migration payload
      if (isMigrationPayload(payload)) {
        // Find the source screen from contexts
        payload.eventType;
        const source = getSourceScreenFromContext(
          context,
          fallbackSourceScreen,
        );

        // Generate the timestamp
        const timestamp = Date.now();

        // Proxy the event back to the handler
        switch (payload.eventType) {
          case 'SCREEN':
            createScreenEvent({ ...payload, timestamp, name: source });
            break;
          case 'TRACK':
            createTrackEvent({ ...payload, timestamp, source });
            break;
          case 'UI':
            // Patch the UI event payload attributes
            if (payload.attributes) {
              const { planId, ...restAttributes } = payload.attributes;

              // Map planId to container and mutate the payload
              if (planId && typeof planId === 'string') {
                payload.attributes = restAttributes;
                payload.container = {
                  containerType: 'plan',
                  containerId: planId,
                };
              }
            }
            createUIEvent({ ...payload, timestamp, source });
            break;
        }
      }
    },
    [createScreenEvent, createTrackEvent, createUIEvent, fallbackSourceScreen],
  );

  return (
    <AnalyticsListener channel={MPT_ANALYTICS_CHANNEL} onEvent={onEvent}>
      {children}
    </AnalyticsListener>
  );
};

export default MigrationAnalyticsListener;
