import React from 'react';
import { action } from '@storybook/addon-actions';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl';
import {
  mockGspState,
  mockOpsgenieBaseUrl,
  mockServiceDeskBaseUrl,
} from '../src/common/mocks';
import { VisibilityContainer } from '../src/common/services/visibility';
import HomeSection from '../src/ui/home-section';

const Example = () => {
  return (
    <AnalyticsListener onEvent={action('Analytics')}>
      <IntlProvider locale="en">
        <VisibilityContainer
          gspState={mockGspState}
          serviceDeskBaseUrl={mockServiceDeskBaseUrl}
          opsgenieBaseUrl={mockOpsgenieBaseUrl}
        >
          <div style={{ height: '800px', width: '320px' }}>
            <HomeSection
              onSectionChange={action('set active section')}
              onClose={action('close')}
            />
          </div>
        </VisibilityContainer>
      </IntlProvider>
    </AnalyticsListener>
  );
};

export default Example;
