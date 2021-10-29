import { createAndFireEvent } from '@atlaskit/analytics-next';

export enum AnalyticsActionSubject {
  ERROR_BOUNDARY = 'errorBoundary',
  VIEW_PEOPLE_DIRECTORY_LINK = 'viewAllPeopleDirectory',
  CREATE_NEW_TEAM_LINK = 'createNewTeamLink',
  PEOPLE_MENU_LINK = 'peopleMenuLink',
  TEAM_MENU_LINK = 'teamMenuLink',
  PEOPLE_MENU = 'peopleMenu',
  NAVIGATION_MENU_ITEM = 'navigationMenuItem',
  INVITE_PEOPLE_FEATURE = 'feature',
  PRE_FETCH_DATA = 'preFetchData',
  FETCHING_USERS_TEAMS_DATA = 'fetchingUsersTeamsData',
  HOVER_AND_CLICK_PEOPLE_BUTTON = 'hoverAndClickPeopleButton',
}

export enum AnalyticsAction {
  RENDERED = 'rendered',
  CLICKED = 'clicked',
  EXPOSED = 'exposed',
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
  VIEWED = 'viewed',
  TRIGGERED = 'triggered',
  MEASURED = 'measured',
}

export enum AnalyticsSource {
  PEOPLE_MENU = 'peopleMenu',
}

export const ANALYTICS_CHANNEL = 'peopleTeams';
export const createAndFireEventOnAtlasKit = createAndFireEvent(
  ANALYTICS_CHANNEL,
);
