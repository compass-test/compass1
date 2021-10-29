import filter from 'lodash/filter';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../../common/mocks';
import {
  getVisibleActiveTab,
  getVisibleTasks,
  SdVisibilityRoles,
  VisibilityValues,
} from '../../../common/services/visibility';
import {
  mockTabVisibilityAll,
  mockTabVisibilityOnlyIncidents,
} from '../../../common/services/visibility/mocks';
import { ALL_VISIBLE } from '../../../common/services/visibility/constants';
import {
  computeVisibility,
  getProjectIdIfNotDeleted,
} from '../../../common/services/visibility/util';
import {
  SdVisibilityKeys,
  OgVisibilityKeys,
  VisibilityContainerProps,
} from '../../../common/services/visibility/types';
import {
  ChecklistTabKey,
  GspState,
  TaskId,
  ContainerProperties,
  ContainerType,
  ExplicitStringBoolean,
} from '../../../common/types';

const allSet = {
  user: ALL_VISIBLE,
  workspace: ALL_VISIBLE,
};

const allUnset = {
  user: {
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Unset,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Unset,
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      VisibilityValues.Unset,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Unset,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Unset,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Unset,
  },
  workspace: {
    [SdVisibilityKeys.SdStandardTasksVisibility]: VisibilityValues.Unset,
    [SdVisibilityKeys.SdAdvancedTasksVisibility]: VisibilityValues.Unset,
    [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
      VisibilityValues.Unset,
    [OgVisibilityKeys.OgSetupTeamTaskVisibility]: VisibilityValues.Unset,
    [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
      VisibilityValues.Unset,
    [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
      VisibilityValues.Unset,
  },
};

const stateAllSet: GspState = {
  ...mockGspState,
  properties: {
    ...mockGspState.properties,
    user: {
      ...mockGspState.properties.user,
      ...allSet.user,
    },
    workspace: {
      ...allSet.workspace,
    },
  },
};

const mockVisibilityContainerProps: VisibilityContainerProps = {
  gspState: stateAllSet,
  serviceDeskBaseUrl: mockServiceDeskBaseUrl,
  opsgenieBaseUrl: mockOpsgenieBaseUrl,
};

const stateAllUnset = {
  ...mockGspState,
  properties: {
    ...mockGspState.properties,
    user: {
      ...mockGspState.properties.user,
      ...allUnset.user,
    },
    workspace: {
      ...allUnset.workspace,
    },
  },
};

const computedAllVisible = {
  sdRole: SdVisibilityRoles.Advanced,
  byTab: {
    [ChecklistTabKey.Basics]: true,
    [ChecklistTabKey.Changes]: true,
    [ChecklistTabKey.Incidents]: true,
  },
  byTaskId: {
    [TaskId.CreateItsmProject]: true,
    [TaskId.CustomizePortal]: true,
    [TaskId.AddPortalLogo]: true,
    [TaskId.SetupEmailRequests]: true,
    [TaskId.SetupServices]: true,
    [TaskId.AddTeamMember]: true,
    [TaskId.GoBeyondBasics]: true,
    [TaskId.ConnectCiCdPipeline]: true,
    [TaskId.AddChangeApprovers]: true,
    [TaskId.MakeTheMostOfChangeManagement]: true,
    [TaskId.SetupProfileForNotifications]: true,
    [TaskId.SetupTeam]: true,
    [TaskId.AssignOwnerTeamToServices]: true,
    [TaskId.LevelUpIncidentManagement]: true,
  },
};

describe('getVisibleTasks', () => {
  const allTasksVisible = {
    [TaskId.CreateItsmProject]: true,
    [TaskId.CustomizePortal]: true,
    [TaskId.AddPortalLogo]: true,
    [TaskId.SetupEmailRequests]: true,
    [TaskId.SetupServices]: true,
    [TaskId.AddTeamMember]: true,
    [TaskId.GoBeyondBasics]: true,
    [TaskId.ConnectCiCdPipeline]: true,
    [TaskId.AddChangeApprovers]: true,
    [TaskId.MakeTheMostOfChangeManagement]: true,
    [TaskId.SetupProfileForNotifications]: true,
    [TaskId.SetupTeam]: true,
    [TaskId.AssignOwnerTeamToServices]: true,
    [TaskId.LevelUpIncidentManagement]: true,
  };
  const allTasks = [
    TaskId.CreateItsmProject,
    TaskId.CustomizePortal,
    TaskId.AddPortalLogo,
    TaskId.SetupEmailRequests,
    TaskId.SetupServices,
    TaskId.AddTeamMember,
    TaskId.GoBeyondBasics,
    TaskId.ConnectCiCdPipeline,
    TaskId.AddChangeApprovers,
    TaskId.MakeTheMostOfChangeManagement,
    TaskId.SetupProfileForNotifications,
    TaskId.SetupTeam,
    TaskId.AssignOwnerTeamToServices,
    TaskId.LevelUpIncidentManagement,
  ];

  it('does not filter anything out', () => {
    expect(getVisibleTasks(allTasks, allTasksVisible)).toStrictEqual(allTasks);
  });

  it('filters visible tasks correctly', () => {
    expect(
      getVisibleTasks(allTasks, {
        ...allTasksVisible,
        [TaskId.LevelUpIncidentManagement]: false,
      }),
    ).toStrictEqual(
      filter(allTasks, (taskId) => taskId !== TaskId.LevelUpIncidentManagement),
    );
  });
});

describe('getVisibleActiveTab', () => {
  it('returns active tab when tab is visible', () => {
    expect(
      getVisibleActiveTab(ChecklistTabKey.Changes, mockTabVisibilityAll),
    ).toEqual(ChecklistTabKey.Changes);
  });

  it('returns alternative visible tab when active tab is not visible', () => {
    expect(
      getVisibleActiveTab(
        ChecklistTabKey.Basics,
        mockTabVisibilityOnlyIncidents,
      ),
    ).toEqual(ChecklistTabKey.Incidents);
  });

  it('returns undefined tab when no tabs are visible', () => {
    expect(
      getVisibleActiveTab(ChecklistTabKey.Incidents, {
        [ChecklistTabKey.Basics]: false,
        [ChecklistTabKey.Changes]: false,
        [ChecklistTabKey.Incidents]: false,
      }),
    ).toEqual(undefined);
  });
});

describe('getProjectIdIfNotDeleted', () => {
  const buildStateWithProjectDetails = ({
    projectId,
    containers,
  }: {
    projectId: string | undefined;
    containers: ContainerProperties[];
  }): GspState => ({
    ...stateAllSet,
    properties: {
      ...stateAllSet.properties,
      containers,
      user: {
        ...stateAllSet.properties.user,
        projectId,
      },
    },
  });
  it('returns undefined if no projectId in GSP state', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: undefined,
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10005',
              properties: {},
            },
          ],
        }),
      ),
    ).toEqual(undefined);
  });

  it('returns projectId if projectId in GSP state and not marked as deleted', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10005',
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10005',
              properties: {},
            },
          ],
        }),
      ),
    ).toEqual('10005');
  });

  it('returns projectId if projectId in GSP state and no container data', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10006',
          containers: [],
        }),
      ),
    ).toEqual('10006');
  });

  it('returns undefined if projectId in GSP state and marked as deleted', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10005',
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10005',
              properties: { projectDeleted: ExplicitStringBoolean.Yes },
            },
          ],
        }),
      ),
    ).toEqual(undefined);
  });

  it('returns projectId if projectId in GSP state and other projects are marked as deleted', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10005',
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10005',
              properties: {},
            },
            {
              containerType: ContainerType.Project,
              containerId: '10006',
              properties: { projectDeleted: ExplicitStringBoolean.Yes },
            },
            {
              containerType: ContainerType.Project,
              containerId: '10007',
              properties: { projectDeleted: ExplicitStringBoolean.Yes },
            },
          ],
        }),
      ),
    ).toEqual('10005');
  });

  it('returns projectId if projectDeleted property present but not "yes"', () => {
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10007',
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10007',
              properties: { projectDeleted: ExplicitStringBoolean.No },
            },
          ],
        }),
      ),
    ).toEqual('10007');
    expect(
      getProjectIdIfNotDeleted(
        buildStateWithProjectDetails({
          projectId: '10008',
          containers: [
            {
              containerType: ContainerType.Project,
              containerId: '10008',
              // @ts-ignore we want to test invalid data here
              properties: { projectDeleted: 'invalid-value-yes' },
            },
          ],
        }),
      ),
    ).toEqual('10008');
  });
});

describe('computeVisibility ', () => {
  const visibilityContainerProps = mockVisibilityContainerProps;

  it('computes the visibility correctly when all tasks are visible', () => {
    expect(computeVisibility(visibilityContainerProps)).toStrictEqual({
      sdRole: SdVisibilityRoles.Advanced,
      byTab: {
        [ChecklistTabKey.Basics]: true,
        [ChecklistTabKey.Changes]: true,
        [ChecklistTabKey.Incidents]: true,
      },
      byTaskId: {
        [TaskId.CreateItsmProject]: true,
        [TaskId.CustomizePortal]: true,
        [TaskId.AddPortalLogo]: true,
        [TaskId.SetupEmailRequests]: true,
        [TaskId.SetupServices]: true,
        [TaskId.AddTeamMember]: true,
        [TaskId.GoBeyondBasics]: true,
        [TaskId.ConnectCiCdPipeline]: true,
        [TaskId.AddChangeApprovers]: true,
        [TaskId.MakeTheMostOfChangeManagement]: true,
        [TaskId.SetupProfileForNotifications]: true,
        [TaskId.SetupTeam]: true,
        [TaskId.AssignOwnerTeamToServices]: true,
        [TaskId.LevelUpIncidentManagement]: true,
      },
    });
  });

  it('computes the visibility correctly when advanced and all Opsgenie tasks are hidden', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              [SdVisibilityKeys.SdAdvancedTasksVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgSetupTeamTaskVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
                VisibilityValues.Hidden,
            },
          },
        },
      }),
    ).toStrictEqual({
      sdRole: SdVisibilityRoles.Standard,
      byTab: {
        [ChecklistTabKey.Basics]: true,
        [ChecklistTabKey.Changes]: true,
        [ChecklistTabKey.Incidents]: false,
      },
      byTaskId: {
        [TaskId.CreateItsmProject]: false,
        [TaskId.CustomizePortal]: false,
        [TaskId.AddPortalLogo]: false,
        [TaskId.SetupEmailRequests]: false,
        [TaskId.SetupServices]: false,
        [TaskId.AddTeamMember]: false,
        [TaskId.GoBeyondBasics]: true,
        [TaskId.ConnectCiCdPipeline]: false,
        [TaskId.AddChangeApprovers]: false,
        [TaskId.MakeTheMostOfChangeManagement]: true,
        [TaskId.SetupProfileForNotifications]: false,
        [TaskId.SetupTeam]: false,
        [TaskId.AssignOwnerTeamToServices]: false,
        [TaskId.LevelUpIncidentManagement]: false,
      },
    });
  });

  it('computes the visibility correctly when OG tasks within user scope are not set', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgSetupTeamTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
                VisibilityValues.Unset,
            },
          },
        },
      }),
    ).toStrictEqual(computedAllVisible);
  });

  it('computes the tab visibility correctly when projectId is present', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: 'definitely-here',
            },
          },
        },
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: true,
      [ChecklistTabKey.Changes]: true,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when projectId is missing', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: undefined,
            },
          },
        },
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: false,
      [ChecklistTabKey.Changes]: false,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when projectId is marked as deleted', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            containers: [
              ...stateAllSet.properties.containers,
              {
                containerId: '10005',
                containerType: ContainerType.Project,
                properties: {
                  projectDeleted: ExplicitStringBoolean.Yes,
                },
              },
            ],
            user: {
              ...stateAllSet.properties.user,
              projectId: '10005',
            },
          },
        },
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: false,
      [ChecklistTabKey.Changes]: false,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when projectId is not marked as deleted', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            containers: [
              ...stateAllSet.properties.containers,
              {
                containerId: '10005',
                containerType: ContainerType.Project,
                properties: {},
              },
            ],
            user: {
              ...stateAllSet.properties.user,
              projectId: '10005',
            },
          },
        },
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: true,
      [ChecklistTabKey.Changes]: true,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when opsgenieBaseUrl is present', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: 'definitely-here',
            },
          },
        },
        opsgenieBaseUrl: mockOpsgenieBaseUrl,
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: true,
      [ChecklistTabKey.Changes]: true,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when opsgenieBaseUrl is `undefined`', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: 'definitely-here',
            },
          },
        },
        opsgenieBaseUrl: undefined,
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: true,
      [ChecklistTabKey.Changes]: true,
      [ChecklistTabKey.Incidents]: false,
    });
  });

  it('computes the tab visibility correctly when serviceDeskBaseUrl is present', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: 'definitely-here',
            },
          },
        },
        serviceDeskBaseUrl: mockServiceDeskBaseUrl,
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: true,
      [ChecklistTabKey.Changes]: true,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the tab visibility correctly when serviceDeskBaseUrl is `undefined`', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              projectId: 'definitely-here',
            },
          },
        },
        serviceDeskBaseUrl: undefined,
      }).byTab,
    ).toStrictEqual({
      [ChecklistTabKey.Basics]: false,
      [ChecklistTabKey.Changes]: false,
      [ChecklistTabKey.Incidents]: true,
    });
  });

  it('computes the visibility correctly when OG tasks within user scope are not set and some in workspace scope are hidden', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              ...stateAllSet.properties.user,
              [OgVisibilityKeys.OgSetupProfileForNotificationsTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgSetupTeamTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
                VisibilityValues.Unset,
              [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
                VisibilityValues.Unset,
            },
            workspace: {
              ...stateAllSet.properties.workspace,
              [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
                VisibilityValues.Hidden,
            },
          },
        },
      }),
    ).toStrictEqual({
      ...computedAllVisible,
      byTaskId: {
        ...computedAllVisible.byTaskId,
        [TaskId.AssignOwnerTeamToServices]: false,
        [TaskId.LevelUpIncidentManagement]: false,
      },
    });
  });

  it('computes the visibility correctly when tasks within user scope are undefined and some in workspace scope are hidden', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              sectionState: stateAllSet.properties.user.sectionState,
              activeState: stateAllSet.properties.user.activeState,
              visualState: stateAllSet.properties.user.visualState,
              projectId: stateAllSet.properties.user.projectId,
              hasSeenReopenSpotlight:
                stateAllSet.properties.user.hasSeenReopenSpotlight,
            },
            workspace: {
              ...stateAllSet.properties.workspace,
              [OgVisibilityKeys.OgAssignOwnerTeamToServicesTaskVisibility]:
                VisibilityValues.Hidden,
              [OgVisibilityKeys.OgLevelUpIncidentManagementTaskVisibility]:
                VisibilityValues.Hidden,
            },
          },
        },
      }),
    ).toStrictEqual({
      ...computedAllVisible,
    });
  });

  it('computes the visibility correctly when tasks within both scopes are undefined', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: {
          ...stateAllSet,
          properties: {
            ...stateAllSet.properties,
            user: {
              sectionState: stateAllSet.properties.user.sectionState,
              activeState: stateAllSet.properties.user.activeState,
              visualState: stateAllSet.properties.user.visualState,
              projectId: stateAllSet.properties.user.projectId,
              hasSeenReopenSpotlight:
                stateAllSet.properties.user.hasSeenReopenSpotlight,
            },
            workspace: {},
          },
        },
      }),
    ).toStrictEqual(computedAllVisible);
  });

  it('computes the visibility correctly when tasks within both scopes are unset', () => {
    expect(
      computeVisibility({
        ...visibilityContainerProps,
        gspState: { ...stateAllUnset },
      }),
    ).toStrictEqual(computedAllVisible);
  });
});
