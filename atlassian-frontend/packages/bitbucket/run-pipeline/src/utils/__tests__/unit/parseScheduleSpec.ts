import moment from 'moment';

import { HourlyEnum, ScheduleEnum, WeekdayEnum } from '../../../types';
import parseSchedule, { generateRandomMinute } from '../../parseSchedule';

const mathCopy = Object.create(global.Math);
const resetMockRandom = () => {
  global.Math = mathCopy;
};

const randomMock = (returnValues: any) => {
  let arrayOfValues = returnValues;
  if (!Array.isArray(returnValues)) {
    arrayOfValues = [returnValues];
  }

  let index = 0;

  return () => {
    if (index >= arrayOfValues.length) {
      index = 0;
    }
    return arrayOfValues[index++];
  };
};

const mockRandom = (values: any) => {
  const mockMath = Object.create(global.Math);
  mockMath.random = randomMock(values);
  global.Math = mockMath;
};

describe('parseSchedule util', () => {
  afterEach(() => {
    resetMockRandom();
  });

  it('returns correct hourly cron expression', () => {
    const parsedSchedule = parseSchedule({
      schedule: ScheduleEnum.Hourly,
      weekday: WeekdayEnum.Monday,
      hour: HourlyEnum['00:00 - 01:00'],
    });
    const minuteValue = parseInt(parsedSchedule.substr(2), 0);
    expect(minuteValue >= 0 && minuteValue <= 59).toBeTruthy();
    expect(parsedSchedule).toEqual(`0 ${minuteValue} * * * ? *`);
  });

  it('returns correct daily cron expression', () => {
    const hour = moment('08', 'HH').utc().format('H');
    expect(
      parseSchedule({
        schedule: ScheduleEnum.Daily,
        weekday: WeekdayEnum.Monday,
        hour: HourlyEnum['08:00 - 09:00'],
      }),
    ).toContain(`${hour} * * ? *`);
  });

  it('returns correct weekly cron expression', () => {
    const expected = moment('05 Thursday', 'HH dddd')
      .utc()
      .format('H ? * ddd')
      .toUpperCase();
    expect(
      parseSchedule({
        schedule: ScheduleEnum.Weekly,
        weekday: WeekdayEnum.Thursday,
        hour: HourlyEnum['05:00 - 06:00'],
      }),
    ).toContain(expected);
  });

  it('returns correct cron expression for different minute timezone offsets', () => {
    const hour = moment('08', 'HH').utc().add(1, 'hour').format('H');
    expect(
      parseSchedule({
        schedule: ScheduleEnum.Daily,
        weekday: WeekdayEnum.Monday,
        hour: ('08:30 - 09:30' as unknown) as any,
      }),
    ).toContain(`${hour} * * ? *`);
  });

  it('should generate random minute', () => {
    mockRandom([0.99, 0.2, 0.3]);
    expect([
      generateRandomMinute(0),
      generateRandomMinute(15),
      generateRandomMinute(20),
    ]).toEqual([58, 2, 5]);
  });
});
