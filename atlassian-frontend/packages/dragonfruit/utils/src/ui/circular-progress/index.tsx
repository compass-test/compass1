import React from 'react';

import styled from 'styled-components';

import { R400, Y300 } from '@atlaskit/theme/colors';

// Adapted from: https://css-tricks.com/building-progress-ring-quickly/

type Props = {
  progress: number;
  mediumThreshold: number;
  highThreshold: number;
};

const CircularProgress = (props: Props) => {
  if (props.highThreshold < props.mediumThreshold) {
    throw new Error(
      "The 'medium' threshold cannot be more than the 'high' threshold.",
    );
  }

  const radius = 22;
  const strokeWidth = 4;
  const fontSize = 15;
  const percentFontSize = 9;
  const circleBackgroundColor = '#efeff2';
  const circleColor = getColorForProgress(
    props.progress,
    props.mediumThreshold,
    props.highThreshold,
  );

  const size = (radius + strokeWidth) * 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (props.progress / 100) * circumference;
  const cx = radius + strokeWidth / 2;
  const cy = cx;
  const StyledCircle = styled.circle`
    stroke-width: ${strokeWidth}px;

    // axis compensation
    transform: rotate(-90deg);
    transform-origin: 50% 50%;

    // Add animation
    transition: 0.35s stroke-dashoffset;
  `;
  return (
    <svg width={size} height={size}>
      <StyledCircle
        stroke={circleBackgroundColor}
        fill="transparent"
        r={radius}
        cx={cx}
        cy={cy}
      />
      <StyledCircle
        stroke={circleColor}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
        r={radius}
        cx={cx}
        cy={cy}
      />
      <text
        fill="black"
        textAnchor="middle"
        dominantBaseline="bottom"
        fontSize={`${fontSize}px`}
        x={radius + strokeWidth}
        y={radius + strokeWidth + fontSize / 2}
      >
        {props.progress}
        <tspan fontSize={`${percentFontSize}px`}>%</tspan>
      </text>
    </svg>
  );
};

// This specifies what color should be used when progress is between start and end inclusively
type ColorRange = { start: number; end: number; color: string };

export const colourRanges = (med: number, high: number) => {
  const ranges: ColorRange[] = [
    { start: 0, end: med, color: R400 },
    { start: med, end: high, color: Y300 },
    { start: high, end: 100, color: '#26AF36' },
  ];
  return ranges;
};

export const getColorForProgress = (
  progress: number,
  med: number,
  high: number,
) => {
  for (const { start, end, color } of colourRanges(med, high)) {
    if (progress >= start && progress <= end) {
      return color;
    }
  }
};

export default CircularProgress;
