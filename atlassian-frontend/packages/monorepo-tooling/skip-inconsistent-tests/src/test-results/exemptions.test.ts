import {
  EXEMPTIONS,
  exemptionStackTraces,
  getErrorExemption,
} from './exemptions';

describe('getErrorExemption', () => {
  it(`should not be exempt when it isn't a known environmental issue`, () => {
    const legitError =
      'Error: expect(received).toHaveLength(expected)\n\nExpected length: 0\nReceived length: 1';
    expect(getErrorExemption('foo.ts', [legitError])).toBe(undefined);
  });

  it.each(EXEMPTIONS)(
    'should be exempt when it is a known environmental issue %#',
    error => {
      const environmentalError = exemptionStackTraces.get(error);
      expect(environmentalError).toBeDefined();
      expect(getErrorExemption('foo.ts', [environmentalError!])).toBe(error);
    },
  );
});
