// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import Schedules from './index';

import { createMockSchedules } from '../../../common/mock-schedules';
import moment from 'moment-timezone';

export const _2WeeksExample = () => {
  return (
    <Schedules
      startDate="2019-10-21T00:00+11:00"
      currentDate={moment().toISOString()}
      timezone="Australia/Sydney"
      days={14}
      rotations={[
        {
          name: 'Example',
          periods: createMockSchedules(
            '2019-10-21T00:00+11:00',
            '2019-11-21T00:00+11:00',
            moment.duration(7, 'days'),
            'Australia/Sydney',
          ),
        },
      ]}
    />
  );
};

export default {
  title: 'Schedule',
};
