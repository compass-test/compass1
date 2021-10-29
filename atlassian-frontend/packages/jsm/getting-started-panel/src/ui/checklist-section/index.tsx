import React, { ComponentType } from 'react';

import { ContextualAnalyticsData, SCREEN } from '@atlassian/analytics-bridge';

import HeaderCard from './header-card';
import {
  TabContainerProps,
  BasicsTabContainer,
  ChangesTabContainer,
  IncidentsTabContainer,
} from './tab-container';
import {
  Checklist as ChecklistData,
  ChecklistTabKey,
  TaskId,
  HeaderState,
} from '../../common/types';
import { SectionContainer } from '../styled';
import { checklistSectionScreenName } from '../../common/analytics/constants';
import { getCompletedTasks, getTabTaskIds } from '../../common/util';
import {
  getVisibleTasks,
  getVisibleActiveTab,
  useTaskVisibility,
  useTabVisibility,
} from '../../common/services/visibility';

interface Props {
  state: ChecklistData;
  completedItems: TaskId[];
  onUserActivity: (updatedState: ChecklistData) => void;
  onClose: () => void;
  onBack: () => void;
}

const getActiveTabComponent = (
  activeTab: ChecklistTabKey,
): ComponentType<TabContainerProps> => {
  switch (activeTab) {
    case ChecklistTabKey.Basics:
      return BasicsTabContainer;
    case ChecklistTabKey.Changes:
      return ChangesTabContainer;
    case ChecklistTabKey.Incidents:
      return IncidentsTabContainer;
  }
};

export const ChecklistSection = ({
  state,
  completedItems,
  onUserActivity,
  onClose,
  onBack,
}: Props) => {
  const [taskVisibility] = useTaskVisibility();
  const [tabVisibility] = useTabVisibility();
  const { activeTab, tabs } = state;

  const visibleActiveTab = getVisibleActiveTab(activeTab, tabVisibility);
  if (!visibleActiveTab) {
    // This can only happen if user won't have any permissions to see anything
    return null;
  }

  const { activeTask } = tabs[visibleActiveTab];
  const ActiveTabComponent = getActiveTabComponent(visibleActiveTab);
  const tabTaskIds = getVisibleTasks(
    getTabTaskIds(visibleActiveTab),
    taskVisibility,
  );
  const activeTabCompletedTasks = getCompletedTasks(completedItems, tabTaskIds);

  const onTabSelected = (activeTab: ChecklistTabKey) => {
    const updatedState = {
      ...state,
      activeTab,
    };
    onUserActivity(updatedState);
  };

  const onHeaderStateChanged = (headerState: HeaderState) => {
    const updatedState = {
      ...state,
      headerState,
    };
    onUserActivity(updatedState);
  };

  const onTaskExpand = (taskId: TaskId | undefined) => {
    const updatedState = {
      ...state,
      tabs: {
        ...tabs,
        [visibleActiveTab]: {
          activeTask: taskId,
        },
      },
    };
    onUserActivity(updatedState);
  };

  return (
    <ContextualAnalyticsData
      sourceName={checklistSectionScreenName}
      sourceType={SCREEN}
    >
      <SectionContainer>
        <HeaderCard
          checklist={state}
          completedItems={completedItems}
          onTabSelected={onTabSelected}
          onHeaderStateChanged={onHeaderStateChanged}
          onClose={onClose}
          onBack={onBack}
        />
        <ActiveTabComponent
          activeTask={activeTask}
          completedTasks={activeTabCompletedTasks}
          onTaskExpand={onTaskExpand}
        />
      </SectionContainer>
    </ContextualAnalyticsData>
  );
};

export default ChecklistSection;
