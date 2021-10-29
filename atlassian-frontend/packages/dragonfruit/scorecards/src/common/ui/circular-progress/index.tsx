import React from 'react';

import styled from 'styled-components';

import { getColorForProgress } from '../../utils/get-color-for-progress';

const StyledCircle = styled.circle`
  stroke-width: ${(props) => props.strokeWidth}px;

  // axis compensation
  transform: rotate(-90deg);
  transform-origin: 50% 50%;

  // Add animation
  transition: 0.35s stroke-dashoffset;
`;

type Size = 'small' | 'medium';

interface Props {
  progress: number;
  size?: Size;
  testId?: string;
}

export const CircularProgress: React.FC<Props> = ({
  progress,
  size = 'small',
  testId,
}) => {
  // Just windowing to [0, 100] to avoid render shenanigans (e.g. colorization
  // inconsistencies, 1000% overlapping the progress circle, etc.).
  if (progress < 0) {
    progress = 0;
  } else if (progress > 100) {
    progress = 100;
  }

  const radius = size === 'small' ? 18 : 36;
  const strokeWidth = size === 'small' ? 4 : 7;
  const fontSize = size === 'small' ? 12 : 21;
  const fontWeight = 'bold';
  const percentFontSize = size === 'small' ? 9 : 14;
  const circleBackgroundColor = '#efeff2';
  const width = radius * 2 + strokeWidth;
  const height = radius * 2 + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const circleColor = getColorForProgress(progress);
  const strokeDashoffset = circumference * (1 - progress / 100);
  const cx = radius + strokeWidth / 2;
  const cy = cx;

  const progressTestId = testId ? `${testId}.circle` : testId;
  const percentageTestId = testId ? `${testId}.percentage` : testId;

  return (
    <svg width={width} height={height} data-testid={testId}>
      <StyledCircle
        strokeWidth={strokeWidth}
        stroke={circleBackgroundColor}
        fill="transparent"
        r={radius}
        cx={cx}
        cy={cy}
      />
      <StyledCircle
        strokeWidth={strokeWidth}
        data-testid={progressTestId}
        stroke={circleColor}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        fill="transparent"
        r={radius}
        cx={cx}
        cy={cy}
      />
      <text
        data-testid={percentageTestId}
        fill="black"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={`${fontSize}px`}
        fontWeight={fontWeight}
        x={radius + strokeWidth / 2}
        y={radius + strokeWidth / 2}
      >
        {progress}
        <tspan fontSize={`${percentFontSize}px`}>%</tspan>
      </text>
    </svg>
  );
};
