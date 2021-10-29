/* eslint-disable react/react-in-jsx-scope */
/* @jsx jsx */
import { jsx } from '@emotion/core';

import Rotation from './rotation';

import { RuleLayers } from './styled';

import { SchedulesProps } from '../../../common/types';
import { localMidnight } from '../../../common/utils';

export function Schedules({
  startDate,
  timezone,
  days,
  rotations,
}: SchedulesProps) {
  const localStartDate = localMidnight(startDate, timezone);

  return (
    <RuleLayers className="rule-layers">
      {rotations.map(({ name, periods }) => (
        <Rotation
          startDate={localStartDate}
          {...{
            days,
            timezone,
            name,
            periods,
          }}
          key={name}
        />
      ))}
    </RuleLayers>
  );
}

export default Schedules;
