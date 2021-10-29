import {
  OgVisibilityKeys,
  SdVisibilityKeys,
  VisibilityByTab,
  VisibilityByTaskId,
  VisibilityData,
  VisibilityValues,
} from './types';
import { ChecklistTabKey } from '../../types';

export const mockVisibilityDataNothing: VisibilityData = {
  user: {
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Hidden,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Hidden,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Hidden,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Hidden,
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      VisibilityValues.Hidden,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Hidden,
  },
  workspace: {},
};

export const mockVisibilityDataEmpty: VisibilityData = {
  user: {},
  workspace: {},
};

export const mockVisibilityDataAllKeys: VisibilityData = {
  user: {
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Visible,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Visible,

    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Hidden,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Hidden,
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      VisibilityValues.Unset,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Hidden,
  },
  workspace: {
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Visible,
  },
};

export const mockVisibilityDataStandard: VisibilityData = {
  user: {
    ...mockVisibilityDataNothing.user,
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Visible,
  },
  workspace: {},
};

export const mockVisibilityDataAdvanced: VisibilityData = {
  user: {
    ...mockVisibilityDataNothing.user,
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Visible,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Visible,
  },
  workspace: {},
};

export const mockVisibilityDataSomeOg: VisibilityData = {
  user: {
    ...mockVisibilityDataNothing.user,
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Visible,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Visible,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Visible,
  },
  workspace: {},
};

export const mockVisibilityDataOnlyOg: VisibilityData = {
  user: {
    ...mockVisibilityDataNothing.user,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Visible,
  },
  workspace: {},
};

export const mockVisibilityDataOnlySomeOg: VisibilityData = {
  user: {
    ...mockVisibilityDataNothing.user,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Visible,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Visible,
  },
  workspace: {},
};

export const mockByTaskVisibility: VisibilityByTaskId = {};

export const mockTabVisibilityAll: VisibilityByTab = {
  [ChecklistTabKey.Basics]: true,
  [ChecklistTabKey.Changes]: true,
  [ChecklistTabKey.Incidents]: true,
};

export const mockTabVisibilityOnlyIncidents: VisibilityByTab = {
  [ChecklistTabKey.Basics]: false,
  [ChecklistTabKey.Changes]: false,
  [ChecklistTabKey.Incidents]: true,
};
