import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import {
  AnalyticsAction,
  AnalyticsActionSubject,
  createAndFireEventOnAtlasKit,
} from './index';

export const triggerAnalyticsForLoadedPeople = (
  action: 'failed' | 'succeeded',
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  status?: number,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU_LINK,
    action:
      action === 'succeeded'
        ? AnalyticsAction.SUCCEEDED
        : AnalyticsAction.FAILED,
    attributes: {
      status,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForLoadedTeam = (
  action: 'failed' | 'succeeded',
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  status?: number,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_MENU_LINK,
    action:
      action === 'succeeded'
        ? AnalyticsAction.SUCCEEDED
        : AnalyticsAction.FAILED,
    attributes: {
      status,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForFailedLoadPeopleAndTeams = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: OPERATIONAL_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU,
    action: AnalyticsAction.FAILED,
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};
