import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  NestedStacklayoutExample,
  StackContainerExample,
  StackStandAloneExample,
} from '../src/common/ui/spacing/stack/examples';

const Example = () => (
  <VrExample>
    <StackContainerExample />
    <NestedStacklayoutExample />
    <StackStandAloneExample />
  </VrExample>
);
export default Example;
