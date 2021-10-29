import React, { ComponentType } from 'react';
import { action } from '@storybook/addon-actions';

import Drawer from '@atlaskit/drawer';
import { OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import ProductStoreIntegration from '@atlassiansox/product-store-react';
import CrossFlowIntegration from '@atlassiansox/cross-flow-react';

import { toCrossFlowTarget } from '../lib/view/utils/toCrossFlowTarget';
import { IntegrationViewProps } from '../lib/view/types';
import { IntegrationView } from '../lib/view/view';
import { createCrossFlowProvider } from '../lib/CrossFlowProvider';

const ProductStoreMock: typeof ProductStoreIntegration = (props) => (
  <div style={{ paddingLeft: 64, background: 'lavender', height: '100%' }}>
    <h1>I am Product Store</h1>
    <pre>{JSON.stringify(props, null, '  ')}</pre>
    <hr />
    <button
      onClick={() => {
        const targetProduct = toCrossFlowTarget('confluence.ondemand');
        action('onTryClicked')(targetProduct);
        props.onTryClicked(targetProduct);
      }}
    >
      Try Confluence
    </button>
    <hr />
    <button
      onClick={() => {
        const targetProduct = toCrossFlowTarget('jira-software.ondemand');
        action('onTryClicked')(targetProduct);
        props.onTryClicked(targetProduct);
      }}
    >
      Try Jira Software
    </button>
  </div>
);

const CrossFlowMock: typeof CrossFlowIntegration = (props) => {
  return (
    <div style={{ paddingLeft: 64, background: 'palegreen', height: '100%' }}>
      <h1>I am Cross Flow</h1>
      <h2>
        Successfully activated <code>{props.targetProduct}</code>
      </h2>
      <pre>{JSON.stringify(props, null, '  ')}</pre>
      <hr />
      <button onClick={props.onClose}>Close</button>
      <hr />
      <button
        onClick={() => {
          props.onAnalyticsEvent!({
            payload: {
              eventType: OPERATIONAL_EVENT_TYPE,
              action: 'fired',
              actionSubject: 'event',
            },
            context: [{ source: 'someSource' }],
          });
        }}
      >
        Fire analytics event
      </button>
    </div>
  );
};

const IntegrationViewMock: ComponentType<IntegrationViewProps> = (props) => {
  return (
    <IntegrationView
      {...props}
      DrawerComponent={Drawer}
      ProductStoreComponent={ProductStoreMock}
      CrossFlowComponent={CrossFlowMock}
    />
  );
};

export const CrossFlowProvider = createCrossFlowProvider(IntegrationViewMock);
