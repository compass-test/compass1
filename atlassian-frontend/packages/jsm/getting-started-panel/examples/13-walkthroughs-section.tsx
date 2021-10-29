import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { IntlProvider } from 'react-intl';
import WalkthroughsSection from '../src/ui/walkthroughs-section';
import { mockProductTours } from '../src/common/mocks';

const Example = () => {
  const [productTours, setProductTours] = useState(mockProductTours);
  return (
    <AnalyticsListener onEvent={action('Analytics')}>
      <IntlProvider locale="en">
        <div style={{ height: '800px', width: '320px' }}>
          <WalkthroughsSection
            state={productTours}
            onBack={action('back')}
            onClose={action('close')}
            onUserActivity={setProductTours}
          />
        </div>
      </IntlProvider>
    </AnalyticsListener>
  );
};

export default Example;
