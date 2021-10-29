import React, { useMemo } from 'react';

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  TickFormatterFunction,
  XAxis,
  YAxis,
} from 'recharts';

import { findSkippedWeekends } from '@atlassian/performance-portal-common';

import { renderWeekendLine } from '../../../common/ui/skipped-weekend-line';
import {
  useCommonToplineChartProps,
  useToplineChartContext,
} from '../../../common/ui/topline-chart';
import {
  dateTickFormatter,
  getPartialDayCohortName,
} from '../../../common/utils';

import { Props } from './types';

const volumeTickFormatter: TickFormatterFunction = (value) => {
  if (value >= 1000000) {
    return `${value / 1000000}m`;
  } else if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return value;
};

export const VolumeChart = ({
  data,
  availableCohorts,
  label = 'Volume',
  width = '100%',
  height = 200,
}: Props) => {
  const skippedWeekends = useMemo(
    () => findSkippedWeekends(data?.map(({ dateTime }) => dateTime)),
    [data],
  );

  const {
    onContainerClick,
    onContainerMouseMove,
    onContainerMouseOut,
    renderLineDot,
  } = useCommonToplineChartProps({
    data,
    availableCohorts,
    shouldUseColoredIcons: false,
  } as any);
  const { selectedDateTime, hoveredDateTime } = useToplineChartContext();

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart
        data={data}
        onClick={onContainerClick}
        onMouseMove={onContainerMouseMove}
        onMouseOut={onContainerMouseOut}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dateTime"
          scale="point"
          tickFormatter={dateTickFormatter}
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="number"
          label={{
            value: label,
            angle: -90,
            position: 'insideLeft',
          }}
          tickFormatter={volumeTickFormatter}
          tickLine={false}
          axisLine={false}
          domain={['auto', 'auto']}
        />
        {skippedWeekends?.map(([friday, monday], index) => (
          <ReferenceArea
            key={index}
            x1={friday}
            x2={monday}
            shape={renderWeekendLine}
          />
        ))}
        {selectedDateTime && (
          <ReferenceLine x={selectedDateTime} strokeWidth={1} />
        )}
        {hoveredDateTime && (
          <ReferenceLine x={hoveredDateTime} strokeWidth={1} isFront={false} />
        )}
        {availableCohorts.map(({ cohort, color }) => (
          <Line
            key={cohort}
            dataKey={`values.${cohort}.value`}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            fillOpacity={0.2}
            fill={color}
            dot={renderLineDot}
          />
        ))}
        {availableCohorts.map(({ cohort, color }) => (
          <Line
            key={`${cohort}Today`}
            dataKey={`values.${getPartialDayCohortName(cohort)}.value`}
            type="monotone"
            stroke={color}
            strokeWidth={2}
            fillOpacity={0.2}
            strokeDasharray="4 4"
            fill={color}
            dot={renderLineDot}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
