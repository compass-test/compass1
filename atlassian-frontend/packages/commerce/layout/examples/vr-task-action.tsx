import React from 'react';

import { VrExample } from '@atlassian/commerce-test-library/vr';

import {
  CustomLabelPrimaryAction,
  CustomTaskAction,
  DefaultCancelAction,
  DefaultPrimaryAction,
  DisabledPrimaryAction,
  FailedPrimaryAction,
  LoadingPrimaryAction,
} from '../src/ui/task-actions/examples';

const Example = () => (
  <VrExample>
    <CustomLabelPrimaryAction />
    <CustomTaskAction />
    <DefaultCancelAction />
    <DefaultPrimaryAction />
    <DisabledPrimaryAction />
    <FailedPrimaryAction />
    <LoadingPrimaryAction />
  </VrExample>
);
export default Example;
