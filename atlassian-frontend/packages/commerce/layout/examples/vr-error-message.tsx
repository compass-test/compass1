import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  DefaultErrorMessage,
  ErrorMessageWithCustomActions,
  MinimalErrorMessage,
} from '../src/ui/error-message/examples';

const Example = () => (
  <VrExample>
    <MinimalErrorMessage />
    <DefaultErrorMessage />
    <ErrorMessageWithCustomActions />
  </VrExample>
);
export default Example;
