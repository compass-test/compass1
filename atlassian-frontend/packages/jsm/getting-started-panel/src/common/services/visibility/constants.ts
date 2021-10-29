import { OgVisibilityKeys, SdVisibilityKeys, VisibilityValues } from './types';
import { ChecklistTabKey, TaskId } from '../../types';

const BASICS_VISIBILITY_KEYS = [
  SdVisibilityKeys.SdStandardTasksVisibility,
  SdVisibilityKeys.SdAdvancedTasksVisibility,
];

const CHANGES_VISIBILITY_KEYS = [
  SdVisibilityKeys.SdStandardTasksVisibility,
  SdVisibilityKeys.SdAdvancedTasksVisibility,
];

const INCIDENTS_VISIBILITY_KEYS = [
  OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility,
  OgVisibilityKeys.OgSetupTeamTaskVisibility,
  OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility,
  OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility,
];

export const TAB_VISIBILITY_KEYS = {
  [ChecklistTabKey.Basics]: BASICS_VISIBILITY_KEYS,
  [ChecklistTabKey.Changes]: CHANGES_VISIBILITY_KEYS,
  [ChecklistTabKey.Incidents]: INCIDENTS_VISIBILITY_KEYS,
};

export const TASK_VISIBILITY_KEYS = {
  [TaskId.CreateItsmProject]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.CustomizePortal]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.AddPortalLogo]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.SetupEmailRequests]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.SetupServices]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.AddTeamMember]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.GoBeyondBasics]: SdVisibilityKeys.SdStandardTasksVisibility,
  [TaskId.ConnectCiCdPipeline]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.AddChangeApprovers]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.TurnOnAutomationRules]: SdVisibilityKeys.SdAdvancedTasksVisibility,
  [TaskId.MakeTheMostOfChangeManagement]:
    SdVisibilityKeys.SdStandardTasksVisibility,
  [TaskId.SetupProfileForNotifications]:
    OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility,
  [TaskId.SetupTeam]: OgVisibilityKeys.OgSetupTeamTaskVisibility,
  [TaskId.AssignOwnerTeamToServices]:
    OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility,
  [TaskId.LevelUpIncidentManagement]:
    OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility,
};

export const ALL_VISIBLE = {
  [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Visible,
  [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Visible,
  [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
    VisibilityValues.Visible,
  [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Visible,
  [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
    VisibilityValues.Visible,
  [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
    VisibilityValues.Visible,
};
