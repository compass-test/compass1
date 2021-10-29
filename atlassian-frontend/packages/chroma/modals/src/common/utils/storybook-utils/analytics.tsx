/* eslint-disable no-console */
import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import { OriginProduct } from '../../constants';
import { AnalyticsProvider } from '../analytics-provider';
import {
  validateOperationalEvent,
  validateScreenEvent,
  validateTrackEvent,
  validateUIEvent,
} from '../analytics-provider/adminhub';
import {
  AdminHubOperationalEvent,
  AdminHubScreenEvent,
  AdminHubTrackEvent,
  AdminHubUIEvent,
} from '../analytics-provider/adminhub/types';

import { StoryFn } from './types';

// Storybook analytics web client implementation that will
// - log analytics events to the console
// - transform analytics events to storybook actions
export const actionAndConsoleAnalyticsClient = {
  sendUIEvent: (uiEvent: AdminHubUIEvent) => {
    validateUIEvent(uiEvent);
    console.log('UI: ', JSON.stringify(uiEvent, undefined, 4));
    action(uiEvent.data.actionSubjectId)(uiEvent.data);
  },
  sendTrackEvent: (trackEvent: AdminHubTrackEvent) => {
    validateTrackEvent(trackEvent);
    console.log('TRACK: ', JSON.stringify(trackEvent, undefined, 4));
    action(trackEvent.data.actionSubject)(trackEvent.data);
  },
  sendOperationalEvent: (operationalEvent: AdminHubOperationalEvent) => {
    validateOperationalEvent(operationalEvent);
    console.log(
      'OPERATIONAL: ',
      JSON.stringify(operationalEvent, undefined, 4),
    );
    action(operationalEvent.data.actionSubject)(operationalEvent.data);
  },
  sendScreenEvent: (screenEvent: AdminHubScreenEvent) => {
    validateScreenEvent(screenEvent);
    console.log('SCREEN: ', JSON.stringify(screenEvent, undefined, 4));
    setTimeout(() => {
      action(screenEvent.data.name)(screenEvent.data);
    }, 0);
  },
};

export const withAdminHubActionAndConsoleAnalytics = (storyFn: StoryFn) => (
  <AnalyticsProvider
    analyticsPlatformClient={actionAndConsoleAnalyticsClient}
    analyticsOriginProduct={OriginProduct.ADMINHUB}
  >
    {storyFn()}
  </AnalyticsProvider>
);
