import { execSync } from 'child_process';
import os from 'os';
import path from 'path';

import * as bolt from 'bolt';
import fse from 'fs-extra';
import rimraf from 'rimraf';

import { Cache, Logger } from '@af/cache';

import buildPkg from '../../lib/build';
import runBuild from '../run-build';

jest.mock('@af/cache');
jest.mock('../../lib/build');
jest.mock('@atlaskit/build-reporting');

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

async function copyFixtureIntoTempDir(fixtureDir: string) {
  const tmpDir = await createTmpDir('af-fixture');
  await fse.copy(fixtureDir, tmpDir);

  tmpDirs.push(tmpDir);

  return tmpDir;
}

async function setupProject(project: string) {
  const tmpDir = await copyFixtureIntoTempDir(path.join(fixtureDir, project));

  // Copy template package into fixture directory
  await fse.copy(
    path.join(rootDir, 'packages', 'template-dir'),
    path.join(tmpDir, 'packages', 'template-dir'),
  );

  // Copy .gitignore across so the file hashing is accurate (as it ignores gitignored files)
  await fse.copy(
    path.join(rootDir, '.gitignore'),
    path.join(tmpDir, '.gitignore'),
  );

  // We need a git repo for caching to work
  execSync('git init', { cwd: tmpDir });
  execSync('git add .', { cwd: tmpDir });
  execSync('git commit -m "Initial commit"', { cwd: tmpDir });

  return tmpDir;
}

beforeAll(() => {
  // We want the caching in tests to occur regardless of this flag being set otherwise they will fail
  delete process.env.AF_SKIP_CACHE;
});

afterAll(() => {
  for (const dir of tmpDirs) {
    rimraf.sync(dir);
  }
});

describe('Run build', () => {
  // Number of packages in 'project' fixture, 3 in a-team plus the 1 template-package copied over
  const numberOfPackagesInFixture = 4;
  let tmpFixturePath: string;
  let boltSpy: jest.SpyInstance;
  let actualCache: Cache;
  let mockCache: Partial<Cache>;
  beforeEach(async () => {
    jest.resetAllMocks();
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
          implicitDependencies: {
            ...config.implicitDependencies,
            packages: {
              // Change implicit dependency on build-pipeline to one of the fixture packages
              '@af/foo': '*',
            },
          },
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
    tmpFixturePath = await setupProject('project');
    boltSpy = jest.spyOn(bolt, 'runWorkspaceTasks');
  });
  afterEach(() => {
    boltSpy.mockRestore();
  });

  describe('Orchestration', () => {
    it('should build all packages by default', async () => {
      const teamDir = path.resolve(tmpFixturePath, 'packages', 'a-team');
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath });
      expect(buildPkg).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(teamDir, 'foo'),
        distType: undefined,
        ignoreTsErrors: false,
      });
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(teamDir, 'bar'),
        distType: undefined,
        ignoreTsErrors: false,
      });
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(teamDir, 'pkg-with-postbuild'),
        distType: undefined,
        ignoreTsErrors: false,
      });
    });
    it('should build only specific packages if specified', async () => {
      const teamDir = path.resolve(tmpFixturePath, 'packages', 'a-team');
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild(['@af/foo'], { cwd: tmpFixturePath });
      expect(buildPkg).toHaveBeenCalledTimes(1);
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(teamDir, 'foo'),
        distType: undefined,
        ignoreTsErrors: true,
      });
    });
    it('should recognise packages specified without scope', async () => {
      const teamDir = path.resolve(tmpFixturePath, 'packages', 'a-team');
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild(['foo'], { cwd: tmpFixturePath });
      expect(buildPkg).toHaveBeenCalledTimes(1);
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(teamDir, 'foo'),
        distType: undefined,
        ignoreTsErrors: true,
      });
    });
    it('should run the build topologically by default', async () => {
      expect(boltSpy).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath });
      expect(boltSpy).toHaveBeenCalledTimes(1);
      expect(boltSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          spawnOpts: {
            excludeFromGraph: ['devDependencies'],
            orderMode: undefined,
            bail: false,
          },
        }),
      );
    });
    it('should run the build topologically when "types" distType is passed', async () => {
      expect(boltSpy).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath, distType: 'types' });
      expect(boltSpy).toHaveBeenCalledTimes(1);
      expect(boltSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          spawnOpts: {
            excludeFromGraph: ['devDependencies'],
            orderMode: undefined,
            bail: false,
          },
        }),
      );
    });
    it('should run the build in parallel when distType is passed not containing "types"', async () => {
      expect(boltSpy).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath, distType: 'cjs,esm,es2019' });
      expect(boltSpy).toHaveBeenCalledTimes(1);
      expect(boltSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          spawnOpts: {
            excludeFromGraph: ['devDependencies'],
            orderMode: 'parallel',
            bail: false,
          },
        }),
      );
    });
  });

  describe('Cache', () => {
    it('should attempt to fetch from and store to cache by default', async () => {
      expect(Cache).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath });

      expect(Cache).toHaveBeenCalledTimes(1);
      const computeHash: jest.Mock = mockCache.computeHash as jest.Mock;

      expect(computeHash).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      expect(computeHash).toHaveBeenCalledWith('@af/foo', [
        `cwd,${tmpFixturePath}`,
      ]);
      expect(computeHash).toHaveBeenCalledWith('@af/bar', [
        `cwd,${tmpFixturePath}`,
      ]);
      expect(computeHash).toHaveBeenCalledWith('@af/pkg-with-postbuild', [
        `cwd,${tmpFixturePath}`,
      ]);
      expect(mockCache.fetch).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      for (let i = 0; i < 2; i++) {
        // Each fetch call should be called with the hash returned from computeHash
        expect(mockCache.fetch).toHaveBeenCalledWith(
          computeHash.mock.calls[i][0],
          await computeHash.mock.results[i].value,
        );
      }
      expect(mockCache.put).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      for (let i = 0; i < 2; i++) {
        // Each put call should be called with the hash returned from computeHash
        expect(mockCache.put).toHaveBeenCalledWith(
          computeHash.mock.calls[i][0],
          await computeHash.mock.results[i].value,
        );
      }
    });

    it('should not build or store cache for a package if its cache was successfully fetched', async () => {
      mockCache.fetch = jest.fn(async packageName => {
        return packageName === '@af/foo' ? metadata : null;
      });
      expect(Cache).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath });

      expect(Cache).toHaveBeenCalledTimes(1);
      const computeHash: jest.Mock = mockCache.computeHash as jest.Mock;

      expect(computeHash).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      expect(mockCache.fetch).toHaveBeenCalledTimes(numberOfPackagesInFixture);
      expect(mockCache.fetch).toHaveBeenCalledWith(
        '@af/foo',
        expect.any(String),
      );

      expect(buildPkg).toHaveBeenCalledTimes(numberOfPackagesInFixture - 1);
      expect(buildPkg).not.toHaveBeenCalledWith(
        expect.objectContaining({
          cwd: path.join(tmpFixturePath, 'packages', 'a-team', 'foo'),
        }),
      );
      expect(buildPkg).toHaveBeenCalledWith(
        expect.objectContaining({
          cwd: path.join(tmpFixturePath, 'packages', 'a-team', 'bar'),
        }),
      );
      expect(mockCache.put).toHaveBeenCalledTimes(
        numberOfPackagesInFixture - 1,
      );
      expect(mockCache.put).not.toHaveBeenCalledWith(
        '@af/foo',
        expect.any(String),
      );
      expect(mockCache.put).toHaveBeenCalledWith('@af/bar', expect.any(String));
    });

    it('should skip any caching when the skipCache flag is set', async () => {
      expect(Cache).not.toHaveBeenCalled();
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild([], { cwd: tmpFixturePath, skipCache: true });
      expect(Cache).not.toHaveBeenCalled();
      expect(buildPkg).toHaveBeenCalledTimes(numberOfPackagesInFixture);
    });

    it('should skip any caching when building specific packages not in strict mode since TS errors are ignored', async () => {
      expect(Cache).not.toHaveBeenCalled();
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild(['@af/foo'], { cwd: tmpFixturePath });
      expect(Cache).not.toHaveBeenCalled();
      expect(buildPkg).toHaveBeenCalledTimes(1);
    });

    it('should not skip caching when building specific packages in strict mode', async () => {
      expect(Cache).not.toHaveBeenCalled();
      expect(buildPkg).not.toHaveBeenCalled();
      await runBuild(['@af/foo'], { cwd: tmpFixturePath, strict: true });
      expect(Cache).toHaveBeenCalled();
      const computeHash: jest.Mock = mockCache.computeHash as jest.Mock;

      expect(computeHash).toHaveBeenCalledTimes(1);
      expect(computeHash).toHaveBeenCalledWith('@af/foo', [
        `cwd,${tmpFixturePath}`,
        'strict,true',
      ]);
      expect(mockCache.fetch).toHaveBeenCalledTimes(1);
      expect(mockCache.fetch).toHaveBeenCalledWith(
        computeHash.mock.calls[0][0],
        await computeHash.mock.results[0].value,
      );
      expect(buildPkg).toHaveBeenCalledTimes(1);
      expect(buildPkg).toHaveBeenCalledWith({
        cwd: path.join(tmpFixturePath, 'packages', 'a-team', 'foo'),
        distType: undefined,
        ignoreTsErrors: false,
      });
      expect(mockCache.put).toHaveBeenCalledTimes(1);
      expect(mockCache.put).toHaveBeenCalledWith(
        computeHash.mock.calls[0][0],
        await computeHash.mock.results[0].value,
      );
    });

    it('should store the build output of both generated dist and entry point directories', async () => {
      expect(Cache).not.toHaveBeenCalled();
      // Use the full local cache implementation locally
      (Cache as jest.Mock).mockImplementation(
        (config: any = {}, ...rest: any[]) => {
          const { Cache: ActualCache } = jest.requireActual('@af/cache');
          actualCache = new ActualCache(
            {
              ...config,
              remoteStore: undefined,
              logLevel: 'off',
              implicitDependencies: {
                ...config.implicitDependencies,
                packages: {
                  // Change implicit dependency on build-pipeline to one of the fixture packages
                  '@af/foo': '*',
                },
              },
            },
            ...rest,
          );

          mockCache = {
            init: jest.fn(() => actualCache.init()),
            fetch: jest.fn((packageName: string, hash: string) =>
              actualCache.fetch(packageName, hash),
            ),
            put: jest.fn((packageName: string, hash: string) =>
              actualCache.put(packageName, hash),
            ),
            computeHash: jest.fn((packageName: string, salt?: string[]) =>
              actualCache.computeHash(packageName, salt),
            ),
            logger: actualCache.logger,
          };

          return mockCache;
        },
      );
      expect(
        fse.existsSync(
          path.join(tmpFixturePath, 'node_modules', '.cache', 'af-cache'),
        ),
      ).toBe(false);

      // Mock some build output since we mock buildPkg but still want to test what the cache does
      // with the build output
      const barPath = path.join(tmpFixturePath, 'packages', 'a-team', 'bar');
      await Promise.all([
        fse.outputFile(path.join(barPath, 'dist', 'cjs', 'index.js'), '// foo'),
        fse.outputFile(path.join(barPath, 'dist', 'foo.js'), '// foo'),
        fse.outputFile(path.join(barPath, 'my-entry', 'package.json'), '{}'),
        fse.outputFile(path.join(barPath, 'random-non-dist-file.js'), '// foo'),
      ]);

      await runBuild([], { cwd: tmpFixturePath });

      expect(Cache).toHaveBeenCalledTimes(1);

      const mockComputeHash = mockCache.computeHash as jest.Mock;
      const barComputeHashCallIdx = mockComputeHash.mock.calls.findIndex(
        (args: any) => args[0] === '@af/bar',
      );
      expect(barComputeHashCallIdx).toBeGreaterThan(-1);
      const barPkgHash = await mockComputeHash.mock.results[
        barComputeHashCallIdx
      ].value;
      const barOutputCacheDir = path.join(
        tmpFixturePath,
        'node_modules',
        '.cache',
        'af-cache',
        barPkgHash,
        'output',
      );

      expect(
        fse.existsSync(path.join(barOutputCacheDir, 'dist', 'cjs', 'index.js')),
      ).toBe(true);
      expect(
        fse.existsSync(path.join(barOutputCacheDir, 'dist', 'foo.js')),
      ).toBe(true);
      expect(
        fse.existsSync(
          path.join(barOutputCacheDir, 'my-entry', 'package.json'),
        ),
      ).toBe(true);
      expect(
        fse.existsSync(path.join(barOutputCacheDir, 'random-non-dist-file.js')),
      ).toBe(false);
    });
  });

  /**
   * We use the template-package in packages to test against a 'real-world' package in the repo with the assumption
   * that it will be kept up to date more than a test fixture in the build pipeline.
   * This comes at the cost of relying on the template-package file structure but that is an acceptable trade off to
   * make.
   */
  describe('Cache invalidation', () => {
    let templatePackageDir: string;
    beforeEach(() => {
      templatePackageDir = path.join(
        tmpFixturePath,
        'packages',
        'template-dir',
        'template-package',
      );
    });
    describe('should invalidate the cache when changing', () => {
      [
        {
          name: 'src file',
          filepath: path.join('src', 'index.ts'),
        },
        {
          name: 'nested src file',
          filepath: path.join('src', 'ui', 'template-package', 'types.tsx'),
        },
        {
          name: 'build/tsconfig.json',
          filepath: path.join('build', 'tsconfig.json'),
        },
        {
          name: 'tsconfig.json',
          filepath: 'tsconfig.json',
        },
        {
          name: 'package.json',
          filepath: 'package.json',
        },
        {
          name: 'non-src build file i.e scripts/run-build.ts',
          filepath: path.join('scripts', 'custom-script.ts'),
        },
      ].forEach(({ name, filepath }) => {
        it(name, async () => {
          expect(Cache).not.toHaveBeenCalled();
          await runBuild([], { cwd: tmpFixturePath });

          expect(buildPkg).toHaveBeenCalledWith(
            expect.objectContaining({
              cwd: templatePackageDir,
            }),
          );

          // Should not run build again when no changes made
          jest.clearAllMocks();
          expect(buildPkg).not.toHaveBeenCalled();
          await runBuild([], { cwd: tmpFixturePath });
          expect(buildPkg).not.toHaveBeenCalled();

          // newline char is a safe modification to all kinds of files
          await fse.appendFile(path.join(templatePackageDir, filepath), '\n');
          // Should run build again after making a change
          await runBuild([], { cwd: tmpFixturePath });
          expect(buildPkg).toHaveBeenCalledTimes(1);
          expect(buildPkg).toHaveBeenCalledWith(
            expect.objectContaining({
              cwd: templatePackageDir,
            }),
          );
        });
      });
    });

    describe('should NOT invalidate the cache when changing', () => {
      [
        {
          name: 'docs',
          filepath: path.join('docs', '0-intro.tsx'),
        },
        {
          name: 'examples',
          filepath: path.join('examples', '00-basic.tsx'),
        },
        {
          name: 'unit tests',
          filepath: path.join('__tests__', 'unit', 'ssr.tsx'),
        },
        {
          name: 'integration tests',
          filepath: path.join('__tests__', 'integration', 'index.ts'),
        },
        {
          name: 'vr tests',
          filepath: path.join('__tests__', 'visual-regression', 'index.ts'),
        },
        {
          name: 'co-located test',
          filepath: path.join('src', 'ui', 'template-package', 'test.tsx'),
        },
        {
          name: 'README',
          filepath: 'README.md',
        },
        {
          name: 'CHANGELOG',
          filepath: 'CHANGELOG.md',
        },
        {
          name: 'npmignore',
          // Even though this changes what gets uploaded to npm, it doesn't affect the build output itself
          filepath: '.npmignore',
        },
      ].forEach(({ name, filepath }) => {
        it(name, async () => {
          expect(Cache).not.toHaveBeenCalled();
          await runBuild([], { cwd: tmpFixturePath });

          expect(buildPkg).toHaveBeenCalledWith(
            expect.objectContaining({
              cwd: templatePackageDir,
            }),
          );

          // Should not run build again when no changes made
          jest.clearAllMocks();
          expect(buildPkg).not.toHaveBeenCalled();
          await runBuild([], { cwd: tmpFixturePath });
          expect(buildPkg).not.toHaveBeenCalled();

          await fse.appendFile(path.join(templatePackageDir, filepath), '\n');

          await runBuild([], { cwd: tmpFixturePath });
          expect(buildPkg).not.toHaveBeenCalled();
        });
      });
    });

    describe('implicitDependencies', () => {
      it('should invalidate the cache for all packages when changing root tsconfig.json', async () => {
        expect(Cache).not.toHaveBeenCalled();
        await runBuild([], { cwd: tmpFixturePath });

        expect(buildPkg).toHaveBeenCalledWith(
          expect.objectContaining({
            cwd: templatePackageDir,
          }),
        );

        // Should not run build again when no changes made
        jest.clearAllMocks();
        expect(buildPkg).not.toHaveBeenCalled();
        await runBuild([], { cwd: tmpFixturePath });
        expect(buildPkg).not.toHaveBeenCalled();

        await fse.appendFile(path.join(tmpFixturePath, 'tsconfig.json'), '\n');
        // Should run build again after making a change
        await runBuild([], { cwd: tmpFixturePath });
        expect(buildPkg).toHaveBeenCalledTimes(numberOfPackagesInFixture);
        expect(buildPkg).toHaveBeenCalledWith(
          expect.objectContaining({
            cwd: templatePackageDir,
          }),
        );
      });

      /* We've overridden the cache config to make the foo package the implicit dependency rather than build pipeline to make
       * testing easier */
      it('should invalidate the cache for all packages when changing the "foo" package implicit dependency', async () => {
        expect(Cache).not.toHaveBeenCalled();
        await runBuild([], { cwd: tmpFixturePath });

        expect(buildPkg).toHaveBeenCalledWith(
          expect.objectContaining({
            cwd: templatePackageDir,
          }),
        );

        // Should not run build again when no changes made
        jest.clearAllMocks();
        expect(buildPkg).not.toHaveBeenCalled();
        await runBuild([], { cwd: tmpFixturePath });
        expect(buildPkg).not.toHaveBeenCalled();

        await fse.appendFile(
          path.join(
            tmpFixturePath,
            'packages',
            'a-team',
            'foo',
            'package.json',
          ),
          '\n',
        );
        // Should run build again after making a change
        await runBuild([], { cwd: tmpFixturePath });
        expect(buildPkg).toHaveBeenCalledTimes(numberOfPackagesInFixture);
        expect(buildPkg).toHaveBeenCalledWith(
          expect.objectContaining({
            cwd: templatePackageDir,
          }),
        );
      });
    });
  });
});
