import { getExitCode } from './exit-code';

describe('getExitCode', () => {
  it(`should return code 0 when there aren't any results`, () => {
    const code = getExitCode();
    expect(code).toBe(0);
  });

  it(`should return code 0 when there aren't any failures`, () => {
    const results = {
      numFailedTestSuites: 0,
      numFailedTests: 0,
      success: true,
    };
    const code = getExitCode(results);
    expect(code).toBe(0);
  });

  it('should return code 1 when there are test failures', () => {
    const results = {
      numFailedTestSuites: 1,
      numFailedTests: 5,
      success: false,
    };
    const code = getExitCode(results);
    expect(code).toBe(1);
  });
});
