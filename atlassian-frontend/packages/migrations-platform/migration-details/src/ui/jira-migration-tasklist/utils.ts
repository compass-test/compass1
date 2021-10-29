import type { CustomerMigrationMode } from '../../common/types';
import { Props as AdvancedRoadmapsTaskData } from '../../common/ui/advanced-roadmaps-task-card';
import { Props as AppsMigrationTaskData } from '../../common/ui/apps-migration-task-card';
import { Props as CustomersMigrationTaskData } from '../../common/ui/customers-migration-task-card/types';
import { Props as ProjectsTaskData } from '../../common/ui/project-task-card';
import { Props as UsersAndGroupsTaskData } from '../../common/ui/users-and-groups-task-card';

import { ErrorData } from './ui/task-list-errors';
import messages from './ui/task-list-errors/messages';

export type SelectionStatus = {
  overallErrorData: ErrorData;
  projectsSelectionHasBeenMade: boolean;
  usersAndGroupsSelectionHasBeenMade: boolean;
  isAttachmentsOnly: boolean;
  isConfigOnly: boolean;
  advancedRoadmapsIsAvailbleAndNoSelectionMadeYet: boolean;
  isMigratingAdvancedRoadMapPlans: boolean;
  isNotMigratingAnyProjects: boolean;
  userAndGroupsSelectionMode?: 'All' | 'Referenced';
  shouldDisableUsersGroupsTaskCard: boolean;
  disableCheckForErrorsButton: boolean;
  customersSelectionMode?: CustomerMigrationMode;
  areCustomersSelected: boolean;
};

export const getOverallErrorData = (
  isMigratingProjectAttachmentsOnly: boolean,
  isMigratingProjectConfigurationsOnly: boolean,
  isMigratingAdvancedRoadMapPlans: boolean,
  isNotMigratingAnyProjects: boolean,
  userAndGroupsSelectionMode?: 'All' | 'Referenced',
  customersSelectionMode?: CustomerMigrationMode,
): ErrorData => {
  if (isNotMigratingAnyProjects) {
    if (
      userAndGroupsSelectionMode === 'Referenced' &&
      customersSelectionMode === 'REFERENCED'
    ) {
      return {
        hasError: true,
        errorTitle:
          messages.skipProjectsReferencedUsersGroupsCustomersErrorTitle,
        errorDescription:
          messages.skipProjectsReferencedUsersGroupsCustomersErrorDescription,
      };
    } else if (userAndGroupsSelectionMode === 'Referenced') {
      return {
        hasError: true,
        errorTitle: messages.skipProjectsButReferencedUsersGroupsErrorTitle,
        errorDescription:
          messages.skipProjectsButReferencedUsersGroupsErrorDescription,
      };
    } else if (customersSelectionMode === 'REFERENCED') {
      return {
        hasError: true,
        errorTitle: messages.skipProjectsReferencedCustomersErrorTitle,
        errorDescription:
          messages.skipProjectsReferencedCustomersErrorDescription,
      };
    }
  }

  if (
    isMigratingProjectAttachmentsOnly &&
    customersSelectionMode === 'REFERENCED'
  ) {
    return {
      hasError: true,
      errorTitle: messages.invalidSelectionErrorTitle,
      errorDescription: messages.attachmentsOnlyErrorDescription,
    };
  }

  if (
    isMigratingProjectAttachmentsOnly &&
    (isMigratingAdvancedRoadMapPlans || !!userAndGroupsSelectionMode)
  ) {
    return {
      hasError: true,
      errorTitle: messages.invalidSelectionErrorTitle,
      errorDescription: messages.attachmentsOnlyErrorDescription,
    };
  }

  if (isMigratingProjectConfigurationsOnly && isMigratingAdvancedRoadMapPlans) {
    return {
      hasError: true,
      errorTitle: messages.invalidSelectionErrorTitle,
      errorDescription: messages.configOnlyErrorDescription,
    };
  }

  return {
    hasError: false,
  };
};

export const getSelectionStatus = (
  projectsTaskData: ProjectsTaskData,
  usersAndGroupsTaskData: UsersAndGroupsTaskData,
  advancedRoadmapsTaskData?: AdvancedRoadmapsTaskData,
  appsMigrationTaskData?: AppsMigrationTaskData,
  customersMigrationTaskData?: CustomersMigrationTaskData,
): SelectionStatus => {
  const projectsSelectionHasBeenMade = !!projectsTaskData.selection;
  const usersAndGroupsSelectionHasBeenMade = !!usersAndGroupsTaskData.selection;
  const appsSelectionHasBeenMade = appsMigrationTaskData
    ? !!appsMigrationTaskData?.selection
    : undefined;
  const areCustomersSelected = !!customersMigrationTaskData?.selection;
  const isAttachmentsOnly =
    projectsTaskData.selection?.projectDataMigrationMode === 'AttachmentsOnly';

  const isConfigOnly =
    projectsTaskData.selection?.projectDataMigrationMode === 'ConfigOnly';

  const advancedRoadmapsIsAvailbleAndNoSelectionMadeYet =
    !!advancedRoadmapsTaskData && !advancedRoadmapsTaskData.selection;

  const isMigratingAdvancedRoadMapPlans =
    (advancedRoadmapsTaskData?.selection?.numberOfPlans || 0) > 0;

  const isNotMigratingAnyProjects =
    !projectsTaskData.selection ||
    projectsTaskData.selection?.numberOfProjects === 0;

  const userAndGroupsSelectionMode = usersAndGroupsTaskData.selection?.mode;

  const customersSelectionMode = customersMigrationTaskData?.selection?.mode;

  const overallErrorData = getOverallErrorData(
    isAttachmentsOnly,
    isConfigOnly,
    isMigratingAdvancedRoadMapPlans,
    isNotMigratingAnyProjects,
    userAndGroupsSelectionMode,
    customersSelectionMode,
  );

  const shouldDisableUsersGroupsTaskCard =
    !projectsSelectionHasBeenMade ||
    usersAndGroupsTaskData.isDisabled ||
    isAttachmentsOnly;

  const disableCheckForErrorsButton =
    !projectsSelectionHasBeenMade ||
    (!usersAndGroupsSelectionHasBeenMade &&
      !shouldDisableUsersGroupsTaskCard) ||
    (appsMigrationTaskData && !appsSelectionHasBeenMade) ||
    (customersMigrationTaskData && !areCustomersSelected) ||
    overallErrorData.hasError;

  return {
    overallErrorData,
    projectsSelectionHasBeenMade,
    usersAndGroupsSelectionHasBeenMade,
    isAttachmentsOnly,
    isConfigOnly,
    advancedRoadmapsIsAvailbleAndNoSelectionMadeYet,
    isMigratingAdvancedRoadMapPlans,
    isNotMigratingAnyProjects,
    userAndGroupsSelectionMode,
    shouldDisableUsersGroupsTaskCard,
    disableCheckForErrorsButton,
    customersSelectionMode,
    areCustomersSelected,
  };
};
