import { isNumber } from '../../number';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(1)).toEqual(true);
    expect(isNumber(0)).toEqual(true);
    expect(isNumber(10.0)).toEqual(true);
    expect(isNumber(99.9999999)).toEqual(true);
  });

  it('should return false for non-number types', () => {
    expect(isNumber(null)).toEqual(false);
    expect(isNumber(undefined)).toEqual(false);
    expect(isNumber(false)).toEqual(false);
    expect(isNumber(true)).toEqual(false);
    expect(isNumber('0')).toEqual(false);
    expect(isNumber(NaN)).toEqual(false);
    expect(isNumber('100')).toEqual(false);
  });
});
