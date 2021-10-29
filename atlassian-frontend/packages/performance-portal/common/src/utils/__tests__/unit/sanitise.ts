import { sanitiseValue } from '../../sanitise';

const invalidValues = [
  9999999999999999,
  '1',
  'invalid value',
  'true',
  'false',
  'null',
  'undefined',
  'none',
  false,
  { invalid: 'INVALID' },
  ['invalid value', 'invalid value'],
  null,
  undefined,
];

describe('sanitiseValue', () => {
  describe('with strings as valid values', () => {
    const strings = ['value 1', 'value 2', 'value 3', 'value 4'];

    describe('with fallback value', () => {
      it('should sanitise valid value', () => {
        strings.forEach((validValue) => {
          expect(sanitiseValue(validValue, strings, 'fall back value')).toEqual(
            {
              isValid: true,
              validValue: validValue,
            },
          );
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(
            sanitiseValue(invalidValue, strings, 'fall back value'),
          ).toEqual({
            isValid: false,
            validValue: 'fall back value',
          });
        });
      });
    });

    describe('without fallback value', () => {
      it('should sanitise valid value', () => {
        strings.forEach((validValue) => {
          expect(sanitiseValue(validValue, strings)).toEqual({
            isValid: true,
            validValue: validValue,
          });
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(sanitiseValue(invalidValue, strings)).toEqual({
            isValid: false,
            validValue: strings[0],
          });
        });
      });
    });
  });

  describe('with numbers as valid values', () => {
    const numbers = [1, 2, 3, 4];

    describe('with fallback value', () => {
      it('should sanitise valid value', () => {
        numbers.forEach((validValue) => {
          expect(sanitiseValue(validValue, numbers, 9)).toEqual({
            isValid: true,
            validValue: validValue,
          });
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(sanitiseValue(invalidValue, numbers, 9)).toEqual({
            isValid: false,
            validValue: 9,
          });
        });
      });
    });

    describe('without fallback value', () => {
      it('should sanitise valid value', () => {
        numbers.forEach((validValue) => {
          expect(sanitiseValue(validValue, numbers)).toEqual({
            isValid: true,
            validValue: validValue,
          });
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(sanitiseValue(invalidValue, numbers)).toEqual({
            isValid: false,
            validValue: numbers[0],
          });
        });
      });
    });
  });

  describe('with booleans as valid values', () => {
    const booleans = [true];

    describe('with fallback value', () => {
      it('should sanitise valid value', () => {
        booleans.forEach((validValue) => {
          expect(sanitiseValue(validValue, booleans, false)).toEqual({
            isValid: true,
            validValue: validValue,
          });
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(sanitiseValue(invalidValue, booleans, true)).toEqual({
            isValid: false,
            validValue: true,
          });
        });
      });
    });

    describe('without fallback value', () => {
      it('should sanitise valid value', () => {
        booleans.forEach((validValue) => {
          expect(sanitiseValue(validValue, booleans)).toEqual({
            isValid: true,
            validValue: validValue,
          });
        });
      });

      it('should sanitise invalid value', () => {
        invalidValues.forEach((invalidValue) => {
          expect(sanitiseValue(invalidValue, booleans)).toEqual({
            isValid: false,
            validValue: booleans[0],
          });
        });
      });
    });
  });
});
