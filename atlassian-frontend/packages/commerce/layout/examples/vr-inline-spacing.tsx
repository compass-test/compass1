import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  InlineLayoutExample,
  InlineStandAloneExample,
} from '../src/common/ui/spacing/inline/examples';

const Example = () => (
  <VrExample>
    <InlineStandAloneExample />
    <InlineLayoutExample />
  </VrExample>
);
export default Example;
