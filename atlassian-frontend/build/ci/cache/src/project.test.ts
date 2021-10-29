import { Config } from './config';
import { Logger } from './logger';
import { getProject } from './project';

const fixtureDir = `${__dirname}/../__fixtures__/project`;

describe('getProject', () => {
  const logger = new Logger('off');
  let config: Config;
  beforeEach(() => {
    config = {
      logLevel: 'off',
      cacheDirectory: 'node_modules/.cache/af-cache',
      outputGlobs: [],
      excludeGlobs: [],
      implicitDependencies: {},
    };
  });
  it('should return the root bolt project', async () => {
    const project = await getProject(
      config,
      logger,
      `${fixtureDir}/packages/foo`,
    );
    expect(project).toMatchObject({
      root: {
        config: { name: '@af/fixture-project' },
        name: '@af/fixture-project',
      },
    });
  });
  it('should return the bolt workspaces', async () => {
    const project = await getProject(
      config,
      logger,
      `${fixtureDir}/packages/foo`,
    );
    expect(project.workspaces.get('@af/foo')).toMatchObject({
      name: '@af/foo',
      config: {
        name: '@af/foo',
        dependencies: {
          lodash: '^4.17.15',
        },
      },
    });
    expect(project.workspaces.has('@af/bar')).toBe(true);
    expect(project.workspaces.has('@af/baz')).toBe(true);
  });

  it('should return workspaces passed in as argument, if available', async () => {
    const workspace = {
      name: '@af/passed-in',
      dir: fixtureDir,
      config: { name: '@af/passed-in' },
    };
    const project = await getProject(
      config,
      logger,
      `${fixtureDir}/packages/foo`,
      [workspace],
    );

    expect(project.workspaces.size).toBe(1);
    expect(project.workspaces.get('@af/passed-in')).toEqual(workspace);
  });

  it('should return parsed lockfile', async () => {
    const project = await getProject(
      config,
      logger,
      `${fixtureDir}/packages/foo`,
    );

    expect(project.resolvedDependencies).toMatchSnapshot();
  });

  it('should return git hashes of files in repo', async () => {
    const project = await getProject(
      config,
      logger,
      `${fixtureDir}/packages/foo`,
    );

    expect(project.gitHashes).toMatchSnapshot();
  });

  describe('should exclude files from git hashes if they match excludeGlobs config option', () => {
    it('glob without slash', async () => {
      const project = await getProject(
        { ...config, excludeGlobs: [] },
        logger,
        `${fixtureDir}/packages/foo`,
      );

      expect(project.gitHashes.has('package.json')).toBe(true);

      const newProject = await getProject(
        { ...config, excludeGlobs: ['package.json'] },
        logger,
        `${fixtureDir}/packages/foo`,
      );

      expect(newProject.gitHashes.has('package.json')).toBe(false);
      expect(newProject.gitHashes.has('packages/foo/package.json')).toBe(true);
    });

    it('glob with slash', async () => {
      const project = await getProject(
        { ...config, excludeGlobs: [] },
        logger,
        `${fixtureDir}/packages/foo`,
      );

      expect(project.gitHashes.has('packages/foo/src/a.test.ts')).toBe(true);

      const newProject = await getProject(
        { ...config, excludeGlobs: ['**/*.test.ts'] },
        logger,
        `${fixtureDir}/packages/foo`,
      );

      expect(newProject.gitHashes.has('packages/foo/src/a.test.ts')).toBe(
        false,
      );
      expect(newProject.gitHashes.has('packages/bar/src/b.test.ts')).toBe(
        false,
      );
      expect(newProject.gitHashes.has('packages/baz/src/c.test.ts')).toBe(
        false,
      );
    });
  });
});
