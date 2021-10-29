import React from 'react';

import styled from '@emotion/styled';

import { easeOut, mediumDurationMs, SlideIn } from '@atlaskit/motion';

import { FlowDirection } from '../../controllers/use-flow-control/types';

export const TransitionLayout: React.FC<{
  direction?: FlowDirection;
  step: number;
}> = ({ children, step, direction }) => {
  const movementDuration = direction === null ? 0 : mediumDurationMs;

  return (
    <SlideIn
      key={step}
      fade="in"
      animationTimingFunction={(_) => easeOut}
      enterFrom={direction || 'right'}
      duration={movementDuration}
    >
      {(animationProps) => <div {...animationProps}>{children}</div>}
    </SlideIn>
  );
};

export const Centered = styled.div`
  display: flex;
  position: absolute;
  width: 100%
  top: 30%;
  justify-content: center;
`;
