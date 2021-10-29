import React from 'react';

import {
  EmptyShipToDetailsInline,
  FullShipToDetailsInline,
  MinimalShipToDetailsInline,
} from '../src/ui/ship-to-details-panel/examples';

export const Example = () => (
  <div data-testid="examples">
    <FullShipToDetailsInline />
    <MinimalShipToDetailsInline />
    <EmptyShipToDetailsInline />
  </div>
);

export default Example;
