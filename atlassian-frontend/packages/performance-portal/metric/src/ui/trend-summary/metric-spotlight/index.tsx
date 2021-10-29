import React from 'react';

import {
  getDiffData,
  NOT_APPLICABLE,
} from '@atlassian/performance-portal-common';

import {
  DiffAbsolute,
  DiffNumbers,
  DiffPercentage,
  NotApplicable,
  Spotlight,
} from '../../../common/ui/spotlight';

import { MetricSpotlightProps } from './types';

export const MetricSpotlight = React.memo(
  ({ valueBefore, valueAfter, label, unit }: MetricSpotlightProps) => {
    const {
      absoluteDiff,
      percentageDiff,
      absoluteDiffStr,
      percentageDiffStr,
      Icon,
      color,
    } = getDiffData(valueAfter, valueBefore, unit);

    return (
      <Spotlight primaryColor={color} label={label} unit={unit} Icon={Icon}>
        <DiffNumbers>
          {absoluteDiff !== null && percentageDiff !== null ? (
            <>
              <DiffPercentage>{percentageDiffStr}</DiffPercentage>
              <DiffAbsolute>{absoluteDiffStr}</DiffAbsolute>
            </>
          ) : (
            <NotApplicable>{NOT_APPLICABLE}</NotApplicable>
          )}
        </DiffNumbers>
      </Spotlight>
    );
  },
);
