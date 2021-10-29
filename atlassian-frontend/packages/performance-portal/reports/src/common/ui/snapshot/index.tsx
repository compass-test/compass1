import React, { memo, useMemo } from 'react';

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

import { B100, B75, N400 } from '@atlaskit/theme/colors';
import { findSkippedWeekends } from '@atlassian/performance-portal-common';

import { ChartSnapshotData } from '../../types';
import { renderWeekendLine } from '../skipped-weekend-line';

import { SnapshotContainer } from './styled';

interface Props {
  width: number;
  height: number;
  data?: ChartSnapshotData[];
  goal?: number;
  showGrid?: boolean;
}

export const ChartSnapshot = memo(
  ({ width, height, data, goal, showGrid = false }: Props) => {
    const skippedWeekends = useMemo(
      () => findSkippedWeekends(data?.map(({ dateTime }) => dateTime)),
      [data],
    );

    if (!data) {
      return null;
    }

    return (
      <SnapshotContainer>
        <LineChart width={width} height={height} data={data}>
          <CartesianGrid vertical={false} stroke={B75} />
          <YAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tick={false}
            domain={[
              (dataMin) => (goal ? Math.min(dataMin, goal) : dataMin),
              (dataMax) => (goal ? Math.max(dataMax, goal) : dataMax),
            ]}
            width={0}
            padding={{ top: 10, bottom: 10 }}
          />
          <XAxis
            dataKey="dateTime"
            scale="point"
            tickLine={false}
            axisLine={false}
            height={0}
          />
          {goal && (
            <ReferenceLine
              key={goal}
              y={goal}
              stroke={B100}
              strokeDasharray="6 4"
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={N400}
            strokeWidth={2}
            dot={false}
          />
          {showGrid &&
            skippedWeekends?.map(([friday, monday]) => (
              <ReferenceArea
                key={`${friday}:${monday}`}
                x1={friday}
                x2={monday}
                shape={renderWeekendLine}
              />
            ))}
        </LineChart>
      </SnapshotContainer>
    );
  },
);
