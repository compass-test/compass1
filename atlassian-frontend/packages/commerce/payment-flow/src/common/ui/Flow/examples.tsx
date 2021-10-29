import React from 'react';

import { TestFlow } from './mocks';
import { testStep1, testStep2 } from './step/mocks';

import { defineFlow, FlowProps } from './index';

export const TwoStepFlow: React.FC<Partial<Pick<FlowProps, 'onComplete'>>> = ({
  onComplete,
}) => (
  <TestFlow
    definition={defineFlow({}, testStep1, testStep2)}
    onComplete={onComplete}
  />
);

export const OneStepFlow: React.FC = () => (
  <TestFlow definition={defineFlow({}, testStep1)} />
);

export const CancelableFlow: React.FC = () => (
  <TestFlow
    definition={defineFlow({}, testStep1, testStep2)}
    onCancel={() => alert('Flow canceled')}
  />
);
