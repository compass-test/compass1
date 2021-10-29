/* eslint-disable no-console */
import React from 'react';
import { AnalyticsProvider } from '../common/AnalyticsProvider/index';
import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';
import { StoryFn } from './types';

const consoleClient = {
  sendUIEvent: (...args: any) => console.log('UI: ', ...args),
  sendTrackEvent: (...args: any) => console.log('TRACK: ', ...args),
  sendOperationalEvent: (...args: any) => console.log('OPERATIONAL: ', ...args),
  sendScreenEvent: (...args: any) => console.log('SCREEN: ', ...args),
};

export const withConsoleAnalytics = (storyFn: StoryFn) => (
  <AnalyticsProvider analyticsClient={consoleClient}>
    <ContextualAnalyticsData sourceType={SCREEN} sourceName="projectPages">
      {storyFn()}
    </ContextualAnalyticsData>
  </AnalyticsProvider>
);
