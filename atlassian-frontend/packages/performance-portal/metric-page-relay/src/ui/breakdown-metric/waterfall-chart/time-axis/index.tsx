import React from 'react';

import { ScaleLinear } from 'd3-scale';

import { N40, N60 } from '@atlaskit/theme/colors';

import {
  barHeight,
  outerRowHeight,
} from '../../../../common/constants/breakdown-chart/waterfall-chart';

export interface Props {
  scale: ScaleLinear<number, number>;
  viewBoxHeight: number;
}

const lineColor = N40;
const textColor = N60;

export const TimeAxis = ({ scale, viewBoxHeight }: Props) => {
  return (
    <g>
      {scale.ticks(5).map((tick) => {
        const xAxis = scale(tick);

        let textAnchor = 'end';
        if (xAxis <= 0) {
          textAnchor = 'start';
        }
        return (
          <g key={tick}>
            <line
              height={viewBoxHeight - outerRowHeight}
              x1={xAxis}
              x2={xAxis}
              y1={barHeight}
              y2={viewBoxHeight - barHeight}
              stroke={lineColor}
            />
            <text
              x={xAxis}
              textAnchor={textAnchor}
              y={2}
              dominantBaseline="hanging"
              stroke={textColor}
              fill={textColor}
            >
              {tick}
            </text>
            <text
              x={xAxis}
              textAnchor={textAnchor}
              y={viewBoxHeight - 3}
              dominantBaseline="auto"
              stroke={textColor}
              fill={textColor}
            >
              {tick}
            </text>
          </g>
        );
      })}
    </g>
  );
};
