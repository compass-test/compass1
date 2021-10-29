import {
  SCREEN_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import type { InvitePeopleProps } from '@atlassian/invite-people';
import {
  createAndFireEvent,
  CreateUIAnalyticsEvent,
} from '@atlaskit/analytics-next';
import { AnalyticsActionSubject, AnalyticsAction } from '../../types';

const ANALYTICS_CHANNEL = 'peopleTeams';
const createAndFireEventOnPeopleTeams = createAndFireEvent(ANALYTICS_CHANNEL);

export const triggerAnalyticsForClickCloseDrawerButton = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  source?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.BUTTON,
    actionSubjectId: 'closeButton',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: 'invitePeopleDrawer',
      source,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForDrawerViewed = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  source?: string,
  viralSettingsCohort?: InvitePeopleProps['viralSettingsCohort'],
) => {
  const fireEventWithPayload = createAndFireEventOnPeopleTeams({
    eventType: SCREEN_EVENT_TYPE,
    name: 'invitePeopleDrawer',
    attributes: {
      source,
      viralSettingsCohort,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};
