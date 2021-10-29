import React, { useState } from 'react';
import { BasicsTabContainer } from '../src/ui/checklist-section/tab-container';
import { IntlProvider } from 'react-intl';
import { mockGspState } from '../src/common/mocks';
import { TaskId } from '../src/common/types';
import { VisibilityContainer } from '../src/common/services/visibility';
import { N30 } from '@atlaskit/theme/colors';

const Example = () => {
  const [activeTask, setActiveTask] = useState<TaskId | undefined>(undefined);
  const [completedTasks, setCompletedTasks] = useState<TaskId[]>([]);
  const onTaskExpand = (id: TaskId | undefined) => {
    setActiveTask(id);
    // For testing, mark tasks as complete when they're expanded
    if (id && !completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.concat([id]));
    }
  };

  const sampleTab = {
    activeTask: activeTask,
    completedTasks: completedTasks,
    onTaskExpand: onTaskExpand,
  };

  return (
    <IntlProvider locale="en">
      <VisibilityContainer gspState={mockGspState}>
        <div style={{ width: '320px', backgroundColor: N30 }}>
          <BasicsTabContainer {...sampleTab} />
        </div>
      </VisibilityContainer>
    </IntlProvider>
  );
};

export default Example;
