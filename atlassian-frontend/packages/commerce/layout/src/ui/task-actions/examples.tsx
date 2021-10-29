import React from 'react';

import { TaskAction, TaskCancelAction, TaskPrimaryAction } from './index';

const onClick = () => alert('clicked');

export const DefaultPrimaryAction = () => (
  <TaskPrimaryAction
    onClick={onClick}
    loading={false}
    failed={false}
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const LoadingPrimaryAction = () => (
  <TaskPrimaryAction
    onClick={onClick}
    loading={true}
    failed={false}
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const FailedPrimaryAction = () => (
  <TaskPrimaryAction
    onClick={onClick}
    loading={false}
    failed={true}
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const DisabledPrimaryAction = () => (
  <TaskPrimaryAction
    onClick={onClick}
    loading={false}
    failed={false}
    disabled={true}
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const CustomLabelPrimaryAction = () => (
  <TaskPrimaryAction
    onClick={onClick}
    loading={false}
    failed={false}
    label="Next"
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const DefaultCancelAction = () => (
  <TaskCancelAction
    onCancel={onClick}
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
  />
);

export const CustomTaskAction = () => (
  <TaskAction
    label="Customize"
    actionSubjectId="See https://hello.atlassian.net/wiki/spaces/MEASURE/pages/134329336/UI+Events to decide what this field should be"
    onClick={onClick}
  />
);
