import crypto from 'crypto';
import path from 'path';

import semver from 'semver';

import { Config, ImplicitDepMap } from './config';
import { Logger } from './logger';
import { Project, Workspace } from './project';
import { assert } from './util';

export type HashOptions = Pick<
  Config,
  'includeDevDependencies' | 'implicitDependencies' | 'filterDevDependencies'
>;

type PackageDepsHash = { hash: string; internalDeps: Workspace[] };

export class Hasher {
  // Cache package hash calculations in-memory
  // Assumes that packages don't change across the lifetime of the program
  private packageHashMap: Map<string, PackageDepsHash>;

  // Cache each package's transitive dependencies
  // Used to calculate dependent blast radiuses
  public packageDependenciesMap: Map<string, Set<string>>;

  constructor(
    private logger: Logger,
    private project: Project,
    private hashOptions: HashOptions,
  ) {
    this.packageHashMap = new Map();
    this.packageDependenciesMap = new Map();
  }

  async hashPackage(name: string, salt: string[] = []): Promise<string> {
    const workspace = this.project.workspaces.get(name);
    assert(workspace, `Invalid workspace "${name}"`);

    const hashArr = [
      workspace.name,
      await this.hashAllPackageDeps(workspace),
      await this.hashImplicitDeps(workspace),
      ...salt,
    ];

    const hash = Hasher.hashArray(hashArr);
    this.logger.trace(`Salt: ${salt}`, name);
    this.logger.trace(`Full hash array!: ${hashArr}`, name);
    this.logger.verbose(`Package hash: ${hash}`, name);

    return hash;
  }

  /**
   * Clear the in-memory package hash cache.
   * Useful when rehashing packages after any changes have occurred
   */
  clearCache() {
    this.packageHashMap.clear();
  }

  private async hashImplicitDeps(workspace: Workspace): Promise<string> {
    const filter = (obj?: ImplicitDepMap) =>
      Object.entries(obj || {}).filter(
        ([, workspaces]) =>
          workspaces === '*' || workspaces.includes(workspace.name),
      );

    const { packages, files } = this.hashOptions.implicitDependencies;
    const hashes = await Promise.all([
      ...filter(packages).map(async ([pkg]) => {
        const workspace = this.project.workspaces.get(pkg);
        assert(workspace, `Invalid workspace "${pkg}"`);
        const hash = await this.hashAllPackageDeps(workspace, true);
        this.logger.trace(
          `Implicit dep hash (${pkg}): ${hash}`,
          workspace.name,
        );
        return hash;
      }),
      ...filter(files).map(([filepath]) => {
        const gitHash = this.project.gitHashes.get(filepath);
        assert(gitHash, `Cannot find git hash for "${filepath}"`);

        this.logger.trace(
          `Implicit dep hash (${filepath}): ${gitHash}`,
          workspace.name,
        );
        return gitHash;
      }),
    ]);
    this.logger.trace(
      `Implicit dep hashes: ${hashes.join(',')}`,
      workspace.name,
    );
    return Hasher.hashArray(hashes);
  }

  private async hashAllPackageDeps(
    workspace: Workspace,
    disableProfiling = false,
  ): Promise<string> {
    const profiler = this.logger.profile(
      'hashPackageDeps',
      workspace.name,
      disableProfiling ? 'off' : undefined,
    );

    const { hash, internalDeps } = await this.hashPackageDeps(
      workspace,
      this.hashOptions.includeDevDependencies !== undefined,
    );

    const queue = [...internalDeps];

    const hashArr = [workspace.name, hash];
    const visited = new Set<string>([workspace.name]);

    while (queue.length > 0) {
      const item = queue.shift() as Workspace;
      if (visited.has(item.name)) {
        continue;
      }
      visited.add(item.name);
      const { hash, internalDeps } = await this.hashPackageDeps(
        item,
        this.hashOptions.includeDevDependencies === 'transitive',
      );
      hashArr.push(hash);
      queue.push(...internalDeps);
    }

    this.packageDependenciesMap.set(workspace.name, visited);

    const finalHash = Hasher.hashArray(hashArr);
    profiler.stop();
    this.logger.trace(`Hash array: ${hashArr}`, workspace.name);
    return finalHash;
  }

  private async hashPackageDeps(
    workspace: Workspace,
    includeDevDependencies: boolean,
  ) {
    const existingHash = this.packageHashMap.get(workspace.name);
    if (existingHash) {
      return existingHash;
    }

    const workspaceDependencies = [
      ...Object.entries(workspace.config.dependencies || {}),
      ...Object.entries(workspace.config.peerDependencies || {}),
    ];
    if (includeDevDependencies) {
      if (this.hashOptions.filterDevDependencies) {
        workspaceDependencies.push(
          ...this.hashOptions.filterDevDependencies(workspace),
        );
      } else {
        workspaceDependencies.push(
          ...Object.entries(workspace.config.devDependencies || {}),
        );
      }
    }

    const { internal, external } = workspaceDependencies.reduce(
      (acc, [name, version]) => {
        const workspace = this.project.workspaces.get(name);
        if (
          workspace &&
          semver.satisfies(workspace.config.version as string, version)
        ) {
          acc.internal.push(workspace);
        } else {
          acc.external.push([name, version]);
        }
        return acc;
      },
      { internal: [] as Workspace[], external: [] as Array<[string, string]> },
    );

    const resolvedDeps = [
      ...(await this.resolveExternalDeps(external)),
      ...internal.map(ws => `${ws.name}@${ws.config.version}`),
    ];
    const depsHash = Hasher.hashArray(resolvedDeps);
    this.logger.trace(`Deps hash: ${depsHash}`, workspace.name);
    const filesHash = await this.hashFiles(workspace);
    this.logger.trace(`Files hash: ${filesHash}`, workspace.name);
    this.logger.trace(
      `Internal deps: ${internal.map(ws => ws.name)}`,
      workspace.name,
    );

    const packageDepsHash = {
      hash: `${workspace.name}:${depsHash}:${filesHash}`,
      internalDeps: internal,
    };
    this.packageHashMap.set(workspace.name, packageDepsHash);

    return packageDepsHash;
  }

  // TODO: Can optimise this by memoising hash/transitive deps
  private async resolveExternalDeps(deps: Array<[string, string]>) {
    const arr = [];
    const visited = new Set();

    const queue = [...deps];
    while (queue.length > 0) {
      const [name, version] = queue.shift() as [string, string];
      const id = `${name}@${version}`;
      if (visited.has(id)) {
        continue;
      }
      visited.add(id);
      const lockEntry = this.project.resolvedDependencies[id];
      if (lockEntry) {
        arr.push(`${name}@${lockEntry.version}`);
        queue.push(...Object.entries(lockEntry.dependencies || {}));
      } else {
        this.logger.warn(`Could not find yarn lock entry for ${id}`);
        arr.push(id);
      }
    }

    return arr;
  }

  private async hashFiles(workspace: Workspace) {
    const profiler = this.logger.profile('hashFiles', workspace.name, 'trace');
    const relativeDir = path.relative(this.project.root.dir, workspace.dir);

    const inputs = [];
    for (const [filename, hash] of this.project.gitHashes) {
      if (filename.startsWith(relativeDir)) {
        inputs.push(filename, hash);
      }
    }
    const hash = Hasher.hashArray(inputs);
    profiler.stop();
    return hash;
  }

  private static hashArray(arr: string[]) {
    const hasher = crypto.createHash('sha1');

    arr.sort((a, b) => a.localeCompare(b));
    arr.forEach(item => hasher.update(item));

    return hasher.digest('hex');
  }
}
