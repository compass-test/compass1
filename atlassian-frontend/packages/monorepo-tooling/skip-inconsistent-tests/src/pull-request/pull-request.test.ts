import type { SimpleGit } from 'simple-git/promise';

import { AggregatedSkippedTests, Test, TestType } from '../types';

import { openPullRequestForPackage, populatePullRequest } from './pull-request';

const expectedBranchName = 'auto-skipped-tests/2017-08-16/button_T000000';
const expectedPullRequestUrl =
  'https://bitbucket.org/acme-inc/pull-requests/123';

const mockGit = ({
  checkoutBranch: jest.fn(() => Promise.resolve()),
  commit: jest.fn(() => Promise.resolve('abc123')),
  push: jest.fn(() => Promise.resolve()),
  add: jest.fn(() => Promise.resolve()),
  raw: jest.fn(() => Promise.resolve()),
} as unknown) as SimpleGit;

class MockPullRequestClient {
  async create() {
    return {
      links: {
        html: {
          href: expectedPullRequestUrl,
        },
      },
    };
  }
}

jest.mock('@atlaskit/build-utils/bitbucket', () => {
  return {
    __esModule: true,
    PullRequestClient: jest
      .fn()
      .mockImplementation(() => new MockPullRequestClient()),
  };
});

function generateTest(type: TestType, index: number, skipped = true): Test {
  return {
    path: `path/${type}-test-${index}.ts`,
    testName: 'did fail',
    ancestorLabels: '',
    errors: ['do, or do not. There is no try'],
    skipped,
  };
}

describe('pull requests', () => {
  let consoleSpy: jest.SpyInstance;
  beforeAll(() => {
    // Silence logs
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((_msg: string) => {});
  });
  afterEach(() => {
    consoleSpy.mockClear();
    for (let cmd of Object.values(mockGit)) {
      cmd.mockClear();
    }
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('openPullRequestForPackage', () => {
    it('should generate an appropriate branch name', async () => {
      const { branch } = await openPullRequestForPackage(
        mockGit,
        '@atlaskit/button',
        1,
      );
      expect(branch).toBe(expectedBranchName);
    });
    it('should open a PR for a package', async () => {
      const { url } = await openPullRequestForPackage(
        mockGit,
        '@atlaskit/button',
        1,
      );
      expect(url).toBe(expectedPullRequestUrl);
    });
  });

  describe('populatePullRequest', () => {
    const mockGitWithFiles = ({
      ...mockGit,
      raw: jest.fn((params: string[]) => {
        if (params && params.join(' ') === 'diff --cached --numstat') {
          // Appease the staged files check
          return Promise.resolve(
            `3\t\t2\t\tpackages/foo/src/bar.ts\n5\t\t3\t\tpackages/foo/src/baz.ts`,
          );
        }
        return Promise.resolve();
      }),
    } as unknown) as SimpleGit;

    afterEach(() => {
      for (let cmd of Object.values(mockGitWithFiles)) {
        cmd.mockClear();
      }
    });

    it(`should abort prematurely if there aren't any tests to process`, async () => {
      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation((_msg: string) => {});
      const noTests: Test[] = [];
      const populated = await populatePullRequest(
        mockGit,
        expectedBranchName,
        noTests,
        true,
      );
      expect(populated).toBe(false);
      expect(consoleWarnSpy).toHaveBeenNthCalledWith(
        1,
        'No skipped tests to commit. Aborting early.',
      );
    });

    it(`should abort prematurely if there aren't any staged files (because codemods failed to run)`, async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation((_msg: string) => {});
      const data: AggregatedSkippedTests = {
        integration: [generateTest('integration', 1, false)],
        total: 1,
      };
      const testsUnmodifiedByCodemods = [...(data.integration || [])].filter(
        test => test.skipped === false,
      );
      const populated = await populatePullRequest(
        mockGit,
        expectedBranchName,
        testsUnmodifiedByCodemods,
        true,
      );
      expect(populated).toBe(false);
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(
        1,
        'Nothing to commit despite apparently having skipped tests. Aborting early.',
      );
      consoleErrorSpy.mockRestore();
    });

    it('should stage files for all skipped tests', async () => {
      const data: AggregatedSkippedTests = {
        vr: [generateTest('vr', 1), generateTest('vr', 2)],
        integration: [
          generateTest('integration', 1),
          generateTest('integration', 2),
        ],
        mobile: [generateTest('mobile', 1)],
        total: 5,
      };
      const testsSkippedByCodemods = [
        ...(data.vr || []),
        ...(data.integration || []),
        ...(data.mobile || []),
      ];

      const populated = await populatePullRequest(
        mockGitWithFiles,
        expectedBranchName,
        testsSkippedByCodemods,
        true,
      );
      expect(populated).toBe(true);
      expect(mockGit.add).toBeCalledTimes(data.total);
      expect(mockGit.add).toHaveBeenNthCalledWith(1, 'path/vr-test-1.ts');
      expect(mockGit.add).toHaveBeenNthCalledWith(2, 'path/vr-test-2.ts');
      expect(mockGit.add).toHaveBeenNthCalledWith(
        3,
        'path/integration-test-1.ts',
      );
      expect(mockGit.add).toHaveBeenNthCalledWith(
        4,
        'path/integration-test-2.ts',
      );
      expect(mockGit.add).toHaveBeenNthCalledWith(5, 'path/mobile-test-1.ts');
    });

    it('should ignore tests which failed to be skipped by codemods', async () => {
      const data: AggregatedSkippedTests = {
        integration: [
          generateTest('integration', 1, false),
          generateTest('integration', 2),
        ],
        total: 2,
      };
      const testsSkippedByCodemods = [
        ...(data.vr || []),
        ...(data.integration || []),
        ...(data.mobile || []),
      ].filter(test => test.skipped === true);

      const populated = await populatePullRequest(
        mockGitWithFiles,
        expectedBranchName,
        testsSkippedByCodemods,
        true,
      );
      expect(populated).toBe(true);
      expect(mockGit.add).toBeCalledTimes(1);
      expect(mockGit.add).toHaveBeenNthCalledWith(
        1,
        'path/integration-test-2.ts',
      );
    });
  });
});
