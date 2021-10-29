import { ChecklistTabKey, GspState, TaskId } from '../../types';

export enum SdVisibilityKeys {
  SdStandardTasksVisibility = 'servicedesk-standard-tasks-visibility',
  SdAdvancedTasksVisibility = 'servicedesk-advanced-tasks-visibility',
}

export enum OgVisibilityKeys {
  OgSetupProfileForNotificationsTaskVisibility = 'opsgenie-user-profile-notifications-setup-task-visibility',
  OgSetupTeamTaskVisibility = 'opsgenie-response-team-setup-task-visibility',
  OgAssignOwnerTeamToServicesTaskVisibility = 'opsgenie-owner-team-assigned-to-service-task-visibility',
  OgLevelUpIncidentManagementTaskVisibility = 'opsgenie-incident-management-documentation-accessed-task-visibility',
}

export type VisibilityKeys = SdVisibilityKeys | OgVisibilityKeys;

export type VisibilityKey =
  | SdVisibilityKeys.SdStandardTasksVisibility
  | SdVisibilityKeys.SdAdvancedTasksVisibility
  | OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility
  | OgVisibilityKeys.OgSetupTeamTaskVisibility
  | OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility
  | OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility;

export enum VisibilityValues {
  Hidden = 'hidden',
  Visible = 'visible',
  Unset = 'unset',
}

export type VisibilityValue =
  | VisibilityValues.Hidden
  | VisibilityValues.Visible
  | VisibilityValues.Unset;

export type VisibilityState = {
  [key in VisibilityKey]?: VisibilityValue | undefined;
};

export type VisibilityByTab = {
  [ChecklistTabKey.Basics]?: boolean;
  [ChecklistTabKey.Changes]?: boolean;
  [ChecklistTabKey.Incidents]?: boolean;
};

export type VisibilityByTaskId = {
  [TaskId.CreateItsmProject]?: boolean;
  [TaskId.CustomizePortal]?: boolean;
  [TaskId.AddPortalLogo]?: boolean;
  [TaskId.SetupEmailRequests]?: boolean;
  [TaskId.SetupServices]?: boolean;
  [TaskId.AddTeamMember]?: boolean;
  [TaskId.GoBeyondBasics]?: boolean;
  [TaskId.ConnectCiCdPipeline]?: boolean;
  [TaskId.AddChangeApprovers]?: boolean;
  [TaskId.TurnOnAutomationRules]?: boolean;
  [TaskId.MakeTheMostOfChangeManagement]?: boolean;
  [TaskId.SetupProfileForNotifications]?: boolean;
  [TaskId.SetupTeam]?: boolean;
  [TaskId.AssignOwnerTeamToServices]?: boolean;
  [TaskId.LevelUpIncidentManagement]?: boolean;
};

export enum SdVisibilityRoles {
  Advanced = 'advanced',
  Standard = 'standard',
}

export type SdVisibilityRole =
  | SdVisibilityRoles.Advanced
  | SdVisibilityRoles.Standard;

export interface State {
  byTab: VisibilityByTab;
  byTaskId: VisibilityByTaskId;
  sdRole: SdVisibilityRole;
}

export interface VisibilityData {
  user?: VisibilityState;
  workspace?: VisibilityState;
}

export interface VisibilityContainerProps {
  gspState: GspState;
  serviceDeskBaseUrl?: string;
  opsgenieBaseUrl?: string;
}
