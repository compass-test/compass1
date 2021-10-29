import moment from 'moment';

import { HourlyEnum, ScheduleEnum, WeekdayEnum } from '../types';

// The accepted Cronman expression is non-standard [allowed values]
// seconds [0-59]
// minutes [*, 0-59]
// hours [*, 0-23]
// day of month [*, ?, 1-31]
// month [*, 0-11]
// day of week [?, MON-SUN]
// year [*]

export const generateRandomMinute = (minutes: number) =>
  Math.floor(Math.random() * (minutes ? minutes - 1 : 59));

export function toUTCRange(hour: HourlyEnum) {
  const startTime = moment(hour, 'HH:mm').utc();
  const endTime = startTime.clone().add(1, 'hour');
  // if minutes time offset is different than 0 add extra hour for consistency
  if (startTime.minutes() > 0) {
    startTime.minutes(0).add(1, 'hour');
    endTime.minutes(0).add(1, 'hour');
  }
  return `${startTime.format('HH:mm')} - ${endTime.format('HH:mm')}` as any;
}

export function toUTCDay(hour: HourlyEnum, weekday: string) {
  return (moment(hour, 'HH:mm')
    .day(weekday)
    .utc()
    .format('dddd') as unknown) as keyof typeof WeekdayEnum;
}

export default function parseSchedule({
  schedule,
  weekday,
  hour,
}: {
  schedule: ScheduleEnum.Hourly | ScheduleEnum.Daily | ScheduleEnum.Weekly;
  hour: HourlyEnum;
  weekday: WeekdayEnum;
}): string {
  const currentWeekday = WeekdayEnum[toUTCDay(hour, weekday)];
  const currentHour = HourlyEnum[toUTCRange(hour)];
  const currentMinutes = hour ? moment(hour, 'HH:mm').utc().minutes() : 0;
  return {
    [ScheduleEnum.Hourly]: `0 ${generateRandomMinute(
      currentMinutes,
    )} * * * ? *`,
    [ScheduleEnum.Daily]: `0 ${generateRandomMinute(
      currentMinutes,
    )} ${currentHour} * * ? *`,
    [ScheduleEnum.Weekly]: `0 ${generateRandomMinute(
      currentMinutes,
    )} ${currentHour} ? * ${currentWeekday} *`,
  }[schedule];
}
