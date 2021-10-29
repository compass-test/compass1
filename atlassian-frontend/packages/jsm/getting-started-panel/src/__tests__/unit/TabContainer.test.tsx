import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import {
  fireUIAnalytics,
  ANALYTICS_BRIDGE_CHANNEL,
} from '@atlassian/analytics-bridge';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { ChecklistItem, AccordionItem } from '@atlassiansox/checklist';
import { mockGspState } from '../../common/mocks';
import {
  BasicsTaskIds,
  ChangesTaskIds,
  IncidentsTaskIds,
  TaskId,
} from '../../common/types';
import { VisibilityContainer } from '../../common/services/visibility';
import {
  castStringToTaskId,
  getTaskItem,
  createTabContainer,
} from '../../ui/checklist-section/tab-container/main';
import { FormattedMessage } from 'react-intl';

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireUIAnalytics: jest.fn(),
}));

const mockFormatMessage = (
  messageDescriptor: FormattedMessage.MessageDescriptor,
) => messageDescriptor.defaultMessage || '';

describe('castStringToTaskId', () => {
  it('should correctly handle a valid task ID', () => {
    const result = castStringToTaskId(`${TaskId.GoBeyondBasics}`);
    expect(result).toEqual(TaskId.GoBeyondBasics);
  });

  it('should return undefined for an invalid task ID', () => {
    const result = castStringToTaskId('not-a-task-id');
    expect(result).toEqual(undefined);
  });

  it('should return undefined for an empty string (used when the user collapses an item card)', () => {
    const result = castStringToTaskId('');
    expect(result).toEqual(undefined);
  });
});

describe('getTaskItem', () => {
  it.each(Object.values(TaskId))(
    'should return a suitable task item for %p',
    (taskId) => {
      const result = getTaskItem(taskId, [], mockFormatMessage);
      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          children: expect.anything(),
          completed: false,
        }),
      );
    },
  );

  it('should return a task as completed if it appears in completedItems array', () => {
    const completedItems = [
      TaskId.ConnectCiCdPipeline,
      TaskId.SetupProfileForNotifications,
    ];
    const pipelineTask = getTaskItem(
      TaskId.ConnectCiCdPipeline,
      completedItems,
      mockFormatMessage,
    );
    const profileTask = getTaskItem(
      TaskId.SetupProfileForNotifications,
      completedItems,
      mockFormatMessage,
    );
    const otherTask = getTaskItem(
      TaskId.GoBeyondBasics,
      completedItems,
      mockFormatMessage,
    );
    expect(pipelineTask.completed).toEqual(true);
    expect(profileTask.completed).toEqual(true);
    expect(otherTask.completed).toEqual(false);
  });
});

describe('createTabContainer', () => {
  const onTaskExpandMock = jest.fn();
  // Needed to test for screen analytics events
  const onAnalyticsEvent = jest.fn();

  const mountTabContainer = (
    allTasks: TaskId[],
    activeTask: TaskId | undefined,
  ) => {
    const mockDescription = <>What a wonderful description</>;
    const TabContainer = createTabContainer(
      'usefulTabContainer',
      allTasks,
      mockDescription,
    );
    return mount(
      <IntlProvider locale="en">
        <AnalyticsListener
          channel={ANALYTICS_BRIDGE_CHANNEL}
          onEvent={onAnalyticsEvent}
        >
          <VisibilityContainer gspState={mockGspState}>
            <TabContainer
              activeTask={activeTask}
              completedTasks={[]}
              onTaskExpand={onTaskExpandMock}
            />
          </VisibilityContainer>
        </AnalyticsListener>
      </IntlProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    [BasicsTaskIds, BasicsTaskIds.length],
    [ChangesTaskIds, ChangesTaskIds.length],
    [IncidentsTaskIds, IncidentsTaskIds.length],
  ])('should render the correct number of tasks', (tasks, length) => {
    const wrapper = mountTabContainer(tasks, undefined);
    expect(wrapper.find(ChecklistItem)).toHaveLength(length);
  });

  it('should expand the single active task', () => {
    const activeTask = TaskId.CustomizePortal;
    const wrapper = mountTabContainer(BasicsTaskIds, activeTask);

    const itemProps = wrapper.find(AccordionItem).map((item) => item.props());
    const expandedItems = itemProps.filter((props) => props.expanded);

    expect(expandedItems).toHaveLength(1);
    expect(expandedItems[0].id).toEqual(activeTask);
  });

  it('should have no expanded tasks when active task is undefined', () => {
    const wrapper = mountTabContainer(BasicsTaskIds, undefined);

    const itemProps = wrapper.find(AccordionItem).map((item) => item.props());
    const expandedItems = itemProps.filter((props) => props.expanded);

    expect(expandedItems).toHaveLength(0);
  });

  it('should call `onTaskExpand` with the TaskId of the task when clicked to expand', () => {
    const wrapper = mountTabContainer(BasicsTaskIds, undefined);

    wrapper.find(AccordionItem).forEach((item) => {
      item.simulate('click');
      expect(onTaskExpandMock).toBeCalledWith(item.props().id);
    });
  });

  it('should call `onTaskExpand` with undefined when active task is clicked to collapse', () => {
    const activeTask = TaskId.CustomizePortal;
    const wrapper = mountTabContainer(BasicsTaskIds, activeTask);

    wrapper
      .find(AccordionItem)
      .filterWhere((item) => item.props().id === activeTask)
      .simulate('click');
    expect(onTaskExpandMock).toBeCalledWith(undefined);
  });

  it('should fire UI analytics event with task ID when task clicked to expand', () => {
    const wrapper = mountTabContainer(BasicsTaskIds, undefined);

    wrapper.find(AccordionItem).forEach((item) => {
      jest.clearAllMocks();
      item.simulate('click');
      expect(fireUIAnalytics).toHaveBeenCalledTimes(1);
      expect(fireUIAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'expanded',
            actionSubject: 'task',
          }),
        }),
        'jsmGettingStartedPanelChecklistTask',
        {
          taskId: item.props().id,
        },
      );
    });
  });

  it('should not fire UI analytics event when active task is clicked to collapse', () => {
    const activeTask = TaskId.CustomizePortal;
    const wrapper = mountTabContainer(BasicsTaskIds, activeTask);

    wrapper
      .find(AccordionItem)
      .filterWhere((item) => item.props().id === activeTask)
      .simulate('click');
    expect(fireUIAnalytics).not.toHaveBeenCalled();
  });

  it.each([undefined, TaskId.CustomizePortal])(
    'should fire screen analytics event when mounted with %s active task',
    (activeTask) => {
      expect(onAnalyticsEvent).toHaveBeenCalledTimes(0);

      mountTabContainer(BasicsTaskIds, activeTask);

      expect(onAnalyticsEvent).toHaveBeenCalledTimes(1);
      expect(onAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          context: [{ source: 'usefulTabContainerScreen' }],
          payload: expect.objectContaining({
            action: 'viewed',
            actionSubject: 'screen',
            analyticsType: 'SCREEN',
          }),
        }),
        ANALYTICS_BRIDGE_CHANNEL,
      );
    },
  );
});
