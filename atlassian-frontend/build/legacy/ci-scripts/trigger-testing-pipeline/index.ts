import path from 'path';

import { triggerPipeline } from '@atlaskit/build-utils/bitbucket';
import { containsBranchPrefix } from '@atlaskit/build-utils/branchPrefixes';
import {
  getBaseBranch,
  getChangedFilesSince,
  getRef,
} from '@atlaskit/build-utils/git';

const BRANCH_PREFIX_OPTOUTS = ['renovate/', 'merge-branch/'];
const BRANCH_EXACT_OPTOUTS = ['master', 'develop'];

const testTypes = ['webdriver', 'visual-regression'] as const;
export type TestType = typeof testTypes[number];

function assertTestType(type: string): asserts type is TestType {
  if (!testTypes.includes(type as any)) {
    throw new Error(`Invalid test type "${type}"`);
  }
}

function isTestFile(filePath: string) {
  const testFilesRegex = /\.(js(x)?|ts(x)?)$/gi;
  const isBrowserTest =
    filePath.includes('__tests__/integration/') ||
    filePath.includes('__tests__/visual-regression/');
  const fileName = path.parse(filePath).base;
  // We only include tests files and exclude utils files started with `_fileName`.
  return (
    isBrowserTest && testFilesRegex.test(filePath) && !fileName.startsWith('_')
  );
}

function isEditorMedia(filePath: string) {
  return (
    filePath.includes('packages/editor/') ||
    filePath.includes('packages/media/')
  );
}

export function filterTests(files: string[], type: TestType) {
  const filteredTests = files.filter(filePath => {
    if (isTestFile(filePath)) {
      const folder = type === 'webdriver' ? 'integration' : 'visual-regression';
      const matchingTestType = filePath.includes(folder);
      if (type === 'webdriver') {
        return isEditorMedia(filePath) && matchingTestType;
      }
      return matchingTestType;
    }
  });
  // Test files are space separated.
  return filteredTests;
}

async function getChangedTestFilesSinceBaseBranch(
  type: TestType,
): Promise<string[]> {
  const baseBranch = await getBaseBranch();
  const ref = await getRef(baseBranch);

  const changedFiles: string[] = (
    await getChangedFilesSince(ref, true)
  ).map((filePath: string) => path.relative(process.cwd(), filePath));

  return filterTests(changedFiles, type);
}

async function main(type: TestType) {
  const { BITBUCKET_BRANCH } = process.env;

  if (!BITBUCKET_BRANCH) {
    throw new Error('Missing $BITBUCKET_BRANCH env variable');
  }

  if (
    containsBranchPrefix(BITBUCKET_BRANCH, BRANCH_PREFIX_OPTOUTS) ||
    BRANCH_EXACT_OPTOUTS.some(name => BITBUCKET_BRANCH === name)
  ) {
    console.log(
      'Skipping flakey tests pipeline due to escape-hatch branch prefix',
    );
    return;
  }

  const pipeline =
    type === 'webdriver' ? 'build-webdriver' : 'build-visual-regression';

  const changedTestFiles = await getChangedTestFilesSinceBaseBranch(type);

  if (changedTestFiles.length === 0) {
    console.log('Skipping flakey tests pipeline due to no changed files');
    return;
  }

  await triggerPipeline({
    pipeline,
    variables: [
      {
        key: 'TEST_FILES',
        value: changedTestFiles.join(' '),
      },
      {
        key: 'REPETITIONS',
        value: '5',
      },
    ],
  });
}

if (require.main === module) {
  const type = process.argv[2];
  assertTestType(type);

  main(type).catch(e => {
    if (e.response) {
      console.error(e.response);
    } else {
      console.error(e);
    }
    process.exit(1);
  });
}
