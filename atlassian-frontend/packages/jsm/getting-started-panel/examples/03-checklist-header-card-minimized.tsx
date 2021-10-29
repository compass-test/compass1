import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { action } from '@storybook/addon-actions';
import HeaderCard from '../src/ui/checklist-section/header-card';
import { ChecklistTabKey, HeaderState, TaskId } from '../src/common/types';
import {
  mockGspState,
  useMockCompletedTasks,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../src/common/mocks';
import { VisibilityContainer } from '../src/common/services/visibility';

export default function HeaderCardMinimized() {
  const [activeTab, setActiveTab] = useState(ChecklistTabKey.Basics);
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
          checklist={{
            activeTab,
            headerState: HeaderState.Minimized,
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
          }}
          completedItems={completedTasks}
          onTabSelected={setActiveTab}
          onHeaderStateChanged={action('headerStateChanged')}
          onClose={action('close')}
          onBack={action('back')}
        />
      </VisibilityContainer>
    </IntlProvider>
  );
}
