import React from 'react';

import { formatNumberWithUnit } from '@atlassian/performance-portal-common';

import { ToplineTrendGoal } from '../../types';

import { AlignLeft, MetricGoal, MetricValueStyled } from './styled';

type Props = {
  value: number | undefined;
  goal: ToplineTrendGoal | undefined;
  unit?: string;
};

export const MetricValue = ({ value, goal, unit = 'ms' }: Props) => {
  return (
    <AlignLeft>
      <MetricValueStyled>{formatNumberWithUnit(value, unit)}</MetricValueStyled>
      {goal && (
        <MetricGoal>
          Goal {goal.name}: {goal.value} ms
        </MetricGoal>
      )}
    </AlignLeft>
  );
};
