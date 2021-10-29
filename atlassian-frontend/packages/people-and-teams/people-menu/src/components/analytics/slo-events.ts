import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import { runItLater } from '../../utils/helper';

import {
  AnalyticsAction,
  AnalyticsActionSubject,
  createAndFireEventOnAtlasKit,
} from './index';

export const triggerAnalyticsForLoadedPeople = (
  action: 'failed' | 'succeeded',
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  status?: number,
  error?: Error,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: OPERATIONAL_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.PEOPLE_MENU_LINK,
      action:
        action === 'succeeded'
          ? AnalyticsAction.SUCCEEDED
          : AnalyticsAction.FAILED,
      attributes: {
        status,
        error: error?.message || JSON.stringify(error),
      },
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForLoadedTeam = (
  action: 'failed' | 'succeeded',
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  status?: number,
  error?: Error,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: OPERATIONAL_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.TEAM_MENU_LINK,
      action:
        action === 'succeeded'
          ? AnalyticsAction.SUCCEEDED
          : AnalyticsAction.FAILED,
      attributes: {
        status,
        error: error?.message || JSON.stringify(error),
      },
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};
