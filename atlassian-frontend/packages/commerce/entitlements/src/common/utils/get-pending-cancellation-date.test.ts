import {
  FREE_SP_ENTITLEMENT,
  MAY_20_2022_EPOCH,
  SP_ENTITLEMENT_1,
  SP_ENTITLEMENT_CANCELLED,
  SP_ENTITLEMENT_INACTIVE,
  SP_ENTITLEMENT_PENDING_CANCELLATION,
} from '../mocks';

import { getPendingCancellationDate } from './index';

test('free entitlement should return undefined', () => {
  const result = getPendingCancellationDate(FREE_SP_ENTITLEMENT);
  expect(result).toEqual(undefined);
});

test('inactive entitlement should return undefined', () => {
  const result = getPendingCancellationDate(SP_ENTITLEMENT_INACTIVE);
  expect(result).toEqual(undefined);
});

test('active entitlement with non-cancellation change reason should return undefined', () => {
  const result = getPendingCancellationDate(SP_ENTITLEMENT_1);
  expect(result).toEqual(undefined);
});

test('cancelled entitlement should return undefined', () => {
  const result = getPendingCancellationDate(SP_ENTITLEMENT_CANCELLED);
  expect(result).toEqual(undefined);
});

test('pending cancellation entitlement should return correct date object', () => {
  const result = getPendingCancellationDate(
    SP_ENTITLEMENT_PENDING_CANCELLATION,
  );
  expect(result).toEqual(MAY_20_2022_EPOCH);
});
