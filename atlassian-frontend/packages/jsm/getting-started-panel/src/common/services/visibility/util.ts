import compact from 'lodash/compact';
import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import findKey from 'lodash/findKey';
import { VisibilityByTaskId } from '.';
import {
  ALL_VISIBLE,
  TAB_VISIBILITY_KEYS,
  TASK_VISIBILITY_KEYS,
} from './constants';
import {
  SdVisibilityKeys,
  OgVisibilityKeys,
  SdVisibilityRoles,
  VisibilityData,
  VisibilityKey,
  VisibilityValue,
  VisibilityValues,
  VisibilityState,
  VisibilityContainerProps,
  VisibilityByTab,
} from './types';
import {
  BasicsTaskIds,
  ChangesTaskIds,
  IncidentsTaskIds,
  ChecklistTabKey,
  GspState,
  TaskId,
  ContainerType,
  ExplicitStringBoolean,
} from '../../types';

export const getProjectIdIfNotDeleted = (gspState: GspState) => {
  const gspProjectId = gspState.properties.user.projectId;
  if (gspProjectId === undefined) {
    return undefined;
  }
  // check container properties for the given project to
  // see if it has been marked as deleted
  for (const { containerId, containerType, properties } of gspState.properties
    .containers) {
    if (
      containerType === ContainerType.Project &&
      containerId === gspProjectId
    ) {
      return properties.projectDeleted === ExplicitStringBoolean.Yes
        ? undefined
        : gspProjectId;
    }
  }
  return gspProjectId;
};

export const getVisibleTasks = (
  taskIds: TaskId[],
  taskVisibility: VisibilityByTaskId,
) => compact(taskIds.map((taskId) => (taskVisibility[taskId] ? taskId : null)));

export const getVisibleActiveTab = (
  activeTab: ChecklistTabKey,
  tabVisibility: VisibilityByTab,
) => {
  const visibleActiveTab = tabVisibility[activeTab]
    ? activeTab
    : findKey(tabVisibility);
  return visibleActiveTab as ChecklistTabKey | void;
};

const extractVisibilityData = (state: GspState) => ({
  user: {
    [SdVisibilityKeys.SdStandardTasksVisibility]:
      state.properties.user[SdVisibilityKeys.SdStandardTasksVisibility],
    [SdVisibilityKeys.SdAdvancedTasksVisibility]:
      state.properties.user[SdVisibilityKeys.SdAdvancedTasksVisibility],
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      state.properties.user[
        OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility
      ],
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]:
      state.properties.user[OgVisibilityKeys.OgSetupTeamTaskVisibility],
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      state.properties.user[
        OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility
      ],
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      state.properties.user[
        OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility
      ],
  },
  workspace: state.properties.workspace
    ? {
        [SdVisibilityKeys.SdStandardTasksVisibility]:
          state.properties.workspace[
            SdVisibilityKeys.SdStandardTasksVisibility
          ],
        [SdVisibilityKeys.SdAdvancedTasksVisibility]:
          state.properties.workspace[
            SdVisibilityKeys.SdAdvancedTasksVisibility
          ],
        [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
          state.properties.workspace[
            OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility
          ],
        [OgVisibilityKeys.OgSetupTeamTaskVisibility]:
          state.properties.workspace[
            OgVisibilityKeys.OgSetupTeamTaskVisibility
          ],
        [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
          state.properties.workspace[
            OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility
          ],
        [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
          state.properties.workspace[
            OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility
          ],
      }
    : undefined,
});

export const computeVisibility = ({
  gspState,
  opsgenieBaseUrl,
  serviceDeskBaseUrl,
}: VisibilityContainerProps) => {
  const visibilityData = extractVisibilityData(gspState);
  const mapUndefinedToVisible = (val: VisibilityValue) =>
    val === undefined ? VisibilityValues.Visible : val;
  const omitUnset = (val: VisibilityValue) => val === VisibilityValues.Unset;
  const visibilityState: VisibilityState = mapValues(
    {
      ...ALL_VISIBLE,
      ...omitBy(visibilityData.workspace, omitUnset),
      ...omitBy(visibilityData.user, omitUnset),
    },
    mapUndefinedToVisible,
  );
  const projectId = getProjectIdIfNotDeleted(gspState);

  return {
    sdRole:
      visibilityState[SdVisibilityKeys.SdAdvancedTasksVisibility] ===
      VisibilityValues.Visible
        ? SdVisibilityRoles.Advanced
        : SdVisibilityRoles.Standard,
    byTaskId: computeVisibilityByTaskId(visibilityData, visibilityState),
    byTab: computeVisibilityByTab(visibilityData, visibilityState, projectId, {
      serviceDeskBaseUrl,
      opsgenieBaseUrl,
    }),
  };
};

const computeTabVisibility = (
  visibilityState: VisibilityState,
  tabKey: ChecklistTabKey,
) => {
  const tabVisibilityKeys = TAB_VISIBILITY_KEYS[tabKey] as VisibilityKey[];

  return tabVisibilityKeys.reduce((acc: boolean, key: VisibilityKey) => {
    return acc || visibilityState[key] === VisibilityValues.Visible;
  }, false);
};

const computeVisibilityByTab = (
  visibilityData: VisibilityData,
  visibilityState: VisibilityState,
  projectId: string | undefined,
  baseUrls: {
    serviceDeskBaseUrl?: string;
    opsgenieBaseUrl?: string;
  },
) => {
  const hasServiceDesk =
    baseUrls.serviceDeskBaseUrl !== undefined && projectId !== undefined;
  const hasOpsgenie = baseUrls.opsgenieBaseUrl !== undefined;

  return {
    [ChecklistTabKey.Basics]:
      hasServiceDesk &&
      computeTabVisibility(visibilityState, ChecklistTabKey.Basics),
    [ChecklistTabKey.Changes]:
      hasServiceDesk &&
      computeTabVisibility(visibilityState, ChecklistTabKey.Changes),
    [ChecklistTabKey.Incidents]:
      hasOpsgenie &&
      computeTabVisibility(visibilityState, ChecklistTabKey.Incidents),
  };
};

const computeVisibilityByTaskId = (
  visibilityData: VisibilityData,
  visibilityState: VisibilityState,
): VisibilityByTaskId =>
  [...BasicsTaskIds, ...ChangesTaskIds, ...IncidentsTaskIds].reduce(
    (acc: VisibilityByTaskId, taskId: TaskId) => {
      return {
        ...acc,
        [taskId]:
          visibilityState[TASK_VISIBILITY_KEYS[taskId]] ===
          VisibilityValues.Visible,
      };
    },
    {},
  );
