import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import fetchMock from 'fetch-mock/cjs/client';

import { OriginProduct, ProductKeys } from '../../common/constants';
import { mockBuxApi } from '../../common/mocks/BUXMocks';
import {
  actionAndConsoleAnalyticsClient,
  withAdminHubActionAndConsoleAnalytics,
} from '../../common/utils/storybook-utils/analytics';
import { ModernizedPlanSelectionProps } from '../../types';

import { featureToImageMap } from './constants';

import {
  ModernizedPlanSelectionImagePreloader,
  ModernizedPlanSelectionModal,
} from './index';

storiesOf('ModernizedPlanSelectionModal/Modal', module)
  .addDecorator(withKnobs)
  .addDecorator(withAdminHubActionAndConsoleAnalytics)
  .add('Main Entry Point - Both Free Edition)', () => {
    fetchMock.restore();
    mockBuxApi();
    let useSub = ((): ModernizedPlanSelectionProps => {
      //Normally featureToImageMap is used to match the correct header image to the modal based on the feature prop. Here it's simply being used to provide an array of all features.
      const features = Object.keys(featureToImageMap).sort();
      let feature = select('Select a feature', [...features], 'backlog');
      return { featureModal: feature, product: ProductKeys.CONFLUENCE };
    })();
    return (
      <div>
        <ModernizedPlanSelectionImagePreloader />
        <ModernizedPlanSelectionModal
          {...useSub}
          analyticsPlatformClient={actionAndConsoleAnalyticsClient}
          analyticsOriginProduct={OriginProduct.CONFLUENCE}
          onCloseHandler={() => {}}
        />
      </div>
    );
  });

export default {
  title: 'Modernized Plan Selection Modal Designer Tool',
  decorators: [withKnobs, withAdminHubActionAndConsoleAnalytics],
};
