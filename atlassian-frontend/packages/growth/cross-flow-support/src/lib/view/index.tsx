import React from 'react';

import DrawerComponent from '@atlaskit/drawer';
import ProductStoreComponent from '@atlassiansox/product-store-react';
import CrossFlowIntegration from '@atlassiansox/cross-flow-react';

import { IntegrationViewProps } from './types';
import { IntegrationView } from './view';

export default (props: IntegrationViewProps) => (
  <IntegrationView
    {...props}
    DrawerComponent={DrawerComponent}
    ProductStoreComponent={ProductStoreComponent}
    CrossFlowComponent={CrossFlowIntegration}
  />
);
