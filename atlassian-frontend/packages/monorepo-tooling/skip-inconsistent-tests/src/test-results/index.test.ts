import { XML_STRING_WITH_FAILURE_TESTS } from './__tests__/__fixtures__/test-data';
import { parseFailureTests } from './parse-failures';
import { getFailurePercentage } from './percentage';

describe('fetch failing tests', () => {
  beforeAll(() => {
    // Silence warning log for the abort early test case
    jest.spyOn(console, 'info').mockImplementation((_msg: string) => {});
    jest.spyOn(console, 'warn').mockImplementation((_msg: string) => {});
    jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return failure rate as a percentage string', async () => {
    const result = await parseFailureTests(
      XML_STRING_WITH_FAILURE_TESTS(false),
    );
    const percent = getFailurePercentage('report.xml', result, false);
    expect(percent).toStrictEqual('100%');
    expect(result.totalFailedTestCases).toStrictEqual(1);
  });

  it('should return zero percent if failure rate is greater than 10% when env threshold protection is enabled', async () => {
    const result = await parseFailureTests(
      XML_STRING_WITH_FAILURE_TESTS(false),
    );
    const percent = getFailurePercentage('report.xml', result, true);
    expect(percent).toStrictEqual('0%');
    expect(result.totalFailedTestCases).toStrictEqual(1);
  });
});
