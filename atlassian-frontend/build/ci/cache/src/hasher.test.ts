import path from 'path';

import * as bolt from 'bolt';

import { Hasher, HashOptions } from './hasher';
import { Logger } from './logger';
import { Project } from './project';

const fixturePath = path.resolve(`${__dirname}/../__fixtures__/project`);

describe('Hasher', () => {
  let mockProject: Project;
  let fixtureWorkspaces: bolt.Package[];
  let hashOptions: HashOptions;
  let hasher: Hasher;
  beforeAll(async () => {
    fixtureWorkspaces = await bolt.getWorkspaces({ cwd: fixturePath });
  });
  beforeEach(() => {
    mockProject = {
      root: {
        dir: `${__dirname}/../__fixtures__/project`,
        name: '@af/fixture-project',
        config: {
          name: '@af/fixture-project',
        },
      },
      workspaces: new Map(
        JSON.parse(
          JSON.stringify(fixtureWorkspaces),
        ).map((ws: bolt.Package) => [ws.name, ws]),
      ),
      resolvedDependencies: {
        'lodash@^4.0.0': {
          version: '4.0.3',
          dependencies: {
            'left-pad': '^2.0.3',
          },
        },
        'lodash@^4.17.15': {
          version: '4.17.15',
          dependencies: {
            'left-pad': '^2.0.3',
          },
        },
        'left-pad@^2.0.3': {
          version: '2.1.4',
        },
        'node-fetch@^1.0.0': {
          version: '1.0.0',
        },
      },
      gitHashes: new Map([
        ['packages/foo/src/a.ts', 'abc'],
        ['packages/bar/src/b.ts', 'def'],
        ['packages/baz/src/c.ts', 'ghi'],
        ['packages/implicit/src/d.ts', 'jkl'],
        ['package.json', 'mno'],
      ]),
    };
    hashOptions = {
      implicitDependencies: {},
    };
    hasher = new Hasher(new Logger('off'), mockProject, hashOptions);
  });

  it('should successfully hash a package', async () => {
    const hash = await hasher.hashPackage('@af/foo');
    expect(hash).toEqual(expect.any(String));
    expect(hash).toMatchSnapshot();

    hasher.clearCache();
    const sameHash = await hasher.hashPackage('@af/foo');
    expect(sameHash).toBe(hash);
  });

  describe('should generate different hash on source file changes', () => {
    it('new file', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      mockProject.gitHashes.set('packages/foo/src/new.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');

      expect(newHash).not.toEqual(originalHash);
    });

    it('deleted file', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      mockProject.gitHashes.delete('packages/foo/src/a.ts');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });

    it('modified file', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      mockProject.gitHashes.set('packages/foo/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });
  });

  describe('should generate different hash on dependency changes', () => {
    it('dependents and transitive dependents', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      const originalDepHash = await hasher.hashPackage('@af/bar');
      const originalTransitiveDepHash = await hasher.hashPackage('@af/baz');

      mockProject.gitHashes.set('packages/foo/src/a.ts', '123');
      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      const newDepHash = await hasher.hashPackage('@af/bar');
      const newTransitiveDepHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
      expect(newDepHash).not.toEqual(originalDepHash);
      expect(newTransitiveDepHash).not.toEqual(originalTransitiveDepHash);
    });
    it('internal peerDependency', async () => {
      const originalHash = await hasher.hashPackage('@af/corge');
      mockProject.gitHashes.set('packages/quux/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/corge');
      expect(newHash).not.toEqual(originalHash);
    });
    it('external dep - version range change', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      const originalDepHash = await hasher.hashPackage('@af/bar');
      const originalTransitiveDepHash = await hasher.hashPackage('@af/baz');

      const fooWs = mockProject.workspaces.get('@af/foo') as bolt.Package;
      const fooDeps = fooWs.config.dependencies as any;
      expect(fooDeps['lodash']).toEqual('^4.17.15');

      fooDeps['lodash'] = '^4.17.17';
      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      const newDepHash = await hasher.hashPackage('@af/bar');
      const newTransitiveDepHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
      // A change in a package hash should also change its direct and transitive dependents
      expect(newDepHash).not.toEqual(originalDepHash);
      expect(newTransitiveDepHash).not.toEqual(originalTransitiveDepHash);
    });

    it('external peerDep - version range change', async () => {
      const originalPeerDepHash = await hasher.hashPackage('@af/corge');
      const barWs = mockProject.workspaces.get('@af/corge') as bolt.Package;
      const barPeerDeps = barWs.config.peerDependencies as any;
      expect(barPeerDeps['lodash']).toEqual('^4.17.15');

      barPeerDeps['lodash'] = '^4.17.21';
      hasher.clearCache();
      const newPeerDepHash = await hasher.hashPackage('@af/corge');
      expect(newPeerDepHash).not.toEqual(originalPeerDepHash);
    });

    it('external dep - same range but different resolved version', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      const originalDepHash = await hasher.hashPackage('@af/bar');
      const originalTransitiveDepHash = await hasher.hashPackage('@af/baz');

      expect(mockProject.resolvedDependencies['lodash@^4.0.0']).toMatchObject({
        version: '4.0.3',
      });
      mockProject.resolvedDependencies = {
        ...mockProject.resolvedDependencies,
        'lodash@^4.17.15': {
          ...mockProject.resolvedDependencies['lodash@^4.17.15'],
          version: '4.17.17',
        },
      };

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      const newDepHash = await hasher.hashPackage('@af/bar');
      const newTransitiveDepHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
      // A change in a package hash should also change its direct and transitive dependents
      expect(newDepHash).not.toEqual(originalDepHash);
      expect(newTransitiveDepHash).not.toEqual(originalTransitiveDepHash);
    });

    it('transitive external dep - different resolved version', async () => {
      const originalHash = await hasher.hashPackage('@af/foo');
      const originalDepHash = await hasher.hashPackage('@af/bar');
      const originalTransitiveDepHash = await hasher.hashPackage('@af/baz');

      expect(mockProject.resolvedDependencies['lodash@^4.0.0']).toMatchObject({
        dependencies: {
          'left-pad': '^2.0.3',
        },
      });
      expect(mockProject.resolvedDependencies['left-pad@^2.0.3']).toMatchObject(
        {
          version: '2.1.4',
        },
      );
      mockProject.resolvedDependencies = {
        ...mockProject.resolvedDependencies,
        'left-pad@^2.0.3': {
          ...mockProject.resolvedDependencies['left-pad@^2.0.3'],
          version: '2.1.5',
        },
      };

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      const newDepHash = await hasher.hashPackage('@af/bar');
      const newTransitiveDepHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
      // A change in a package hash should also change its direct and transitive dependents
      expect(newDepHash).not.toEqual(originalDepHash);
      expect(newTransitiveDepHash).not.toEqual(originalTransitiveDepHash);
    });

    it('should not change when devDependencies change by default', async () => {
      const originalHash = await hasher.hashPackage('@af/baz');
      mockProject.gitHashes.set('packages/quux/src/a.ts', '123');
      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/baz');
      expect(newHash).toEqual(originalHash);
    });

    it('should change for direct devDependencies when includeDirectDevDependencies option is set', async () => {
      const hasher = new Hasher(new Logger('off'), mockProject, {
        includeDevDependencies: 'direct',
        implicitDependencies: {},
      });
      const originalHash = await hasher.hashPackage('@af/baz');
      mockProject.gitHashes.set('packages/quux/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
    });

    it('should change for transitive devDependencies when includeTransitiveDevDependencies option is set', async () => {
      const hasher = new Hasher(new Logger('off'), mockProject, {
        includeDevDependencies: 'transitive',
        implicitDependencies: {},
      });
      const originalHash = await hasher.hashPackage('@af/baz');
      mockProject.gitHashes.set('packages/quuz/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/baz');
      expect(newHash).not.toEqual(originalHash);
    });

    it('should not change for transitive devDependencies when includeTransitiveDevDependencies option is not set', async () => {
      const hasher = new Hasher(new Logger('off'), mockProject, {
        includeDevDependencies: 'direct',
        implicitDependencies: {},
      });
      const originalHash = await hasher.hashPackage('@af/baz');
      mockProject.gitHashes.set('packages/quuz/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/baz');
      expect(newHash).toEqual(originalHash);
    });

    it('should not change when changed dependency is excluded by filterDependencies', async () => {
      const hasher = new Hasher(new Logger('off'), mockProject, {
        includeDevDependencies: 'transitive',
        filterDevDependencies: pkg => [
          ...Object.entries(pkg.config.devDependencies || {}).filter(
            ([pkg]) => pkg !== '@af/quux',
          ),
        ],
        implicitDependencies: {},
      });
      const originalHash = await hasher.hashPackage('@af/baz');
      mockProject.gitHashes.set('packages/quux/src/a.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/baz');
      expect(newHash).toEqual(originalHash);
    });
  });

  describe('should generate different hash on implicit dependency changes', () => {
    beforeEach(() => {});
    it('no change when no implicit dependency declared', async () => {
      hashOptions.implicitDependencies = {};
      const originalHash = await hasher.hashPackage('@af/foo');
      mockProject.gitHashes.set('packages/build/src/d.ts', '123');
      mockProject.gitHashes.set('package.json', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).toEqual(originalHash);
    });

    it('source file change of implicit package dependency', async () => {
      hashOptions.implicitDependencies = {
        packages: {
          '@af/implicit': '*',
        },
      };
      const originalHash = await hasher.hashPackage('@af/foo');
      mockProject.gitHashes.set('packages/implicit/src/d.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });

    it('external dependency change of implicit package dependency', async () => {
      hashOptions.implicitDependencies = {
        packages: {
          '@af/implicit': '*',
        },
      };
      const originalHash = await hasher.hashPackage('@af/foo');
      const implicitWs = mockProject.workspaces.get(
        '@af/implicit',
      ) as bolt.Package;
      const implicitDeps = implicitWs.config.dependencies as any;
      expect(implicitDeps['lodash']).toBeUndefined();

      implicitDeps['lodash'] = '4.0.0';

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });

    it('internal dependency change of implicit package dependency', async () => {
      hashOptions.implicitDependencies = {
        packages: {
          '@af/implicit': '*',
        },
      };
      const originalHash = await hasher.hashPackage('@af/foo');

      mockProject.gitHashes.set('packages/implicit-utils/src/new.ts', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });

    it('implicit file dependency change', async () => {
      hashOptions.implicitDependencies = {
        files: {
          'package.json': '*',
        },
      };
      const originalHash = await hasher.hashPackage('@af/foo');

      mockProject.gitHashes.set('package.json', '123');

      hasher.clearCache();
      const newHash = await hasher.hashPackage('@af/foo');
      expect(newHash).not.toEqual(originalHash);
    });
  });

  it('should throw when hashing a non-existent package', async () => {
    const hasher = new Hasher(new Logger('off'), mockProject, {
      includeDevDependencies: 'transitive',
      implicitDependencies: {},
    });
    await expect(hasher.hashPackage('@af/does-not-exist')).rejects.toThrow();
  });

  it('should require clearing cache before generating a new hash after file changes', async () => {
    const originalHash = await hasher.hashPackage('@af/foo');
    mockProject.gitHashes.set('packages/foo/src/a.ts', '123');

    const newHashWithoutClear = await hasher.hashPackage('@af/foo');
    expect(newHashWithoutClear).toEqual(originalHash);

    hasher.clearCache();
    const newHash = await hasher.hashPackage('@af/foo');
    expect(newHash).not.toEqual(originalHash);
  });
});
