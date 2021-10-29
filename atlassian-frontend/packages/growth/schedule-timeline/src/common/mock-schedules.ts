import { Period, PeriodType } from './types';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import moment from 'moment-timezone';

const users = [
  {
    label: '--',
    backgroundColor: colors.N30,
  },
  {
    label: 'Saidur Rahman',
    backgroundColor: colors.B200,
  },
  {
    label: 'Lachy Hunt',
    backgroundColor: colors.R200,
  },
  {
    label: 'Bryan Waite',
    backgroundColor: colors.G300,
  },
  {
    label: 'Simmy Wang',
    backgroundColor: colors.B200,
  },
];

export function createMockSchedules(
  start: moment.Moment | Date | string,
  end: moment.Moment | Date | string,
  defaultDuration: moment.Duration | number,
  timezone: string,
): Period[] {
  const currentDate = moment.tz(timezone);
  const periodStartDate = moment.tz(start, timezone);
  const periodDuration = moment.duration(defaultDuration);
  let type: PeriodType = periodStartDate.isBefore(currentDate)
    ? 'historical'
    : 'default';
  let counter = 0;

  let startDate = moment(periodStartDate);
  let duration = periodDuration.clone();
  let endDate = moment(periodStartDate).add(duration);

  const result = [];

  while (startDate.isBefore(end)) {
    let splitAtCurrent = currentDate.isBetween(startDate, endDate);

    if (splitAtCurrent) {
      result.push(
        {
          startDate: startDate.toISOString(),
          endDate: currentDate.toISOString(),
          type,
          ...users[counter % users.length],
        },
        {
          startDate: currentDate.toISOString(),
          endDate: endDate.toISOString(),
          type: 'default' as PeriodType,
          ...users[counter % users.length],
        },
      );

      type = 'default';
    } else {
      result.push({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        type,
        ...users[counter % users.length],
      });
    }

    counter++;
    startDate = moment(periodStartDate).add(duration);
    duration.add(periodDuration);
    endDate = moment(periodStartDate).add(duration);
  }

  return result;
}
