import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { ChecklistSection } from '../../ui/checklist-section';
import { HeaderCard, TabData } from '../../ui/checklist-section/header-card';
import {
  BasicsTabContainer,
  ChangesTabContainer,
  IncidentsTabContainer,
} from '../../ui/checklist-section/tab-container';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../common/mocks';
import {
  Checklist,
  ChecklistTabKey,
  HeaderState,
  TaskId,
} from '../../common/types';
import {
  VisibilityContainer,
  VisibilityData,
} from '../../common/services/visibility';
import {
  mockVisibilityDataAllKeys,
  mockVisibilityDataStandard,
  mockVisibilityDataNothing,
} from '../../common/services/visibility/mocks';
import { mockChecklist, mockCompletedTasks } from '../../common/mocks';

const stateWithActiveTab = (activeTab: ChecklistTabKey): Checklist => ({
  ...mockChecklist,
  activeTab,
});

describe('ChecklistSection', () => {
  const onUserActivityMock = jest.fn();
  const onCloseMock = jest.fn();
  const onBackMock = jest.fn();

  const mountChecklistSection = (
    state: Checklist,
    visibilityData: VisibilityData = mockVisibilityDataAllKeys,
  ) => {
    const gspState = {
      ...mockGspState,
      properties: {
        ...mockGspState.properties,
        user: {
          ...mockGspState.properties.user,
          ...visibilityData.user,
        },
        workspace: visibilityData.workspace,
      },
    };
    return mount(
      <IntlProvider locale="en">
        <VisibilityContainer
          gspState={gspState}
          opsgenieBaseUrl={mockOpsgenieBaseUrl}
          serviceDeskBaseUrl={mockServiceDeskBaseUrl}
        >
          <ChecklistSection
            state={state}
            completedItems={mockCompletedTasks}
            onUserActivity={onUserActivityMock}
            onClose={onCloseMock}
            onBack={onBackMock}
          />
        </VisibilityContainer>
      </IntlProvider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [ChecklistTabKey.Basics, BasicsTabContainer],
    [ChecklistTabKey.Changes, ChangesTabContainer],
    [ChecklistTabKey.Incidents, IncidentsTabContainer],
  ])(
    'should render the header card and appropriate tab container when %s tab is active',
    (tabKey, tabComponent) => {
      const wrapper = mountChecklistSection(stateWithActiveTab(tabKey));
      expect(wrapper.find(HeaderCard)).toHaveLength(1);
      expect(wrapper.find(tabComponent)).toHaveLength(1);
    },
  );

  it.each([
    [ChecklistTabKey.Basics, ChecklistTabKey.Changes],
    [ChecklistTabKey.Basics, ChecklistTabKey.Incidents],
    [ChecklistTabKey.Changes, ChecklistTabKey.Basics],
    [ChecklistTabKey.Changes, ChecklistTabKey.Incidents],
    [ChecklistTabKey.Incidents, ChecklistTabKey.Basics],
    [ChecklistTabKey.Incidents, ChecklistTabKey.Changes],
    [ChecklistTabKey.Basics, ChecklistTabKey.Basics],
    [ChecklistTabKey.Changes, ChecklistTabKey.Changes],
    [ChecklistTabKey.Incidents, ChecklistTabKey.Incidents],
  ])(
    'should update state activeTab from %s to %s in onTabSelected callback',
    (currentTab, newTab) => {
      const state = stateWithActiveTab(currentTab);
      mountChecklistSection(state)
        .find(HeaderCard)
        .props()
        .onTabSelected(newTab);

      expect(onUserActivityMock).toBeCalledTimes(1);
      expect(onUserActivityMock).toBeCalledWith({
        ...state,
        activeTab: newTab,
      });
    },
  );

  it.each([
    [HeaderState.Expanded, HeaderState.Minimized],
    [HeaderState.Minimized, HeaderState.Expanded],
    [HeaderState.Minimized, HeaderState.Minimized],
    [HeaderState.Expanded, HeaderState.Expanded],
  ])(
    'should update state headerState from %s to %s in onHeaderStateChanged callback',
    (currentHeaderState, newHeaderState) => {
      const state: Checklist = {
        ...mockChecklist,
        headerState: currentHeaderState,
      };
      mountChecklistSection(state)
        .find(HeaderCard)
        .props()
        .onHeaderStateChanged(newHeaderState);

      expect(onUserActivityMock).toBeCalledTimes(1);
      expect(onUserActivityMock).toBeCalledWith({
        ...state,
        headerState: newHeaderState,
      });
    },
  );

  it.each([
    [TaskId.AddChangeApprovers, TaskId.ConnectCiCdPipeline],
    [TaskId.TurnOnAutomationRules, undefined],
    [undefined, TaskId.MakeTheMostOfChangeManagement],
  ])(
    'should update state active task from %s to %s in onTaskExpand callback',
    (currentTask, newTask) => {
      const state: Checklist = {
        ...mockChecklist,
        activeTab: ChecklistTabKey.Changes,
        tabs: {
          ...mockChecklist.tabs,
          changes: {
            activeTask: currentTask,
          },
        },
      };
      mountChecklistSection(state)
        .find(ChangesTabContainer)
        .props()
        .onTaskExpand(newTask);

      expect(onUserActivityMock).toBeCalledTimes(1);
      expect(onUserActivityMock).toBeCalledWith({
        ...state,
        tabs: {
          ...state.tabs,
          changes: {
            ...state.tabs.changes,
            activeTask: newTask,
          },
        },
      });
    },
  );

  it('should call onClose callback prop for header card onClose callback', () => {
    const wrapper = mountChecklistSection(
      stateWithActiveTab(ChecklistTabKey.Changes),
    );
    wrapper.find(HeaderCard).props().onClose();

    expect(onCloseMock).toBeCalledTimes(1);
  });

  it('should call onBack callback prop for header card onBack callback', () => {
    const wrapper = mountChecklistSection(
      stateWithActiveTab(ChecklistTabKey.Changes),
    );
    wrapper.find(HeaderCard).props().onBack();

    expect(onBackMock).toBeCalledTimes(1);
  });

  it('shows Basics items when no permissions to view Incidents items', () => {
    const wrapper = mountChecklistSection(
      stateWithActiveTab(ChecklistTabKey.Incidents),
      mockVisibilityDataStandard,
    );
    const headerCard = wrapper.find(HeaderCard);
    const tabData = headerCard.find(TabData);

    expect(headerCard).toHaveLength(1);
    expect(tabData).toHaveLength(2);
    expect(tabData.at(0).props().tabKey).toBe(ChecklistTabKey.Basics);
    expect(tabData.at(1).props().tabKey).toBe(ChecklistTabKey.Changes);
    expect(wrapper.find(BasicsTabContainer)).toHaveLength(1);
    expect(wrapper.find(ChangesTabContainer)).toHaveLength(0);
    expect(wrapper.find(IncidentsTabContainer)).toHaveLength(0);
  });

  it('shows nothing when no permissions', () => {
    const wrapper = mountChecklistSection(
      stateWithActiveTab(ChecklistTabKey.Incidents),
      mockVisibilityDataNothing,
    );
    expect(wrapper.find(HeaderCard)).toHaveLength(0);
    expect(wrapper.find(BasicsTabContainer)).toHaveLength(0);
    expect(wrapper.find(ChangesTabContainer)).toHaveLength(0);
    expect(wrapper.find(IncidentsTabContainer)).toHaveLength(0);
  });
});
