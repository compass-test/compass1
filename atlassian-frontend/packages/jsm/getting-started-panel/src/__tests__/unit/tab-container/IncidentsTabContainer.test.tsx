import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { IncidentsTabContainer } from '../../../ui/checklist-section/tab-container';
import { ChecklistItem, AccordionItem } from '@atlassiansox/checklist';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../../../common/mocks';
import { IncidentsTaskIds, TaskId } from '../../../common/types';
import { VisibilityContainer } from '../../../common/services/visibility';

describe('<IncidentsTabContainer />', () => {
  const onTaskExpandMock = jest.fn();

  const mountIncidentsTabContainer = (activeTask: TaskId | undefined) => {
    return mount(
      <IntlProvider locale="en">
        <VisibilityContainer
          gspState={mockGspState}
          serviceDeskBaseUrl={mockServiceDeskBaseUrl}
          opsgenieBaseUrl={mockOpsgenieBaseUrl}
        >
          <IncidentsTabContainer
            activeTask={activeTask}
            completedTasks={[]}
            onTaskExpand={onTaskExpandMock}
          />
        </VisibilityContainer>
      </IntlProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the correct number of Incidents tasks', () => {
    const wrapper = mountIncidentsTabContainer(undefined);
    expect(wrapper.find(ChecklistItem)).toHaveLength(IncidentsTaskIds.length);
  });

  it('should expand the single active task', () => {
    const activeTask = TaskId.SetupProfileForNotifications;
    const wrapper = mountIncidentsTabContainer(activeTask);

    const itemProps = wrapper.find(AccordionItem).map((item) => item.props());
    const expandedItems = itemProps.filter((props) => props.expanded);

    expect(expandedItems).toHaveLength(1);
    expect(expandedItems[0].id).toEqual(activeTask);
  });

  it('should have no expanded tasks when active task is undefined', () => {
    const wrapper = mountIncidentsTabContainer(undefined);

    const itemProps = wrapper.find(AccordionItem).map((item) => item.props());
    const expandedItems = itemProps.filter((props) => props.expanded);

    expect(expandedItems).toHaveLength(0);
  });

  it('should call `onTaskExpand` with the TaskId of the task when clicked to expand', () => {
    const wrapper = mountIncidentsTabContainer(undefined);

    wrapper.find(AccordionItem).forEach((item) => {
      item.simulate('click');
      expect(onTaskExpandMock).toBeCalledWith(item.props().id);
    });
  });

  it('should call `onTaskExpand` with undefined when active task is clicked to collapse', () => {
    const activeTask = TaskId.SetupProfileForNotifications;

    const wrapper = mountIncidentsTabContainer(activeTask);
    wrapper
      .find(AccordionItem)
      .filterWhere((item) => item.props().id === activeTask)
      .simulate('click');
    expect(onTaskExpandMock).toBeCalledWith(undefined);
  });
});
