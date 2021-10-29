import React from 'react';

import {
  EditableShippingDetailsPanel,
  EmptyShipToDetailsPanel,
  FullShipToDetailsPanel,
  MinimalShipToDetailsPanel,
} from '../src/ui/ship-to-details-panel/examples';

export const Example = () => (
  <div data-testid="examples">
    <FullShipToDetailsPanel />
    <MinimalShipToDetailsPanel />
    <EmptyShipToDetailsPanel />
    <EditableShippingDetailsPanel />
  </div>
);

export default Example;
