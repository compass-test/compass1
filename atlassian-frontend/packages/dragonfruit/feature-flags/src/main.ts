import { useFeatureFlag } from './controllers';
import {
  UI_ACTIVITY_FEED_LIST_VIEW_ENABLED,
  UI_ACTIVITY_FEED_LIST_VIEW_ENABLED_DEFAULT_VALUE,
  UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW,
  UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW_DEFAULT_VALUE,
  UI_COMPONENT_ANNOUNCEMENTS,
  UI_COMPONENT_ANNOUNCEMENTS_DEFAULT_VALUE,
  UI_CSV_IMPORT,
  UI_CSV_IMPORT_DEFAULT_VALUE,
  UI_DOWNSTREAM_DEPENDENCIES,
  UI_DOWNSTREAM_DEPENDENCIES_DEFAULT_VALUE,
  UI_ENABLE_SWITCHER_REMOTE__ADMIN_CONFIG_DEFAULT_VALUE,
  UI_ENABLE_SWITCHER_REMOTE_ADMIN_CONFIG,
  UI_ENABLE_SWITCHER_REMOTE_CONFIG,
  UI_ENABLE_SWITCHER_REMOTE_CONFIG_DEFAULT_VALUE,
  UI_IN_APP_NOTIFICATIONS,
  UI_IN_APP_NOTIFICATIONS_DEFAULT_VALUE,
  UI_INLINE_CREATE_COMPONENT,
  UI_INLINE_CREATE_COMPONENT_DEFAULT_VALUE,
  UI_INTERCOM_ENABLED,
  UI_INTERCOM_ENABLED_DEFAULT_VALUE,
  UI_JIRA_COMPONENT_PAGE,
  UI_JIRA_COMPONENT_PAGE_DEFAULT_VALUE,
  UI_JIRA_PROJECTS_DROPDOWN,
  UI_JIRA_PROJECTS_DROPDOWN_DEFAULT_VALUE,
  UI_LOW_SCORING_COMPONENTS_FILTER_ENABLED,
  UI_LOW_SCORING_COMPONENTS_FILTER_ENABLED_DEFAULT_VALUE,
  UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED,
  UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED_DEFAULT_VALUE,
  UI_ONBOARDING_MODAL,
  UI_ONBOARDING_MODAL_DEFAULT_VALUE,
  UI_SCORECARD_DETAILS_PAGE,
  UI_SCORECARD_DETAILS_PAGE_DEFAULT_VALUE,
  UI_SHOW_API_SPECS_APP,
  UI_SHOW_API_SPECS_APP_DEFAULT_VALUE,
  UI_SHOW_NEW_RELIC_APP,
  UI_SHOW_NEW_RELIC_APP_DEFAULT_VALUE,
  UI_TEAM_CHECKINS,
  UI_TEAM_CHECKINS_DEFAULT_VALUE,
  UI_TEAMS_LIST_PAGE,
  UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  USER_HOME_PAGE,
  USER_HOME_PAGE_DEFAULT_VALUE,
} from './feature-flags';

export const useCompassScorecardTeamDashboardComponentsListView = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW,
    UI_COMPASS_SCORECARD_TEAM_DASHBOARD_COMPONENTS_LIST_VIEW_DEFAULT_VALUE,
  );
  return value;
};

export const useCompassCSVImportEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_CSV_IMPORT,
    UI_CSV_IMPORT_DEFAULT_VALUE,
  );
  return value;
};

export const useCompassOnboardingModalEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_ONBOARDING_MODAL,
    UI_ONBOARDING_MODAL_DEFAULT_VALUE,
  );
  return value;
};

export const useNewComponentDataManagerExperienceEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED,
    UI_NEW_COMPONENT_DATA_MANAGER_EXPERIENCE_ENABLED_DEFAULT_VALUE,
  );
  return value;
};

export const useShowNewRelicApp = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_SHOW_NEW_RELIC_APP,
    UI_SHOW_NEW_RELIC_APP_DEFAULT_VALUE,
  );
  return value;
};

export const useShowSwaggerUIApp = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_SHOW_API_SPECS_APP,
    UI_SHOW_API_SPECS_APP_DEFAULT_VALUE,
  );
  return value;
};

export const useTeamsListPageEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_TEAMS_LIST_PAGE,
    UI_TEAMS_LIST_PAGE_DEFAULT_VALUE,
  );
  return value;
};

export const useActivityFeedListViewEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_ACTIVITY_FEED_LIST_VIEW_ENABLED,
    UI_ACTIVITY_FEED_LIST_VIEW_ENABLED_DEFAULT_VALUE,
  );
  return value;
};

export const useCompassComponentAnnouncementsEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_COMPONENT_ANNOUNCEMENTS,
    UI_COMPONENT_ANNOUNCEMENTS_DEFAULT_VALUE,
  );
  return value;
};

export const useCompassComponentDownstreamDependenciesEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_DOWNSTREAM_DEPENDENCIES,
    UI_DOWNSTREAM_DEPENDENCIES_DEFAULT_VALUE,
  );
  return value;
};

export const useCompassInlineCreateComponentEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_INLINE_CREATE_COMPONENT,
    UI_INLINE_CREATE_COMPONENT_DEFAULT_VALUE,
  );

  return value;
};

export const useSwitcherRemoteConfig = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_ENABLE_SWITCHER_REMOTE_CONFIG,
    UI_ENABLE_SWITCHER_REMOTE_CONFIG_DEFAULT_VALUE,
  );

  return value;
};

export const useSwitcherRemoteAdminConfig = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_ENABLE_SWITCHER_REMOTE_ADMIN_CONFIG,
    UI_ENABLE_SWITCHER_REMOTE__ADMIN_CONFIG_DEFAULT_VALUE,
  );

  return value;
};

export const useScorecardDetailsPageEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_SCORECARD_DETAILS_PAGE,
    UI_SCORECARD_DETAILS_PAGE_DEFAULT_VALUE,
  );

  return value;
};

export const useJiraProjectsDropdown = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_JIRA_PROJECTS_DROPDOWN,
    UI_JIRA_PROJECTS_DROPDOWN_DEFAULT_VALUE,
  );

  return value;
};

export const useJiraComponentPage = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_JIRA_COMPONENT_PAGE,
    UI_JIRA_COMPONENT_PAGE_DEFAULT_VALUE,
  );

  return value;
};

export const useLowScoringComponentsFilterEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_LOW_SCORING_COMPONENTS_FILTER_ENABLED,
    UI_LOW_SCORING_COMPONENTS_FILTER_ENABLED_DEFAULT_VALUE,
  );

  return value;
};

export const useTeamCheckinsEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_TEAM_CHECKINS,
    UI_TEAM_CHECKINS_DEFAULT_VALUE,
  );

  return value;
};

export const useIntercomEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_INTERCOM_ENABLED,
    UI_INTERCOM_ENABLED_DEFAULT_VALUE,
  );

  return value;
};

export const useInAppNotificationsEnabled = () => {
  const { value } = useFeatureFlag<boolean>(
    UI_IN_APP_NOTIFICATIONS,
    UI_IN_APP_NOTIFICATIONS_DEFAULT_VALUE,
  );

  return value;
};

export const useUserHomePage = () => {
  const { value } = useFeatureFlag<boolean>(
    USER_HOME_PAGE,
    USER_HOME_PAGE_DEFAULT_VALUE,
  );

  return value;
};
