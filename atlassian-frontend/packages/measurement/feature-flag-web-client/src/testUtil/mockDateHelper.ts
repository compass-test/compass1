/* eslint-disable import/no-extraneous-dependencies */
import addMilli from 'date-fns/addMilliseconds';
import MockDate from 'mockdate';

export const advanceBy = (byMs: number) => {
  MockDate.set(addMilli(Date.now(), byMs));
};

// Pulled from afp/build/configs/jest-config/setup/setup-dates.js
export const clear = () => {
  MockDate.set(1502841600000);
};
