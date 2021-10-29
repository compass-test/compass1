import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  InsetExample,
  InsetModeExample,
} from '../src/common/ui/spacing/inset/examples';

const Example = () => (
  <VrExample>
    <InsetExample />
    <InsetModeExample />
  </VrExample>
);
export default Example;
