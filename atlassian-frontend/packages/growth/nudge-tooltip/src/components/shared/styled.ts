import styled, { css, keyframes } from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { borderRadius, colors } from '@atlaskit/theme';

const baseShadow = '0 0 0 3px';
const basePulseColor = colors.P75;
const basePulseShadowColor = 'rgba(101, 84, 192, 1)';
const easing = 'cubic-bezier(0.55, 0.055, 0.675, 0.19)';

const pulseKeyframes = keyframes`
   0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframes} 3000ms ${easing} infinite;
`;

const pseudoStyle = css`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
interface NudgeTooltipPulseType {
  hasPulse: boolean;
  pulseColor?: string;
  pulseShadowColor?: string;
  pulseBorderRadius?: number;
}

export const NudgeTooltipPulse = styled.span<NudgeTooltipPulseType>`
  display: block;
  > * {
    position: relative;

    &::before {
      ${pseudoStyle}
      border-radius: ${({ pulseBorderRadius = borderRadius }) =>
        pulseBorderRadius}px;
      box-shadow: ${({ pulseColor = basePulseColor }) =>
        `${baseShadow} ${pulseColor}`};
      opacity: ${(props) => (props.hasPulse ? 1 : 0)};
      transition: opacity 0.1s ease-in-out;
      pointer-events: none;
    }

    &::after {
      ${pseudoStyle}
      border-radius: ${({ pulseBorderRadius = borderRadius }) =>
        pulseBorderRadius}px;
      box-shadow: ${({
        pulseColor = basePulseColor,
        pulseShadowColor = basePulseShadowColor,
      }) => `${baseShadow} ${pulseColor} , 0 0 11px ${pulseShadowColor}`};
      opacity: 0;
      pointer-events: none;
      ${(props) => props.hasPulse && pulseAnimation}
    }
  }
`;
