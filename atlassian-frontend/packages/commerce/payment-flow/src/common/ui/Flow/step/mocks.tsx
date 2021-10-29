import React from 'react';

import { TaskLayout } from '@atlassian/commerce-layout';

import { FlowControlButtons } from '../flow-control-buttons';

import { FlowStep, FlowStepComponent } from './index';

type Step1Out = { step1Data: boolean };
type Step2In = { step1Data: boolean };
type Step2Out = { step2Data: string };

const Step1: FlowStepComponent<{}, Step1Out> = ({ flowControl }) => (
  <TaskLayout
    testId="step1"
    title="Step 1"
    actions={
      <FlowControlButtons
        flowControl={flowControl}
        loading={false}
        failed={false}
        onNext={({ moveForward }) => {
          moveForward({ step1Data: true });
        }}
        entityName="SomethingThatDescribesWhatEditingOrAdding"
      />
    }
  >
    <div>step 1 body</div>
  </TaskLayout>
);

export const testStep1: FlowStep<{}, Step1Out> = {
  caption: 'step-1-caption',
  component: Step1,
};

const Step2: FlowStepComponent<Step2In, Step2Out> = ({
  flowControl,
  flowState: { step1Data },
}) => (
  <TaskLayout
    title="Step 2"
    testId="step2"
    actions={
      <FlowControlButtons
        flowControl={flowControl}
        loading={false}
        failed={false}
        onNext={({ moveForward }) => {
          moveForward({ step2Data: '42' });
        }}
        entityName="SomethingThatDescribesWhatEditingOrAdding"
      />
    }
  >
    <div>{step1Data ? 'step-2-body' : 'not-working'}</div>
  </TaskLayout>
);

export const testStep2: FlowStep<Step2In, Step2Out> = {
  caption: 'step-2-caption',
  component: Step2,
};
