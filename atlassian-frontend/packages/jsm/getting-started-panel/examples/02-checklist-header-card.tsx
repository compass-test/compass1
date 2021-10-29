import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { action } from '@storybook/addon-actions';
import HeaderCard from '../src/ui/checklist-section/header-card';
import {
  Checklist,
  ChecklistTabKey,
  HeaderState,
  TaskId,
} from '../src/common/types';
import {
  mockGspState,
  useMockCompletedTasks,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../src/common/mocks';
import { VisibilityContainer } from '../src/common/services/visibility';

const sampleData = (
  activeTab: ChecklistTabKey,
  headerState: HeaderState,
): Checklist => ({
  activeTab,
  headerState,
  tabs: {
    basics: {
      activeTask: TaskId.CreateItsmProject,
    },
    incidents: {
      activeTask: TaskId.AddPortalLogo,
    },
    changes: {
      activeTask: TaskId.GoBeyondBasics,
    },
  },
});

const Example = () => {
  const [activeTab, setActiveTab] = useState(ChecklistTabKey.Basics);
  const [headerState, setHeaderState] = useState(HeaderState.Expanded);
  const [{ completedTasks }, { more, less }] = useMockCompletedTasks(3);

  return (
    <IntlProvider locale="en">
      <VisibilityContainer
        gspState={mockGspState}
        serviceDeskBaseUrl={mockServiceDeskBaseUrl}
        opsgenieBaseUrl={mockOpsgenieBaseUrl}
      >
        <div style={{ paddingBottom: '8px' }}>
          <button onClick={less}>Less tasks</button>
          <button onClick={more}>More tasks</button>
        </div>
        <HeaderCard
          checklist={sampleData(activeTab, headerState)}
          completedItems={completedTasks}
          onTabSelected={setActiveTab}
          onHeaderStateChanged={setHeaderState}
          onClose={action('close')}
          onBack={action('back')}
        />
      </VisibilityContainer>
    </IntlProvider>
  );
};

export default Example;
