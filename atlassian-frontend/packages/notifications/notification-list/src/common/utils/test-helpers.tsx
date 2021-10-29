import React, { useRef } from 'react';

import type { default as CoordinationClient } from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';
import { IntlProvider } from 'react-intl';

import {
  AnalyticsEventPayload,
  AnalyticsListener,
} from '@atlaskit/analytics-next';
import {
  ExperienceTracker,
  ExperienceTrackerContext,
} from '@atlassian/experience-tracker';

import { NOTIFICATION_CHANNEL } from './analytics/utils';
import { EngageKitContextProvider } from './changeboard-context';

interface MockProviderProps {
  shouldTrackAnalyticsPayload: (args: AnalyticsEventPayload) => boolean;
  coordinationClient?: CoordinationClient | Promise<CoordinationClient> | null;
  changeBoardMessageId?: string | null;
  locale?: string;
}

export const createMockProviders = (
  args: MockProviderProps = {
    shouldTrackAnalyticsPayload: () => true,
    coordinationClient: null,
    changeBoardMessageId: null,
    locale: 'en',
  },
) => {
  const onAnalyticEventFired = jest.fn();
  const MockProviders: React.FC = ({ children }) => {
    const experienceTracker = useRef(new ExperienceTracker());
    return (
      <IntlProvider locale={args.locale ?? 'en'}>
        <AnalyticsListener
          onEvent={({ payload }) => {
            if (args.shouldTrackAnalyticsPayload(payload)) {
              onAnalyticEventFired(payload);
            }
          }}
          channel={NOTIFICATION_CHANNEL}
        >
          <ExperienceTrackerContext.Provider value={experienceTracker.current}>
            <EngageKitContextProvider
              coordinationClient={args.coordinationClient ?? null}
              changeBoardMessageId={args.changeBoardMessageId ?? null}
            >
              {children}
            </EngageKitContextProvider>
          </ExperienceTrackerContext.Provider>
        </AnalyticsListener>
      </IntlProvider>
    );
  };
  return { MockProviders, onAnalyticEventFired };
};
