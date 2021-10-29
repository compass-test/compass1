import styled, { keyframes } from 'styled-components';
import { TooltipPrimitive } from '@atlaskit/tooltip';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const SpotlightContainer = styled('div')`
  animation: 0.2s ${fadeIn} ease-out;
  animation-iteration-count: 1;
`;

export const NudgeSpotlightPrimitive: any = styled(TooltipPrimitive)`
  pointer-events: all;
  padding: 0.5rem;
`;
