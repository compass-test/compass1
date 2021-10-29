import {
  OPERATIONAL_EVENT_TYPE,
  SCREEN_EVENT_TYPE,
  TRACK_EVENT_TYPE,
  UI_EVENT_TYPE,
} from '@atlaskit/analytics-gas-types';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

import { PeopleMenuProps } from '../../types';
import { runItLater } from '../../utils/helper';

import {
  AnalyticsAction,
  AnalyticsActionSubject,
  AnalyticsSource,
  createAndFireEventOnAtlasKit,
} from './constants';

export {
  triggerAnalyticsForLoadedPeople,
  triggerAnalyticsForLoadedTeam,
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
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: UI_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.CREATE_NEW_TEAM_LINK,
      action: AnalyticsAction.CLICKED,
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForClickViewDirectory = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForClickInvitePeople = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  attributes?: {
    product?: string;
  },
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForClickOnPeople = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForClickOnTeam = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isLeftClick?: boolean,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForViewedPeopleMenu = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  isCacheEmpty = false,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForRenderedInvitePeople = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: UI_EVENT_TYPE,
      actionSubject: 'addPeopleNavigationItem',
      action: AnalyticsAction.RENDERED,
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForViewedAddPeopleModal = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  viralSettingsCohort?: PeopleMenuProps['viralSettingsCohort'],
  userRole?: string,
  product?: string,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: SCREEN_EVENT_TYPE,
      name: 'addPeopleModal',
      attributes: {
        integration: 'peopleMenu',
        permissionLevel: userRole,
        product: product,
        viralSettingsCohort,
      },
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForExposedUserRecommendations = (
  product: string,
  value: string | undefined,
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: OPERATIONAL_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.INVITE_PEOPLE_FEATURE,
      action: AnalyticsAction.EXPOSED,
      attributes: {
        flagKey: 'confluence.frontend.user.recommendations',
        value: value || 'not-enrolled-control',
        product,
        growthInitiative: 'virality',
        experimentName: 'User recommendations',
        experience: 'people-menu',
      },
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForPreFetchData = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  runItLater(() => {
    const fireEventWithPayload = createAndFireEventOnAtlasKit({
      eventType: TRACK_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.PRE_FETCH_DATA,
      action: AnalyticsAction.TRIGGERED,
    });

    if (createAnalyticsEvent) {
      fireEventWithPayload(createAnalyticsEvent);
    }
  });
};

export const triggerAnalyticsForLoadingIndicator = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForFetchingData = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForHoverAndClick = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  duration = 0,
  startTime = 0,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForViewedFullUsersAndTeams = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
  usersCount = 0,
  teamsCount = 0,
  duration = 0,
  startTime = 0,
) => {
  runItLater(() => {
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
  });
};

export const triggerAnalyticsForNoBrowsePeoplePermission = (
  createAnalyticsEvent?: CreateUIAnalyticsEvent,
) => {
  runItLater(() => {
    const fireTrackEvent = createAndFireEventOnAtlasKit({
      eventType: UI_EVENT_TYPE,
      actionSubject: AnalyticsActionSubject.PEOPLE_MENU,
      action: AnalyticsAction.VIEWED,
      actionSubjectId: 'noBrowsePermission',
    });

    if (createAnalyticsEvent) {
      fireTrackEvent(createAnalyticsEvent);
    }
  });
};
