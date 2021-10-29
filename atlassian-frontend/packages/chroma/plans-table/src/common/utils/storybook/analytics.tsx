/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

// Storybook analytics web client implementation that will
// - log analytics events to the console
// - transform analytics events to storybook actions
export const actionAndConsoleAnalyticsClient = {
  sendUIEvent: (uiEvent: any) => {
    console.log('UI: ', JSON.stringify(uiEvent, undefined, 4));
    action(uiEvent.data.actionSubjectId)(uiEvent.data);
  },
  sendTrackEvent: (trackEvent: any) => {
    console.log('TRACK: ', JSON.stringify(trackEvent, undefined, 4));
    action(trackEvent.data.actionSubject)(trackEvent.data);
  },
  sendOperationalEvent: (operationalEvent: any) => {
    console.log(
      'OPERATIONAL: ',
      JSON.stringify(operationalEvent, undefined, 4),
    );
    action(operationalEvent.data.actionSubject)(operationalEvent.data);
  },
  sendScreenEvent: (screenEvent: any) => {
    console.log('SCREEN: ', JSON.stringify(screenEvent, undefined, 4));
    setTimeout(() => {
      action(screenEvent.data.name)(screenEvent.data);
    }, 0);
  },
};
