// Disabled the rule as packages don't depends on each other
// but will often be used together which is nice to reflect in examples
/* eslint-disable @atlassian/tangerine/import/no-parent-imports */
import React from 'react';

import { ButtonGroup } from '@atlaskit/button';

import {
  ErrorMessageWithCustomActions,
  MinimalErrorMessage,
} from '../error-message/examples';
import { NarrowLayout } from '../narrow-layout';
import {
  DefaultCancelAction,
  DefaultPrimaryAction,
} from '../task-actions/examples';

import { TaskH2, TaskLayout, TaskSection } from './index';

const actionButtons = (
  <>
    <ButtonGroup>
      <DefaultCancelAction />
      <DefaultPrimaryAction />
    </ButtonGroup>
  </>
);

export const MinimalTaskLayout = () => (
  <TaskLayout title="Minimal task layout" actions={actionButtons}>
    Some content
  </TaskLayout>
);

export const TaskLayoutWithContent = () => (
  <TaskLayout title="Minimal task layout" actions={actionButtons}>
    <TaskSection>
      <TaskH2>Sub section1</TaskH2>
      <p>Some content</p>
    </TaskSection>
    <TaskSection>
      <TaskH2>Sub section2</TaskH2>
      <p>Some extra content</p>
    </TaskSection>
  </TaskLayout>
);

export const NarrowTaskLayout = () => (
  <NarrowLayout>
    <TaskLayoutWithContent />
  </NarrowLayout>
);

export const TaskLayoutWithGenericError = () => (
  <TaskLayout
    title="Task layout with generic error"
    genericError={<MinimalErrorMessage />}
    actions={actionButtons}
  >
    Some content
  </TaskLayout>
);

export const TaskLayoutWithActionError = () => (
  <TaskLayout
    title="Task layout with action error"
    actionError={<ErrorMessageWithCustomActions />}
    actions={actionButtons}
  >
    Some content
  </TaskLayout>
);

export const TaskLayoutWithBothErrors = () => {
  return (
    <TaskLayout
      title="Task layout with bot error"
      genericError={<MinimalErrorMessage />}
      actionError={<ErrorMessageWithCustomActions />}
      actions={actionButtons}
    >
      Some content
    </TaskLayout>
  );
};
