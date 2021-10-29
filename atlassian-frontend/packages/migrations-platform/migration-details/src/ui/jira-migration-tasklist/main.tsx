import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import FocusPage from '@atlassian/mpt-focus-page';

import AdvancedRoadmapsTaskCard, {
  Props as AdvancedRoadmapsTaskData,
} from '../../common/ui/advanced-roadmaps-task-card';
import AppsMigrationTaskCard, {
  Props as AppsMigrationTaskData,
} from '../../common/ui/apps-migration-task-card';
import CustomersTaskCard from '../../common/ui/customers-migration-task-card';
import { Props as CustomersMigrationTaskData } from '../../common/ui/customers-migration-task-card/types';
import ProjectTaskCard, {
  Props as ProjectsTaskData,
} from '../../common/ui/project-task-card';
import UsersAndGroupsTaskCard, {
  Props as UsersAndGroupsTaskData,
} from '../../common/ui/users-and-groups-task-card';

import { TaskCards, TaskCardWrapper } from './styled';
import FooterButtons from './ui/footer-buttons';
import TaskListErrors from './ui/task-list-errors';
import { getSelectionStatus } from './utils';

export type Props = {
  // Task data for projects - including current selection, event handlers and state
  projectsTaskData: ProjectsTaskData;
  // Task data for users and groups - including current selection, event handlers and state
  usersAndGroupsTaskData: UsersAndGroupsTaskData;
  // Task data for Advanced Roadmaps - including current selection, event handlers and state. Optional since it only applies for Jira instances with AR installed
  advancedRoadmapsTaskData?: AdvancedRoadmapsTaskData;

  // Task data for Apps migration. Includes the selection count, and evenet handlers. It is optional as it needs to hide behind a feature flag.
  appsMigrationTaskData?: AppsMigrationTaskData;

  /**
   *
   * Task data for Customer migration for JSM. Includes the selection count, and event
   * handlers. It is optional as it would only be available for a JSM migration
   *
   * */
  customersMigrationTaskData?: CustomersMigrationTaskData;
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
  progress?: React.ReactNode;
  title?: string;
  subtitle?: string | React.ReactNode;
  bannerMessage?: string | React.ReactNode;
  bannerAppearance?: 'warning' | 'error' | 'announcement';
  headerButtons?: React.ReactNode | React.ReactNode[];
};

const JiraMigrationTasklist: FC<Props & InjectedIntlProps> = ({
  intl,
  projectsTaskData,
  usersAndGroupsTaskData,
  advancedRoadmapsTaskData,
  appsMigrationTaskData,
  customersMigrationTaskData,
  onNext,
  title,
  subtitle,
  bannerMessage,
  bannerAppearance,
  progress,
  headerButtons,
  onBack,
  onClose,
  children,
}) => {
  const {
    overallErrorData,
    projectsSelectionHasBeenMade,
    isAttachmentsOnly,
    isConfigOnly,
    advancedRoadmapsIsAvailbleAndNoSelectionMadeYet,
    isNotMigratingAnyProjects,
    disableCheckForErrorsButton,
  } = getSelectionStatus(
    projectsTaskData,
    usersAndGroupsTaskData,
    advancedRoadmapsTaskData,
    appsMigrationTaskData,
    customersMigrationTaskData,
  );

  return (
    <FocusPage
      title={title}
      width="medium"
      onClose={onClose}
      bannerMessage={bannerMessage}
      bannerAppearance={bannerAppearance}
      progress={progress}
      headerButtons={headerButtons}
      footerButtons={
        <FooterButtons
          usersAndGroupsConfig={usersAndGroupsTaskData.selection}
          disableNextButton={disableCheckForErrorsButton}
          onNextClick={onNext}
          onBackButtonClick={onBack}
        />
      }
      subtitle={subtitle}
    >
      <TaskListErrors errorData={overallErrorData} />
      <TaskCards>
        {advancedRoadmapsTaskData && (
          <TaskCardWrapper>
            <AdvancedRoadmapsTaskCard
              {...advancedRoadmapsTaskData}
              isMigratingProjectAttachmentsOnly={isAttachmentsOnly}
              isMigratingProjectConfigurationsOnly={isConfigOnly}
              onUnselectAllPlans={advancedRoadmapsTaskData.onUnselectAllPlans}
            />
          </TaskCardWrapper>
        )}
        <TaskCardWrapper>
          <ProjectTaskCard
            {...projectsTaskData}
            isDisabled={advancedRoadmapsIsAvailbleAndNoSelectionMadeYet}
          />
        </TaskCardWrapper>
        <TaskCardWrapper>
          <UsersAndGroupsTaskCard
            {...usersAndGroupsTaskData}
            hasMadeProjectsSelection={projectsSelectionHasBeenMade}
            isNotMigratingAnyProjects={isNotMigratingAnyProjects}
            isMigratingProjectAttachmentsOnly={isAttachmentsOnly}
          />
        </TaskCardWrapper>
        {customersMigrationTaskData && (
          <TaskCardWrapper>
            <CustomersTaskCard
              {...customersMigrationTaskData}
              hasMadeProjectsSelection={projectsSelectionHasBeenMade}
              isNotMigratingAnyProjects={isNotMigratingAnyProjects}
              isMigratingProjectAttachmentsOnly={isAttachmentsOnly}
            />
          </TaskCardWrapper>
        )}
        {appsMigrationTaskData && (
          <TaskCardWrapper>
            <AppsMigrationTaskCard {...appsMigrationTaskData} />
          </TaskCardWrapper>
        )}
      </TaskCards>
      {children}
    </FocusPage>
  );
};

export default injectIntl(JiraMigrationTasklist);
