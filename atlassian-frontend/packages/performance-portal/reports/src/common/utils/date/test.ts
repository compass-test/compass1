import format from 'date-fns/format';

import {
  getISOWeekRange,
  getMonthRange,
  getPreviousWeekFriday,
  getPreviousWeekMonday,
  getPreviousWorkingDay,
  parseIsoDateString,
  parseUtcIsoDateString,
  toIsoDateString,
  toUtcIsoDateString,
} from './index';

test('getPreviousWeekMonday', () => {
  const prevWeekMonday = getPreviousWeekMonday(
    parseIsoDateString('2021-01-06'),
  );

  expect(prevWeekMonday.getDay()).toEqual(1);
  expect(prevWeekMonday).toEqual(parseIsoDateString('2020-12-28'));
});
test('getPreviousWeekFriday', () => {
  const prevWeekFriday = getPreviousWeekFriday(
    parseIsoDateString('2021-01-06'),
  );

  expect(prevWeekFriday.getDay()).toEqual(5);
  expect(prevWeekFriday).toEqual(parseIsoDateString('2021-01-01'));
});

test('toUtcIsoDateString', () => {
  const dateString = toUtcIsoDateString(new Date(Date.UTC(2021, 0, 1)));
  expect(dateString).toEqual('2021-01-01');
});

test('toIsoDateString', () => {
  const dateString = toIsoDateString(new Date(2021, 0, 1));
  expect(dateString).toEqual('2021-01-01');
});

test('parseUtcIsoDateString', () => {
  expect(parseUtcIsoDateString('2021-01-01')).toEqual(
    new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)),
  );
});

describe('getISOWeekRange', () => {
  test('simple weeks', () => {
    const { from, to } = getISOWeekRange({ year: 2021, weekNo: 1 });
    expect(from).toEqual('2021-01-04');
    expect(to).toEqual('2021-01-10');
  });
  test('week crossing between years', () => {
    const { from, to } = getISOWeekRange({ year: 2020, weekNo: 53 });
    expect(from).toEqual('2020-12-28');
    expect(to).toEqual('2021-01-03');
  });
});

test('getMonthRange', () => {
  let m = getMonthRange({ year: 2021, month: 0 });
  expect(m.from).toEqual('2021-01-01');
  expect(m.to).toEqual('2021-01-31');

  m = getMonthRange({ year: 2021, month: 1 });
  expect(m.from).toEqual('2021-02-01');
  expect(m.to).toEqual('2021-02-28');

  // leap year
  m = getMonthRange({ year: 2020, month: 1 });
  expect(m.from).toEqual('2020-02-01');
  expect(m.to).toEqual('2020-02-29');
});

describe('getPreviousWorkingDay', () => {
  test('returns previous day for Tue - Sat', () => {
    const monday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 20, 0, 0, 0, 0)),
    );
    expect(format(monday, 'yyyy-MM-dd')).toEqual('2021-04-19');

    const tuesday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 21, 0, 0, 0, 0)),
    );
    expect(format(tuesday, 'yyyy-MM-dd')).toEqual('2021-04-20');

    const wednesday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 22, 0, 0, 0, 0)),
    );
    expect(format(wednesday, 'yyyy-MM-dd')).toEqual('2021-04-21');

    const thursday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 23, 0, 0, 0, 0)),
    );
    expect(format(thursday, 'yyyy-MM-dd')).toEqual('2021-04-22');

    const friday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 24, 0, 0, 0, 0)),
    );
    expect(format(friday, 'yyyy-MM-dd')).toEqual('2021-04-23');
  });
  test('returns Fri when Sun', () => {
    const friday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 25, 0, 0, 0, 0)),
    );
    expect(format(friday, 'yyyy-MM-dd')).toEqual('2021-04-23');
  });
  test('returns Fri when Sun', () => {
    const friday = getPreviousWorkingDay(
      new Date(Date.UTC(2021, 3, 26, 0, 0, 0, 0)),
    );
    expect(format(friday, 'yyyy-MM-dd')).toEqual('2021-04-23');
  });
});
