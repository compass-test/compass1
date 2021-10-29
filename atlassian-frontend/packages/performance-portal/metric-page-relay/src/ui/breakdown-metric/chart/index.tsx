import React from 'react';

import {
  Bar,
  BarChart,
  Cell,
  LabelFormatter,
  LabelList,
  Legend,
  LegendValueFormatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { theme } from '../../../common/constants';
import { ComparisonType } from '../../../common/types';

import { ChartData, Props } from './types';

const decreaseDeltaLabelFormatter: LabelFormatter = (delta) => {
  return delta < 0 ? `▼ ${delta}` : null;
};

const increaseDeltaLabelFormatter: LabelFormatter = (delta) => {
  return delta > 0 ? `▲ ${delta}` : null;
};

const timingLabelFormatter: LabelFormatter = (timingName) => {
  if (typeof timingName === 'string') {
    return timingName.split('/').pop();
  }
  return timingName;
};

const dateLegendFormatter = (
  baseDate: Date,
  comparisonDate: Date,
  comparisonType: ComparisonType,
): LegendValueFormatter => (dataKey) => {
  const isBaseDate = dataKey === 'duration';
  const date = isBaseDate ? baseDate : comparisonDate;

  // add comparison type to comparison date legend
  if (!isBaseDate && comparisonType !== ComparisonType.Fixed) {
    const label = comparisonType === ComparisonType.DoD ? 'DoD' : 'WoW';
    return `${date.toLocaleDateString()} (${label})`;
  }

  return date.toLocaleDateString();
};

export const Chart = ({
  data,
  onChartClick,
  baseDate,
  comparisonDate,
  comparisonType,
  availableCohorts,
  focusedCohort,
}: Props) => {
  const mainBarColor =
    availableCohorts?.find(({ cohort }) => cohort === focusedCohort)?.color ??
    theme.chart.colors[0];

  return (
    <ResponsiveContainer width="100%" height={58 * data.length + 80}>
      <BarChart
        layout="vertical"
        data={data}
        barSize={24}
        barGap={0}
        barCategoryGap={10}
        style={{
          cursor: 'pointer',
        }}
        onClick={onChartClick}
      >
        <XAxis
          type="number"
          unit="ms"
          domain={[0, (dataMax) => dataMax + 100]}
          interval="preserveStart"
          tickCount={10}
        />
        <YAxis
          type="category"
          dataKey="name"
          tickFormatter={timingLabelFormatter}
          width={150}
        />
        <Legend
          formatter={dateLegendFormatter(
            baseDate,
            comparisonDate,
            comparisonType,
          )}
        />
        <Bar dataKey="duration" fill={mainBarColor} isAnimationActive={false}>
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.level === 0
                    ? mainBarColor
                    : theme.chart.colors[
                        ((entry.level ?? 0) + 2) % theme.chart.colors.length
                      ]
                }
              />
            );
          })}
          {
            // @ts-ignore style prop not typed
            <LabelList
              dataKey="delta"
              position="right"
              // @ts-ignore style prop not typed
              style={{
                fill: theme.text.green,
              }}
              formatter={decreaseDeltaLabelFormatter}
            />
          }
          {
            // @ts-ignore style prop not typed
            <LabelList
              dataKey="delta"
              position="right"
              // @ts-ignore style prop not typed
              style={{
                fill: theme.text.red,
              }}
              formatter={increaseDeltaLabelFormatter}
            />
          }
          {
            // @ts-ignore style prop not typed
            <LabelList
              dataKey="duration"
              position="insideRight"
              // @ts-ignore style prop not typed
              style={{ fill: 'white' }}
            />
          }
        </Bar>
        <Bar
          dataKey="comparisonDuration"
          fill={theme.chart.breakdown.comparisonColor}
          label={{ position: 'insideRight' }}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export type { ChartData };
