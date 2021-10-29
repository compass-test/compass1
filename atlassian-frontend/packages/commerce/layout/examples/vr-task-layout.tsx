import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  MinimalTaskLayout,
  NarrowTaskLayout,
  TaskLayoutWithActionError,
  TaskLayoutWithBothErrors,
  TaskLayoutWithContent,
  TaskLayoutWithGenericError,
} from '../src/ui/task-layout/examples';

const Example = () => (
  <VrExample>
    <MinimalTaskLayout />
    <TaskLayoutWithContent />
    <NarrowTaskLayout />
    <TaskLayoutWithActionError />
    <TaskLayoutWithBothErrors />
    <TaskLayoutWithGenericError />
  </VrExample>
);
export default Example;
