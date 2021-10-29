import sinon from 'sinon';

import { eventLocalTime } from '../../local-time';

describe('localTime', () => {
  let clock: any;
  beforeEach(() => {
    clock = sinon.useFakeTimers(+new Date('2020-08-10 14:30:20'));
  });
  afterEach(() => {
    clock.restore();
  });
  test('should return fields with hour and day of week', () => {
    expect(eventLocalTime()).toMatchObject({
      'event:localHour': 14,
      'event:localDayOfWeek': 1, // Monday
    });
  });
});
