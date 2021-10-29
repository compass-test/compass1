import React from 'react';

import { ChartSnapshotData, ToplineTrendGoal } from '../../../types';
import { MetricDiff, MetricDiffConfig } from '../../metric-diff';
import { MetricValue } from '../../metric-value';
import { ChartSnapshot } from '../../snapshot';

import { MetricValues } from './types';

type EntryParams = {
  id: string;
  values: MetricValues;
  series?: ChartSnapshotData[];
  goal?: ToplineTrendGoal;
  unit?: string;
  mode?: MetricDiffConfig;
  highlightChange?: boolean;
  showGrid?: boolean;
};

export const getEntry = ({
  id,
  values,
  series,
  goal,
  unit,
  mode,
  highlightChange,
  showGrid,
}: EntryParams) => {
  return [
    {
      key: `${id}`,
      content: (
        <MetricValue
          value={values.selectedPeriodValue}
          goal={goal}
          unit={unit}
        />
      ),
    },
    {
      key: `${id}-short-diff`,
      content: (
        <MetricDiff
          value={values.selectedPeriodValue}
          valueToCompareAgainst={values.shortDistancePeriodValue}
          unit={unit}
          mode={mode}
          highlightChange={highlightChange}
        />
      ),
    },
    {
      key: `${id}-long-diff`,
      content: (
        <MetricDiff
          value={values.selectedPeriodValue}
          valueToCompareAgainst={values.longDistancePeriodValue}
          unit={unit}
          mode={mode}
          highlightChange={highlightChange}
        />
      ),
    },
    {
      key: `${id}-snapshot`,
      content: (
        <ChartSnapshot
          height={75}
          width={175}
          data={series}
          goal={goal?.value}
          showGrid={showGrid}
        />
      ),
    },
  ];
};
