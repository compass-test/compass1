import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl';
import { ChecklistSection } from '../src/ui/checklist-section';
import {
  mockChecklist,
  mockGspState,
  useMockCompletedTasks,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../src/common/mocks';
import { VisibilityContainer } from '../src/common/services/visibility';

const Example = () => {
  const [checklistState, setChecklistState] = useState(mockChecklist);
  const [{ completedTasks }, { more, less }] = useMockCompletedTasks(3);
  return (
    <AnalyticsListener onEvent={action('Analytics')}>
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
          <div style={{ height: '800px', width: '320px' }}>
            <ChecklistSection
              state={checklistState}
              completedItems={completedTasks}
              onUserActivity={setChecklistState}
              onClose={action('close')}
              onBack={action('back')}
            />
          </div>
        </VisibilityContainer>
      </IntlProvider>
    </AnalyticsListener>
  );
};

export default Example;
