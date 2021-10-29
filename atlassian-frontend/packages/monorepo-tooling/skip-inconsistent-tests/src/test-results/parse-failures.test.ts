import {
  ERROR_STACK_TRACE,
  XML_STRING_WITH_BS_SESSION_TIMEOUT,
  XML_STRING_WITH_FAILURE_TESTS,
  XML_STRING_WITHOUT_FAILURE_TESTS,
  XML_STRING_WITHOUT_TESTS,
} from './__tests__/__fixtures__/test-data';
import { parseFailureTests } from './parse-failures';

describe('parseFailureTests', () => {
  beforeAll(() => {
    // Silence warning log for the abort early test case
    jest.spyOn(console, 'info').mockImplementation((_msg: string) => {});
    jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
  });
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should return an array of objects with failed test path', async () => {
    const expectedResult = [
      {
        path:
          'packages/design-system/form/src/__tests__/integration/text-fields.ts',
        testName:
          'Pressing ctrl + enter in the text area should focus on invalid field',
        ancestorLabels: 'text-fields.ts › Windows 10 chrome 89.0',
        errors: [ERROR_STACK_TRACE],
      },
    ];
    const { skippableTestCases } = await parseFailureTests(
      XML_STRING_WITH_FAILURE_TESTS(false),
    );
    expect(skippableTestCases).toStrictEqual(expectedResult);
  });

  it('should decode HTML entities from the XML within the returned JSON', async () => {
    const expectedResult = [
      {
        path:
          'packages/design-system/form/src/__tests__/integration/text-fields.ts',
        testName: `Pressing ctrl + enter in the text area shouldn't focus on invalid field`,
        ancestorLabels: 'text-fields.ts › Windows 10 chrome 89.0',
        errors: [ERROR_STACK_TRACE],
      },
    ];
    const { skippableTestCases } = await parseFailureTests(
      XML_STRING_WITH_FAILURE_TESTS(true),
    );
    expect(skippableTestCases).toStrictEqual(expectedResult);
  });

  it('should ignore BrowserStack session not started errors', async () => {
    const consoleSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation((_msg: string) => {});
    const { skippableTestCases } = await parseFailureTests(
      XML_STRING_WITH_BS_SESSION_TIMEOUT,
    );
    expect(skippableTestCases).toStrictEqual([]);
    consoleSpy.mockRestore();
  });

  it('should return empty array when no tests are failing', async () => {
    const { skippableTestCases } = await parseFailureTests(
      XML_STRING_WITHOUT_FAILURE_TESTS,
    );
    expect(skippableTestCases).toStrictEqual([]);
  });

  it('should return empty array when the junit report has no data', async () => {
    const { skippableTestCases } = await parseFailureTests(
      XML_STRING_WITHOUT_TESTS,
    );
    expect(skippableTestCases).toStrictEqual([]);
  });
});
