import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import { ProductKeys } from '../src/lib/types';

import CrossFlowIntegration, { CrossFlowOriginProduct } from '../src';

const SomeHostExample = () => {
  return (
    <CrossFlowIntegration
      src="iframe.html?id=crossflowspa--site-scoped"
      locale="en_US"
      sourceComponent="atlassian-switcher"
      sourceContext="discover-more"
      targetProduct={ProductKeys.CONFLUENCE}
      originProduct={CrossFlowOriginProduct.TRELLO}
      onAnalyticsEvent={(e) => console.log('Analytic event:', e)}
      onError={(...e) => console.log('An error happened:', e)}
    />
  );
};

storiesOf('CrossFlowReact', module).add('Default', () => <SomeHostExample />);
