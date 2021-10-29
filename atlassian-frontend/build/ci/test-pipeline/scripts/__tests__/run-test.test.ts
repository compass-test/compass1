import { execSync } from 'child_process';
import os from 'os';
import path from 'path';

import fse from 'fs-extra';
import rimraf from 'rimraf';

import { Cache, Logger } from '@af/cache';

import { TEST_CACHE_VERSION } from '../../lib/cache';
import { runJestCli } from '../../lib/test/run-jest-cli';
import runTests, { FailingTestsError } from '../run-test';

jest.mock('@af/cache');
jest.mock('../../lib/test/run-jest-cli', () => ({
  runJestCli: jest.fn(),
  getTestTypeFlags: jest.fn(),
}));

const rootDir = path.resolve(__dirname, '..', '..', '..', '..', '..');
const fixtureDir = path.resolve(__dirname, '..', '..', '__fixtures__');

const tmpDirs: string[] = [];
type Metadata = { [key: string]: string } | null;
const metadata: Metadata = {
  version: '2.0.0',
  branch: 'test-branch',
  pipeline: 'test-pipeline',
};

async function createTmpDir(prefix: string) {
  const dir = await fse.mkdtemp(path.join(os.tmpdir(), prefix));
  tmpDirs.push(dir);
  return dir;
}

async function copyFixtureIntoTempDir(project: string) {
  const tmpDir = await createTmpDir('af-fixture');
  await fse.copy(path.join(fixtureDir, project), tmpDir);

  return tmpDir;
}

async function setupProject(project: string) {
  const tmpDir = await copyFixtureIntoTempDir(project);

  // Copy .gitignore across so the file hashing is accurate (as it ignores gitignored files)
  await fse.copy(
    path.join(rootDir, '.gitignore'),
    path.join(tmpDir, '.gitignore'),
  );

  // We need a git repo for caching to work
  execSync('git init', { cwd: tmpDir, stdio: 'ignore' });
  execSync('git add .', { cwd: tmpDir, stdio: 'ignore' });
  execSync('git commit -m "Initial commit"', { cwd: tmpDir, stdio: 'ignore' });

  return tmpDir;
}

beforeAll(() => {
  // Ensure that cache feature flag is always on for tests
  process.env.AF_TEST_CACHE_VERSION = `${TEST_CACHE_VERSION}`;
  // Cache is automatically disabled when running in parallel so delete these
  delete process.env.PARALLELIZE_TESTS;
  delete process.env.PARALLELIZE_TESTS_FILE;
});

afterAll(() => {
  for (const dir of tmpDirs) {
    rimraf.sync(dir);
  }
});

describe('Run test', () => {
  let tmpFixturePath: string;
  let actualCache: Cache;
  let mockCache: Partial<Cache>;

  const OLD_ENV = process.env;
  const OLD_CHDIR = process.chdir;

  beforeEach(async () => {
    jest.resetAllMocks();
    // Reset env vars - in particular the CHANGED_PACKAGES env var
    process.env = { ...OLD_ENV };
    process.chdir = () => {};
    // Delete this env var so CI doesn't pollute the test state
    delete process.env.CHANGED_PACKAGES;
    mockCache = {};
    (Logger as jest.Mock).mockImplementation(
      (...args) => new (jest.requireActual('@af/cache').Logger)(...args),
    );
    (Cache as jest.Mock).mockImplementation((config = {}, ...rest) => {
      const { Cache: ActualCache } = jest.requireActual('@af/cache');
      actualCache = new ActualCache(
        {
          ...config,
          remoteStore: undefined,
          logLevel: 'off',
          implicitDependencies: {},
        },
        ...rest,
      );
      const hashes: Record<string, Metadata> = {};
      mockCache = {
        init: () => actualCache.init(),
        computeHash: jest.fn((packageName: string, salt?: string[]) =>
          actualCache.computeHash(packageName, salt),
        ),
        fetch: jest.fn(
          async (packageName: string, hash: string) => hashes[hash],
        ),
        put: jest.fn(async (packageName, hash) => {
          hashes[hash] = metadata;
          return metadata;
        }),
        logger: actualCache.logger,
        ...mockCache,
      } as any;
      return mockCache;
    });
    (runJestCli as jest.Mock).mockImplementation(() => {
      return Promise.resolve({
        exitCode: 0,
        results: [{ aggregatedResult: { success: true, testResults: [] } }],
      });
    });
  });

  afterEach(() => {
    process.env = OLD_ENV;
    process.chdir = OLD_CHDIR;
  });

  describe('Project fixture', () => {
    beforeEach(async () => {
      tmpFixturePath = await setupProject('project');
    });

    it('should run tests and exit successfully by default', async () => {
      expect(runJestCli).toHaveBeenCalledTimes(0);
      await expect(
        runTests({ cwd: tmpFixturePath }, {}),
      ).resolves.not.toThrow();
      expect(runJestCli).toHaveBeenCalledTimes(1);
    });

    it('should throw when tests return a non-zero exit exitCode', async () => {
      (runJestCli as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          exitCode: 1,
          results: [{ aggregatedResult: { success: false, testResults: [] } }],
        });
      });
      await expect(runTests({ cwd: tmpFixturePath }, {})).rejects.toThrow();
    });

    it('should throw when exit exitCode is undefined but test results are unsuccessful', async () => {
      (runJestCli as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          exitCode: undefined,
          results: [{ aggregatedResult: { success: false, testResults: [] } }],
        });
      });
      await expect(runTests({ cwd: tmpFixturePath }, {})).rejects.toThrow();
    });

    it('should not cache by default', async () => {
      expect(Cache).not.toHaveBeenCalled();
      await runTests({ cwd: tmpFixturePath }, {});
      expect(Cache).not.toHaveBeenCalled();
    });

    describe('Cache', () => {
      it('should cache when the --cached flag is passed', async () => {
        expect(Cache).not.toHaveBeenCalled();
        await runTests({ cwd: tmpFixturePath, cached: true }, {});
        expect(Cache).toHaveBeenCalledTimes(1);
      });

      it('should populate CHANGED_PACKAGES env var with packages to be tested', async () => {
        expect(process.env.CHANGED_PACKAGES).toBeUndefined();
        await runTests({ cwd: tmpFixturePath, cached: true }, {});
        expect(process.env.CHANGED_PACKAGES).toBe(
          JSON.stringify(['packages/a-team/bar', 'packages/a-team/foo']),
        );
      });

      it('should filter out packages that are cached in CHANGED_PACKAGES env var', async () => {
        mockCache.fetch = jest.fn(async packageName => {
          return packageName === '@af/foo' ? metadata : null;
        });
        expect(process.env.CHANGED_PACKAGES).toBeUndefined();
        await runTests({ cwd: tmpFixturePath, cached: true }, {});
        expect(process.env.CHANGED_PACKAGES).toBe(
          JSON.stringify(['packages/a-team/bar']),
        );
      });

      it('should store test executions for successful packages in the cache', async () => {
        mockCache.fetch = jest.fn(async packageName => {
          return packageName === '@af/foo' ? metadata : null;
        });
        process.env.BITBUCKET_COMMIT = 'abcdef';
        process.env.BITBUCKET_PIPELINE_UUID = '123';
        process.env.BITBUCKET_BRANCH = 'test';

        await runTests({ cwd: tmpFixturePath, cached: true }, {});
        expect(mockCache.put).toHaveBeenCalledTimes(1);
        const computeHashMock = mockCache.computeHash as jest.Mock;
        const barHashIdx = computeHashMock.mock.calls.findIndex(
          args => args[0] === '@af/bar',
        );

        expect(mockCache.put).toHaveBeenCalledWith(
          '@af/bar',
          await computeHashMock.mock.results[barHashIdx].value,
          {
            commit: 'abcdef',
            pipeline: '123',
            branch: 'test',
          },
        );
      });

      it('should not store test executions for unsuccessful packages in the cache', async () => {
        (runJestCli as jest.Mock).mockImplementation(() => {
          return Promise.resolve({
            exitCode: 1,
            results: [
              {
                aggregatedResult: {
                  success: false,
                  testResults: [
                    {
                      numFailingTests: 1,
                      failureMessage: 'Test failed',
                      testFilePath: path.join(
                        tmpFixturePath,
                        'packages',
                        'a-team',
                        'bar',
                        'src',
                        'test.ts',
                      ),
                    },
                  ],
                },
              },
            ],
          });
        });

        await expect(
          runTests({ cwd: tmpFixturePath, cached: true }, {}),
        ).rejects.toThrowError(FailingTestsError);

        expect(mockCache.put).toHaveBeenCalledTimes(1);
        expect(mockCache.put).toHaveBeenCalledWith(
          '@af/foo',
          expect.any(String),
          expect.any(Object),
        );

        expect(mockCache.put).not.toHaveBeenCalledWith(
          '@af/bar',
          expect.any(String),
          expect.any(Object),
        );
      });
    });
  });

  describe('Substring package names fixture', () => {
    beforeEach(async () => {
      tmpFixturePath = await setupProject('substring-package-names');
    });

    it('should not associate test failures to a package whose name is a substring', async () => {
      (runJestCli as jest.Mock).mockImplementation(() => {
        return Promise.resolve({
          exitCode: 1,
          results: [
            {
              aggregatedResult: {
                success: false,
                testResults: [
                  {
                    numFailingTests: 1,
                    failureMessage: 'Test failed',
                    testFilePath: path.join(
                      tmpFixturePath,
                      'packages',
                      'a-team',
                      'search-dialog',
                      'src',
                      'test.ts',
                    ),
                  },
                ],
              },
            },
          ],
        });
      });

      await expect(
        runTests({ cwd: tmpFixturePath, cached: true }, {}),
      ).rejects.toThrowError(FailingTestsError);

      expect(mockCache.put).toHaveBeenCalledTimes(1);
      expect(mockCache.put).toHaveBeenCalledWith(
        '@af/search',
        expect.any(String),
        expect.any(Object),
      );

      expect(mockCache.put).not.toHaveBeenCalledWith(
        '@af/search-dialog',
        expect.any(String),
        expect.any(Object),
      );
    });
  });
});
