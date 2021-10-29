import React, { forwardRef, RefObject } from 'react';
import { NudgeProps } from './DefaultNudge';
import styled from 'styled-components';

interface NudgePulseProps {
  hasPulse: boolean;
  elWidth: number;
  elBorder: number;
  animationDuration: number;
}

const NudgePulse = styled.div<NudgePulseProps>`
  display: block;
  position: relative;
  outline: none;
  z-index: 0;

  & > * {
    outline: none;
  }

  --elWidthBase: ${({ elWidth }) => elWidth};
  --elBorderBase: ${({ elBorder }) => elBorder};
  --animationDuration: ${({ animationDuration }) => `${animationDuration}s`};
  --elWidth: calc(var(--elWidthBase) * 1px);
  --elBorder: calc(var(--elBorderBase) * 1px);
  --elWithBordersBase: calc(var(--elWidthBase) + 2 * var(--elBorderBase));
  --elWithBorders: calc(var(--elWithBordersBase) * 1px);
  --elScaleFactor: calc(var(--elWithBordersBase) / var(--elWidthBase));
  --elBorderOffset: calc(var(--elBorder));

  @keyframes pulseAnimation {
    0% {
      transform: scale(1);
      fill: rgba(255, 255, 255, 1);
    }
    67% {
      transform: scale(var(--elScaleFactor));
      fill: rgba(255, 255, 255, 0.6);
    }
    100% {
      transform: scale(var(--elScaleFactor));
      fill: rgba(255, 255, 255, 0);
    }
  }

  #pulsing-borders {
    top: calc(var(--elBorderOffset) * -1);
    left: calc(var(--elBorderOffset) * -1);
    z-index: -1;
    position: absolute;
    fill: transparent;

    opacity: ${({ hasPulse: hp }) => (hp ? 1 : 0)};
    transition: opacity 0.24s ease;
  }
  #visible {
    fill: white;
  }

  #invisible {
    fill: black;
  }

  #pulse-rect {
    fill: white;
    transform-origin: center;
    animation: ${({ hasPulse }) =>
      hasPulse
        ? 'pulseAnimation var(--animationDuration) ease-out infinite'
        : 'none'};
  }

  #border-rect {
    fill: transparent;
    stroke: white;
    stroke-width: 1;
  }

  #pulsing-borders,
  #visible,
  #border-elements {
    width: var(--elWithBorders);
    height: var(--elWithBorders);
    x: 0;
    y: 0;
  }

  #invisible,
  #pulse-rect,
  #border-rect {
    width: var(--elWidth);
    height: var(--elWidth);
    x: var(--elBorderOffset);
    y: var(--elBorderOffset);
  }
`;

export const ExpandingBorderNudge = forwardRef<HTMLDivElement, NudgeProps>(
  ({ children, hasPulse, onClickCapture, onMouseEnter }, ref) => {
    // Modify to suit your needs
    const elWidth = 32;
    const elBorder = 4;
    const totalWidth = elWidth + 2 * elBorder;
    const animationDuration = 1.5;
    const borderRadius = 3;
    const pulseBorderRadius = 5;

    return (
      <NudgePulse
        elWidth={elWidth}
        elBorder={elBorder}
        animationDuration={animationDuration}
        hasPulse={hasPulse}
        onClickCapture={onClickCapture}
        onMouseEnter={onMouseEnter}
        innerRef={ref as RefObject<HTMLDivElement>}
      >
        {children}
        <svg id="pulsing-borders" viewBox={`0 0 ${totalWidth} ${totalWidth}`}>
          <mask id="border-mask">
            <rect id="visible" rx={pulseBorderRadius} />
            <rect id="invisible" rx={borderRadius} />
          </mask>
          <g id="border-elements" mask="url(#border-mask)">
            <rect id="pulse-rect" rx={pulseBorderRadius} />
            <rect id="border-rect" rx={borderRadius} />
          </g>
        </svg>
      </NudgePulse>
    );
  },
);
