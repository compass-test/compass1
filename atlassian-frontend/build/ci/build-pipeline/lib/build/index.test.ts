import { execSync } from 'child_process';
import os from 'os';
import path from 'path';

import fse from 'fs-extra';
import rimraf from 'rimraf';

import runCommands from '@atlaskit/build-utils/runCommands';

import * as lintTypeDeclarations from './lint-type-declarations';

import buildPkg from './index';

jest.mock('@atlaskit/build-utils/runCommands', () => {
  const actualModule = jest.requireActual('@atlaskit/build-utils/runCommands');
  return {
    __esModule: true,
    default: jest.fn((...args) => actualModule.default(...args)),
  };
});

const fixtureDir = path.join(__dirname, '..', '..', '__fixtures__');

const tmpDirs: string[] = [];

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

async function setupProject(project: string, runBolt = false) {
  const tmpDir = await copyFixtureIntoTempDir(path.join(fixtureDir, project));

  if (runBolt) {
    execSync('bolt', { cwd: tmpDir });
  }

  await fse.mkdirp(path.join(tmpDir, 'node_modules'));

  // Required to resolve the babel typescript preset in the fixture babel config so that we can run babel
  await fse.symlink(
    path.resolve(`${__dirname}/../../../../../node_modules/@babel`),
    path.join(tmpDir, 'node_modules', '@babel'),
  );

  return tmpDir;
}

afterAll(() => {
  for (const dir of tmpDirs) {
    rimraf.sync(dir);
  }
});

describe('BuildPkg', () => {
  let tmpFixturePath: string;
  let consoleErrorSpy: jest.SpyInstance<
    ReturnType<Console['error']>,
    Parameters<Console['error']>
  >;
  let consoleLogSpy: jest.SpyInstance<
    ReturnType<Console['log']>,
    Parameters<Console['log']>
  >;
  beforeAll(() => {
    // Comment out the mockImplementation to read console.logs for debugging
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error');
  });
  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
  beforeEach(async () => {
    tmpFixturePath = await setupProject('project');
    jest.clearAllMocks();
  });

  it('should generate entry points', async () => {
    const pkgPath = path.join(tmpFixturePath, 'packages', 'a-team', 'bar');
    const entryExistsBefore = fse.existsSync(path.join(pkgPath, 'my-entry'));
    expect(entryExistsBefore).toBe(false);
    await buildPkg({ cwd: pkgPath });

    const entryExistsAfter = fse.existsSync(path.join(pkgPath, 'my-entry'));
    expect(entryExistsAfter).toBe(true);

    const entryPkgJson = await fse.readFile(
      path.join(pkgPath, 'my-entry', 'package.json'),
      'utf8',
    );
    expect(JSON.parse(entryPkgJson)).toEqual({
      name: '@af/bar/my-entry',
      main: '../dist/cjs/entry.js',
      module: '../dist/esm/entry.js',
      'module:es2019': '../dist/es2019/entry.js',
      types: '../dist/types/entry.d.ts',
    });
  });

  it('should run babel and tsc to transpile a TS package', async () => {
    const pkgPath = path.join(tmpFixturePath, 'packages', 'a-team', 'bar');
    const distPath = path.join(pkgPath, 'dist');
    const distExistsBefore = fse.existsSync(distPath);
    expect(distExistsBefore).toBe(false);

    await buildPkg({ cwd: pkgPath });

    const distExistsAfter = fse.existsSync(distPath);
    expect(distExistsAfter).toBe(true);

    const distContents = await fse.readdir(path.join(distPath, 'cjs'));
    expect(distContents).toContain('index.js');

    expect((runCommands as jest.Mock).mock.calls[0][0]).toMatchSnapshot();
  });

  it('should run babel to transpile a JS package', async () => {
    const pkgPath = path.join(tmpFixturePath, 'packages', 'a-team', 'foo');
    const distPath = path.join(pkgPath, 'dist');
    const distExistsBefore = fse.existsSync(distPath);
    expect(distExistsBefore).toBe(false);

    await buildPkg({ cwd: pkgPath });

    const distExistsAfter = fse.existsSync(distPath);
    expect(distExistsAfter).toBe(true);

    const distContents = await fse.readdir(path.join(distPath, 'cjs'));
    expect(distContents).toContain('index.js');

    const firstRunCommandsCall = (runCommands as jest.Mock).mock.calls[0];

    expect(firstRunCommandsCall[0]).toMatchSnapshot();
  });

  it('should run postbuild task if package has one', async () => {
    const pkgPath = path.join(
      tmpFixturePath,
      'packages',
      'a-team',
      'pkg-with-postbuild',
    );
    const filepath = path.join(pkgPath, 'dist', 'some_file.png');
    const fileExistsBefore = fse.existsSync(filepath);
    expect(fileExistsBefore).toBe(false);

    await buildPkg({ cwd: pkgPath });

    const fileExistsAfter = fse.existsSync(filepath);
    expect(fileExistsAfter).toBe(true);

    const secondRunCommandsCall = (runCommands as jest.Mock).mock.calls[1];

    expect(secondRunCommandsCall[0]).toEqual(['yarn ak-postbuild']);
  });

  it('should lint TS declaration files', async () => {
    tmpFixturePath = await setupProject('project-with-errors', true);
    const pkgPath = path.join(
      tmpFixturePath,
      'packages',
      'a-team',
      'has-deep-import',
    );

    await buildPkg({
      cwd: path.join(tmpFixturePath, 'packages', 'a-team', 'foo'),
    });

    await expect(buildPkg({ cwd: pkgPath })).rejects.toThrowError(
      /Found occurrences of deep import paths in type declaration files./,
    );
  });

  it('should only lint TS declaration files for the specific package its building', async () => {
    tmpFixturePath = await setupProject('project-with-errors', true);
    const spy = jest.spyOn(lintTypeDeclarations, 'lintTypeDeclarations');
    expect(spy).not.toHaveBeenCalled();
    const cwd = path.join(tmpFixturePath, 'packages', 'a-team', 'foo');
    await buildPkg({
      cwd,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ cwd, pkgDir: cwd });
    spy.mockRestore();
  });

  it('should detect malformed dists due to relative imports', async () => {
    tmpFixturePath = await setupProject('project-with-errors');
    const pkgPath = path.join(
      tmpFixturePath,
      'packages',
      'a-team',
      'relative-imports',
    );

    await expect(buildPkg({ cwd: pkgPath })).rejects.toThrowError(
      /errors detected in package dists./,
    );
  });

  it('should detect invalid export declarations', async () => {
    tmpFixturePath = await setupProject('project-with-errors');
    const pkgPath = path.join(
      tmpFixturePath,
      'packages',
      'a-team',
      'invalid-declarations',
    );

    const errors = [
      'Entry point names must either be "." or start with "./", found "wrong"',
      'Entry point names can only be one level deep, found "./deep/entry"',
      'Entry point source locations must live in ./src/ unless the name is the same as the path (e.g. "./glyph": "./glyph"), found "./non-src-different-name": "./non-src"',
      'Entry point source location does not exist: "./src/non-existant"',
    ].map(
      err =>
        `@atlassian/invalid-declarations: Entry point failed validation: ${err}`,
    );

    await expect(buildPkg({ cwd: pkgPath })).rejects.toThrowError(
      `Encountered the following entry point errors:\n${errors.join('\n')}`,
    );
  });
});
