import {
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import {
  AnalyticsAction,
  AnalyticsActionSubject,
  AnalyticsSource,
  createAndFireEventOnAtlasKit,
} from './constants';
export {
  triggerAnalyticsForLoadedPeople,
  triggerAnalyticsForLoadedTeam,
  triggerAnalyticsForFailedLoadPeopleAndTeams,
} from './slo-events';

export {
  AnalyticsActionSubject,
  AnalyticsAction,
  AnalyticsSource,
  createAndFireEventOnAtlasKit,
};

export const triggerAnalyticsForClickCreateNewTeam = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.CREATE_NEW_TEAM_LINK,
    action: AnalyticsAction.CLICKED,
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForClickViewDirectory = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.VIEW_PEOPLE_DIRECTORY_LINK,
    action: AnalyticsAction.CLICKED,
    attributes: {
      isLeftClick,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForClickInvitePeople = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  attributes?: {
    product?: string;
  },
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.NAVIGATION_MENU_ITEM,
    actionSubjectId: 'addPeopleNavigationMenuItem',
    action: AnalyticsAction.CLICKED,
    attributes: {
      integration: 'peopleMenu',
      ...attributes,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForClickOnPeople = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU_LINK,
    action: AnalyticsAction.CLICKED,
    attributes: {
      isLeftClick,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForClickOnTeam = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.TEAM_MENU_LINK,
    action: AnalyticsAction.CLICKED,
    attributes: {
      isLeftClick,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForViewedPeopleMenu = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isCacheEmpty = false,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: SCREEN_EVENT_TYPE,
    name: 'peopleMenu',
    attributes: {
      isCacheEmpty,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForExposedInvitePeople = (
  product: string,
  subProduct?: string,
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  value?: boolean,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
    action: AnalyticsAction.EXPOSED,
    attributes: {
      subProduct,
      flagKey:
        // Jira and Confluence FF are synced
        // For Jira, we are using the product select FF from Confluence
        product === 'confluence'
          ? 'confluence.frontend.enable.invite.teammate.people.menu.dropdown'
          : 'confluence.frontend.enable.product.select.invite.people.nav.3',
      value,
      reason: value ? 'RULE_MATCH' : 'FALLTHROUGH',
      ruleId: value
        ? 'bfcf95e4-e5b5-4da3-92d7-0bb9e24fb61f'
        : 'afcf95e4-e5b5-4da3-92d7-0bb9e24fb61f',
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForViewedAddPeopleModal = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  userRole?: string,
  product?: string,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: SCREEN_EVENT_TYPE,
    name: 'addPeopleModal',
    attributes: {
      integration: 'peopleMenu',
      permissionLevel: userRole,
      product: product,
    },
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForPreFetchData = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  const fireEventWithPayload = createAndFireEventOnAtlasKit({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PRE_FETCH_DATA,
    action: AnalyticsAction.TRIGGERED,
  });

  if (createAnalyticsEvent) {
    fireEventWithPayload(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForLoadingIndicator = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  // this UI event is queried in Amplitude to know how many times the skeleton/spinner is rendered
  const fireUIEvent = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU,
    actionSubjectId: 'loadingIndicator',
    action: AnalyticsAction.VIEWED,
    attributes: {
      duration,
      startTime,
    },
  });

  if (createAnalyticsEvent) {
    fireUIEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForFetchingData = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  const fireTrackEvent = createAndFireEventOnAtlasKit({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.FETCHING_USERS_TEAMS_DATA,
    action: AnalyticsAction.MEASURED,
    attributes: {
      duration,
      startTime,
    },
  });

  if (createAnalyticsEvent) {
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForHoverAndClick = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  const fireTrackEvent = createAndFireEventOnAtlasKit({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.HOVER_AND_CLICK_PEOPLE_BUTTON,
    action: AnalyticsAction.MEASURED,
    attributes: {
      duration,
      startTime,
    },
  });

  if (createAnalyticsEvent) {
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForViewedFullUsersAndTeams = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  usersCount = 0,
  teamsCount = 0,
  duration = 0,
  startTime = 0,
) => {
  const fireTrackEvent = createAndFireEventOnAtlasKit({
    eventType: TRACK_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU,
    action: AnalyticsAction.SUCCEEDED,
    attributes: {
      usersCount,
      teamsCount,
      duration,
      startTime,
    },
  });

  if (createAnalyticsEvent) {
    fireTrackEvent(createAnalyticsEvent);
  }
};

export const triggerAnalyticsForNoBrowsePeoplePermission = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  const fireTrackEvent = createAndFireEventOnAtlasKit({
    eventType: UI_EVENT_TYPE,
    actionSubject: AnalyticsActionSubject.PEOPLE_MENU,
    action: AnalyticsAction.VIEWED,
    actionSubjectId: 'noBrowsePermission',
  });

  if (createAnalyticsEvent) {
    fireTrackEvent(createAnalyticsEvent);
  }
};
