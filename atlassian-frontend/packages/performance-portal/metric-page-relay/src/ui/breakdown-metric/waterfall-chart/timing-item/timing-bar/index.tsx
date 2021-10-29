import React, { useMemo } from 'react';

import { ScaleLinear } from 'd3-scale';

import { barHeight } from '../../../../../common/constants/breakdown-chart/waterfall-chart';

export interface Props {
  startTime: number;
  duration: number;
  scale: ScaleLinear<number, number>;
  color: string;
  isLowConfidence?: boolean;
}

export const TimingBar = ({ startTime, duration, scale, color }: Props) => {
  const timingWidth = useMemo(() => Math.max(scale(duration ?? 0), 1), [
    scale,
    duration,
  ]);
  const startX = useMemo(() => scale(startTime ?? 0), [scale, startTime]);

  return (
    <rect
      fill={color}
      stroke="none"
      x={startX}
      width={timingWidth}
      height={barHeight}
      rx={6}
    />
  );
};
