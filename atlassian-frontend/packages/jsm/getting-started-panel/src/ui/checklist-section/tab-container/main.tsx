import React from 'react';

import { ChecklistTab, TaskId } from '../../../common/types';
import { Task } from '@atlassiansox/checklist';
import { ChecklistContainer } from '@atlassiansox/checklist';
import {
  fireUIAnalytics,
  FireScreenAnalytics,
  ContextualAnalyticsData,
  SCREEN,
} from '@atlassian/analytics-bridge';
import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import {
  Scrollable,
  DescriptionWrapper,
  TabContainerWrapper,
} from '../../../common/ui/section';
import {
  getVisibleTasks,
  useTaskVisibility,
} from '../../../common/services/visibility';

import { CreateProjectItemCardContent } from './item-card/create-project';
import { CustomizePortalNameItemCardContent } from './item-card/custom-portal-name';
import { CustomizePortalLogoItemCardContent } from './item-card/custom-portal-logo';
import { EmailSetupItemCardContent } from './item-card/email-setup';
import { SetupServicesItemCardContent } from './item-card/setup-services';
import { AddingUsersItemCardContent } from './item-card/adding-users';
import { GoBeyondBasicsItemCardContent } from './item-card/go-beyond-basics';
import { ConnectPipelineItemCardContent } from './item-card/connect-pipeline';
import { AddChangeApproversItemCardContent } from './item-card/add-change-approvers';
import { AutomationRulesItemCardContent } from './item-card/automation-rules';
import { ChangeManagementItemCardContent } from './item-card/change-management';
import { NotificationsItemCardContent } from './item-card/notifications';
import { SetupTeamItemCardContent } from './item-card/setup-team';
import { AssignOwnerItemCardContent } from './item-card/assign-owner';
import { IncidentManagementItemCardContent } from './item-card/incident-management';
import { getTaskTitle } from '../../../common/ui';
import { getComponentTestId } from '../../../common/util';

export type TabContainerProps = ChecklistTab & {
  // undefined is used when a task is collapsed
  onTaskExpand: (id: TaskId | undefined) => void;
  completedTasks: TaskId[];
};

const childElementMapping: { [taskId in TaskId]: JSX.Element } = {
  [TaskId.CreateItsmProject]: <CreateProjectItemCardContent />,
  [TaskId.CustomizePortal]: <CustomizePortalNameItemCardContent />,
  [TaskId.AddPortalLogo]: <CustomizePortalLogoItemCardContent />,
  [TaskId.SetupEmailRequests]: <EmailSetupItemCardContent />,
  [TaskId.SetupServices]: <SetupServicesItemCardContent />,
  [TaskId.AddTeamMember]: <AddingUsersItemCardContent />,
  [TaskId.GoBeyondBasics]: <GoBeyondBasicsItemCardContent />,
  [TaskId.ConnectCiCdPipeline]: <ConnectPipelineItemCardContent />,
  [TaskId.AddChangeApprovers]: <AddChangeApproversItemCardContent />,
  [TaskId.TurnOnAutomationRules]: <AutomationRulesItemCardContent />,
  [TaskId.MakeTheMostOfChangeManagement]: <ChangeManagementItemCardContent />,
  [TaskId.SetupProfileForNotifications]: <NotificationsItemCardContent />,
  [TaskId.SetupTeam]: <SetupTeamItemCardContent />,
  [TaskId.AssignOwnerTeamToServices]: <AssignOwnerItemCardContent />,
  [TaskId.LevelUpIncidentManagement]: <IncidentManagementItemCardContent />,
};

const heightMapping: { [taskId in TaskId]?: number } = {
  [TaskId.AddTeamMember]: 750,
  [TaskId.SetupTeam]: 1200,
};

export const getTaskItem = (
  taskId: TaskId,
  completedTasks: TaskId[],
  formatMessage: (
    messageDescriptor: FormattedMessage.MessageDescriptor,
  ) => string,
): Task => {
  return {
    id: taskId,
    title: formatMessage(getTaskTitle(taskId)),
    completed: completedTasks.includes(taskId),
    children: childElementMapping[taskId],
    maxHeight: heightMapping[taskId] || 550,
  };
};

export const castStringToTaskId = (id: string) => {
  if (Object.values(TaskId).includes(id as TaskId)) {
    return id as TaskId;
  }
  // ChecklistContainer returns an empty string when a task is collapsed
  return undefined;
};

export const createTabContainer = (
  tabContainerName: string,
  allTasks: TaskId[],
  description: JSX.Element,
) =>
  injectIntl(
    ({
      activeTask,
      completedTasks,
      onTaskExpand,
      intl,
    }: TabContainerProps & InjectedIntlProps) => {
      const [taskVisibility] = useTaskVisibility();
      const tasks = getVisibleTasks(allTasks, taskVisibility).map((taskId) =>
        getTaskItem(taskId, completedTasks, intl.formatMessage),
      );
      const { createAnalyticsEvent } = useAnalyticsEvents();

      const handleTaskExpand = (id: string) => {
        const taskId = castStringToTaskId(id);
        // we only want to log "expand" actions as analytics events
        if (taskId) {
          // TODO: ChecklistContainer onTaskExpand does not give us an Atlaskit event so
          // we have to create it ourselves. Because of this we don't have the context
          // populated automatically from ContextualAnalyticsData
          const event = createAnalyticsEvent({
            action: 'expanded',
            actionSubject: 'task',
          });
          event.context.push({ source: `${tabContainerName}${SCREEN}` });
          fireUIAnalytics(event, 'jsmGettingStartedPanelChecklistTask', {
            taskId,
          });
        }
        onTaskExpand(taskId);
      };

      return (
        <ContextualAnalyticsData
          sourceName={tabContainerName}
          sourceType={SCREEN}
        >
          <Scrollable>
            <TabContainerWrapper
              data-testid={getComponentTestId('checklistTabContainer')}
            >
              <DescriptionWrapper>{description}</DescriptionWrapper>
              <ChecklistContainer
                tasks={tasks}
                onTaskExpand={handleTaskExpand}
                expandedTask={activeTask}
              />
              <FireScreenAnalytics />
            </TabContainerWrapper>
          </Scrollable>
        </ContextualAnalyticsData>
      );
    },
  );
