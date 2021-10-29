import { Props as AdvancedRoadmapsTaskData } from '../../common/ui/advanced-roadmaps-task-card';
import { Props as AppsMigrationTaskData } from '../../common/ui/apps-migration-task-card';
import { Props as CustomersMigrationTaskData } from '../../common/ui/customers-migration-task-card/types';
import { Props as ProjectsTaskData } from '../../common/ui/project-task-card';
import { Props as UsersAndGroupsTaskData } from '../../common/ui/users-and-groups-task-card';

import { getOverallErrorData, getSelectionStatus } from './utils';

describe('getOverallErrorData()', () => {
  it('should have no error when nothing is out of the ordinary', () => {
    expect(getOverallErrorData(false, false, false, false, undefined)).toEqual({
      hasError: false,
    });
  });

  it('when migrating referenced users but skipping projects', () => {
    const errorData = getOverallErrorData(
      false,
      false,
      false,
      true,
      'Referenced',
    );
    expect(errorData.hasError).toBeTruthy();
    expect(errorData.errorTitle?.defaultMessage).toEqual(
      'Invalid users and groups selection',
    );
    expect(errorData.errorDescription?.defaultMessage).toEqual(
      'Since you haven’t selected any projects, you can’t migrate users and groups related to those projects. Either add projects to your migration or select all users and groups.',
    );
  });

  it('when migrating project attachments only but selected advanced roadmaps plans', () => {
    const errorData = getOverallErrorData(true, false, true, false, undefined);
    expect(errorData.hasError).toBeTruthy();
    expect(errorData.errorTitle?.defaultMessage).toEqual('Invalid selection');
    expect(errorData.errorDescription?.defaultMessage).toEqual(
      'Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection.',
    );
  });

  it('when migrating project attachments only but selected to migrate All Users and Groups', () => {
    const errorData = getOverallErrorData(true, false, false, false, 'All');
    expect(errorData.hasError).toBeTruthy();
    expect(errorData.errorTitle?.defaultMessage).toEqual('Invalid selection');
    expect(errorData.errorDescription?.defaultMessage).toEqual(
      'Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection.',
    );
  });

  it('when migrating project attachments only but selected to migrate Referenced Users and Groups', () => {
    const errorData = getOverallErrorData(
      true,
      false,
      false,
      false,
      'Referenced',
    );
    expect(errorData.hasError).toBeTruthy();
    expect(errorData.errorTitle?.defaultMessage).toEqual('Invalid selection');
    expect(errorData.errorDescription?.defaultMessage).toEqual(
      'Since you are migrating attachments only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Attachments only selection.',
    );
  });

  it('when migrating project configurations only but selected advanced roadmaps plans', () => {
    const errorData = getOverallErrorData(false, true, true, false, undefined);
    expect(errorData.hasError).toBeTruthy();
    expect(errorData.errorTitle?.defaultMessage).toEqual('Invalid selection');
    expect(errorData.errorDescription?.defaultMessage).toEqual(
      'Since you are migrating configuration only for selected projects, you can’t migrate some of the items below. Either skip those items or change your Configuration only selection.',
    );
  });
});

describe('getSelectionStatus()', () => {
  const dummyProjectTaskData: ProjectsTaskData = {
    selection: {
      projectDataMigrationMode: 'All',
      numberOfProjects: 1,
      numberOfIssues: 2,
      attachmentsBytesSize: 100,
    },
    onSelect: () => undefined,
    onSkip: () => undefined,
  };
  const dummyUsersAndGroupsTaskData: UsersAndGroupsTaskData = {
    onSelect: () => undefined,
  };
  const dummyAdvancedRoadmapsTaskData: AdvancedRoadmapsTaskData = {
    onSelect: () => undefined,
    onSkip: () => undefined,
  };
  const dummyAppMigrationTaskData: AppsMigrationTaskData = {
    onSelect: () => undefined,
  };
  const dummyCustomersTaskData: CustomersMigrationTaskData = {
    onSelect: () => undefined,
  };

  describe('returned projectsSelectionHasBeenMade', () => {
    it('should be false when project selection is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData, selection: undefined },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.projectsSelectionHasBeenMade).toBeFalsy();
    });

    it('should be true when chosen not to migrate any projects', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            numberOfProjects: 0,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
    });

    it('should be true when chosen to migrate some projects', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            numberOfProjects: 1,
            attachmentsBytesSize: 2,
            numberOfIssues: 3,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
    });
  });

  describe('returned usersAndGroupsSelectionHasBeenMade', () => {
    it('should be false when users and groups selection is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData, selection: undefined },
      );
      expect(result.usersAndGroupsSelectionHasBeenMade).toBeFalsy();
    });

    it('should be true when some selection has been made', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        {
          ...dummyUsersAndGroupsTaskData,
          selection: {
            mode: 'All',
            shouldPreserveMemberships: false,
          },
        },
      );
      expect(result.usersAndGroupsSelectionHasBeenMade).toBeTruthy();
    });
  });

  describe('returned customerSelectionHasBeenMade', () => {
    it('should be false when customers selection is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyCustomersTaskData, selection: undefined },
      );
      expect(result.areCustomersSelected).toBeFalsy();
    });

    it('should be true when customers selection has been made', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        {
          ...dummyUsersAndGroupsTaskData,
          selection: {
            mode: 'All',
            shouldPreserveMemberships: false,
          },
        },
        { ...dummyAdvancedRoadmapsTaskData },
        { ...dummyAppMigrationTaskData },
        {
          ...dummyCustomersTaskData,
          selection: {
            shouldMigrateProjects: true,
            customersCount: 10,
            mode: 'ALL',
          },
        },
      );
      expect(result.areCustomersSelected).toBeTruthy();
    });
  });
  describe('returned isAttachmentsOnly', () => {
    it('should be false when project selection is undefined', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: undefined,
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isAttachmentsOnly).toBeFalsy();
    });

    it('should be false when project data migration mode is not AttachmentsOnly', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'All',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isAttachmentsOnly).toBeFalsy();
    });

    it('should be true when project data migration mode is AttachmentsOnly', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'AttachmentsOnly',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isAttachmentsOnly).toBeTruthy();
    });
  });

  describe('returned isConfigOnly', () => {
    it('should be false when project selection is undefined', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: undefined,
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isConfigOnly).toBeFalsy();
    });

    it('should be false when project data migration mode is not ConfigOnly', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'All',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isConfigOnly).toBeFalsy();
    });

    it('should be true when project data migration mode is ConfigOnly', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'ConfigOnly',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isConfigOnly).toBeTruthy();
    });
  });

  describe('returned advancedRoadmapsIsAvailbleAndNoSelectionMadeYet', () => {
    it('should be false when advanced roadmaps is not available', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        undefined, // AR is not installed or otherwise not available
      );
      expect(
        result.advancedRoadmapsIsAvailbleAndNoSelectionMadeYet,
      ).toBeFalsy(); // Falsy because AR is not available
    });

    it('should be true when advanced roadmaps selection has not been made', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        { ...dummyAdvancedRoadmapsTaskData, selection: undefined },
      );
      expect(
        result.advancedRoadmapsIsAvailbleAndNoSelectionMadeYet,
      ).toBeTruthy();
    });

    it('should be true when advanced roadmaps selection has been made', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        {
          ...dummyAdvancedRoadmapsTaskData,
          selection: {
            numberOfPlans: 0,
          },
        },
      );
      expect(
        result.advancedRoadmapsIsAvailbleAndNoSelectionMadeYet,
      ).toBeFalsy();
    });
  });

  describe('returned isMigratingAdvancedRoadMapPlans', () => {
    it('should be false when advanced roadmaps data is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        undefined,
      );
      expect(result.isMigratingAdvancedRoadMapPlans).toBeFalsy();
    });

    it('should be false when advanced roadmaps selection is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        { ...dummyAdvancedRoadmapsTaskData, selection: undefined },
      );
      expect(result.isMigratingAdvancedRoadMapPlans).toBeFalsy();
    });

    it('should be false when selected number of plans is zero', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        { ...dummyAdvancedRoadmapsTaskData, selection: { numberOfPlans: 0 } },
      );
      expect(result.isMigratingAdvancedRoadMapPlans).toBeFalsy();
    });

    it('should be false when selected number of plans larger than zero', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData },
        { ...dummyAdvancedRoadmapsTaskData, selection: { numberOfPlans: 1 } },
      );
      expect(result.isMigratingAdvancedRoadMapPlans).toBeTruthy();
    });
  });

  describe('returned isNotMigratingAnyProjects', () => {
    it('should be true when project selection is undefined', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData, selection: undefined },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isNotMigratingAnyProjects).toBeTruthy();
    });

    it('should be true when chosen not to migrate any projects', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            numberOfProjects: 0,
            attachmentsBytesSize: 0,
            numberOfIssues: 0,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isNotMigratingAnyProjects).toBeTruthy();
    });

    it('should be false when chosen to migrate some projects', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            numberOfProjects: 1,
            attachmentsBytesSize: 2,
            numberOfIssues: 3,
          },
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.isNotMigratingAnyProjects).toBeFalsy();
    });
  });

  describe('returned shouldDisableUsersGroupsTaskCard', () => {
    it('should be true when project selection has not been made', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: undefined,
        },
        { ...dummyUsersAndGroupsTaskData, isDisabled: false },
      );
      expect(result.projectsSelectionHasBeenMade).toBeFalsy();

      expect(result.shouldDisableUsersGroupsTaskCard).toBeTruthy();
    });

    it('should be true when users and groups selection has been explicitly disabled', () => {
      const result = getSelectionStatus(
        { ...dummyProjectTaskData },
        { ...dummyUsersAndGroupsTaskData, isDisabled: true },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
      expect(result.isAttachmentsOnly).toBeFalsy();

      expect(result.shouldDisableUsersGroupsTaskCard).toBeTruthy();
    });

    it('should be true when migrating project attachments only', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'AttachmentsOnly',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData, isDisabled: false },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
      expect(result.isAttachmentsOnly).toBeTruthy();

      expect(result.shouldDisableUsersGroupsTaskCard).toBeTruthy();
    });

    it('should be false when migrating project attachments only', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'All',
            numberOfProjects: 1,
            numberOfIssues: 2,
            attachmentsBytesSize: 100,
          },
        },
        { ...dummyUsersAndGroupsTaskData, isDisabled: false },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
      expect(result.isAttachmentsOnly).toBeFalsy();

      expect(result.shouldDisableUsersGroupsTaskCard).toBeFalsy();
    });
  });

  describe('returned shouldDisableUsersGroupsTaskCard', () => {
    it('should be true when project selection has not been made', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: undefined, // Project selection has not been made
        },
        { ...dummyUsersAndGroupsTaskData },
      );
      expect(result.projectsSelectionHasBeenMade).toBeFalsy();
      expect(
        !result.shouldDisableUsersGroupsTaskCard &&
          !result.usersAndGroupsSelectionHasBeenMade,
      ).toBeFalsy();
      expect(result.overallErrorData.hasError).toBeFalsy();

      expect(result.disableCheckForErrorsButton).toBeTruthy();
    });

    it('should be true when there is an error', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'All',
            numberOfProjects: 0, // Select no project with referenced users to force and error
            numberOfIssues: 0,
            attachmentsBytesSize: 0,
          },
        },
        {
          ...dummyUsersAndGroupsTaskData,
          selection: { mode: 'Referenced', shouldPreserveMemberships: false },
        },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
      expect(
        !result.shouldDisableUsersGroupsTaskCard &&
          !result.usersAndGroupsSelectionHasBeenMade,
      ).toBeFalsy();
      expect(result.overallErrorData.hasError).toBeTruthy();

      expect(result.disableCheckForErrorsButton).toBeTruthy();
    });

    it('should be true when users and groups selection is not disabled and the selection has not been made', () => {
      const result = getSelectionStatus(
        {
          ...dummyProjectTaskData,
          selection: {
            projectDataMigrationMode: 'All',
            numberOfProjects: 0,
            numberOfIssues: 0,
            attachmentsBytesSize: 0,
          },
        },
        {
          ...dummyUsersAndGroupsTaskData,
          selection: undefined,
        },
      );
      expect(result.projectsSelectionHasBeenMade).toBeTruthy();
      expect(
        !result.shouldDisableUsersGroupsTaskCard &&
          !result.usersAndGroupsSelectionHasBeenMade,
      ).toBeTruthy();
      expect(result.overallErrorData.hasError).toBeFalsy();

      expect(result.disableCheckForErrorsButton).toBeTruthy();
    });
  });
});
