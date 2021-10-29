import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  OPERATIONAL_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlassian/analytics-bridge';

import { AnalyticsEventWithType } from './types';

export const getDefaultSelectedIntegrationMap = (integrationList: string[]) => {
  const defaultSelectedIntegrationMap = new Map();
  integrationList.forEach((integrationKey) => {
    defaultSelectedIntegrationMap.set(integrationKey, false);
  });
  return defaultSelectedIntegrationMap;
};

export const getIsNextButtonDisabled = (
  selectedIntegrationMap: Map<string, boolean>,
) => {
  for (let [, value] of selectedIntegrationMap) {
    if (value) {
      return false;
    }
  }

  return true;
};

export const getSelectedIntegrationList = (
  selectedIntegrationMap: Map<string, boolean>,
) => {
  const selectedIntegrationList: string[] = [];

  selectedIntegrationMap.forEach((value, key) => {
    if (value) {
      selectedIntegrationList.push(key);
    }
  });

  return selectedIntegrationList;
};

export const getIntegrationPickerClickedEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integration: string,
  isSelectedAfterClick: boolean,
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'clicked',
    actionSubject: 'toggleButton',
    actionSubjectId: 'integrationPicker',
    attributes: {
      integration,
      isSelected: isSelectedAfterClick,
    },
  }),
  eventType: UI_EVENT_TYPE,
});

export const getIntegrationRequestedApiErrorEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integrationsSelected: string[],
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'failed',
    // Note: part of the actionSubject should be dependent on the product
    actionSubject: 'jiraSoftwareOnboarding.integrationsSurveyApiError',
    attributes: {
      integrationsSelected,
      endpointSource: 'sendIntegrationsInstallRequests',
    },
  }),
  eventType: OPERATIONAL_EVENT_TYPE,
});

export const getNextButtonClickedEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  selectedIntegrationList: string[],
  isChecked: boolean,
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'nextButton',
    attributes: {
      integrationsSelected: selectedIntegrationList,
      isInstallationRequestSelected: isChecked,
      numberOfIntegrationsSelected: selectedIntegrationList.length,
    },
  }),
  eventType: UI_EVENT_TYPE,
});

export const getInstallRequestCheckboxToggledEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  isChecked: boolean,
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'toggled',
    actionSubject: 'checkbox',
    actionSubjectId: 'sendInstallationRequest',
    attributes: {
      isChecked,
    },
  }),
  eventType: UI_EVENT_TYPE,
});

export const getSkipButtonClickedEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'clicked',
    actionSubject: 'button',
    actionSubjectId: 'skipButton',
  }),
  eventType: UI_EVENT_TYPE,
});

export const getAllIntegrationInstallRequestSettledDurationEvent = (
  createAnalyticsEvent: CreateUIAnalyticsEvent,
  integrations: string[],
  duration: number,
): AnalyticsEventWithType => ({
  analyticsEvent: createAnalyticsEvent({
    action: 'settled',
    actionSubject: 'integrationsSurveyApi.allRequestSettled',
    attributes: {
      duration,
      integrations,
    },
  }),
  eventType: TRACK_EVENT_TYPE,
});
