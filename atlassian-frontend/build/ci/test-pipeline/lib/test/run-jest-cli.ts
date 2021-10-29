import { runCLI } from 'jest';
import cloneDeep from 'lodash/cloneDeep';

import visualRegressionRunner, {
  parseCliArgs as parseVrCliArgs,
} from '@atlaskit/visual-regression';
import webdriverRunner, {
  parseCliArgs as parseWebdriverCliArgs,
} from '@atlaskit/webdriver-runner';

import { Test, TestStatus, getTestType } from '../types';

export async function runJestCli(
  rootDir: string,
  flags: Record<string, unknown>,
  testType?: Test,
  testPattern?: string[],
): Promise<TestStatus> {
  switch (testType) {
    case 'vr':
      return await visualRegressionRunner(
        { ...flags, testDir: rootDir },
        testPattern || [],
      );
    case 'webdriver':
      return await webdriverRunner(
        { ...flags, testDir: rootDir },
        testPattern || [],
      );
    case 'unit':
    default:
      const jestFlags = lengthenShortFlags(flags);
      const { results } = await runCLI(
        {
          passWithNoTests: true,
          _: testPattern || [],
          $0: undefined as any,
          ...jestFlags,
        },
        [rootDir],
      );
      return {
        exitCode: results.success ? 0 : 1,
        results: [{ aggregatedResult: results }],
      };
  }
}

/** Jest's runCLI function does not accept short flags, this function converts it to long flags manually. runCLI is not officially supported so this is a quick fix. */
function lengthenShortFlags(
  flags: Record<string, unknown>,
): Record<string, unknown> {
  // Clone to prevent side effects
  const jestFlags = cloneDeep(flags);
  const flagMap: Record<string, string> = {
    b: 'bail',
    c: 'config',
    e: 'expand',
    i: 'runInBand',
    o: 'onlyChanged',
    t: 'testNamePattern',
    u: 'updateSnapshot',
    v: 'version',
    // -w for --watch added to keep it consistent with integration and VR test runners, it is not the standard Jest alias
    w: 'watch',
  };

  Object.keys(flags).forEach(flag => {
    const longFlag = flagMap[flag];
    if (longFlag) {
      jestFlags[longFlag] = flags[flag];
      delete jestFlags[flag];
    }
  });
  return jestFlags;
}

/** Retrieve a parsed list of flags from specific test type runners to convert flag aliases */
export function getTestTypeFlags(testTypeFlag: string, argv: string[]) {
  const testType = getTestType(testTypeFlag);
  if (testType === 'vr') {
    return parseVrCliArgs(argv).flags;
  } else if (testType === 'webdriver') {
    return parseWebdriverCliArgs(argv).flags;
  }
  return undefined;
}
