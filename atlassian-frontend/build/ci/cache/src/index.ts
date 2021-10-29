import path from 'path';

import { Config, defaultConfig } from './config';
import { Hasher } from './hasher';
import { Logger } from './logger';
import { getProject, Project, Workspace } from './project';
import { Store } from './store';
import { assert, Default } from './util';

export type CacheConfig = Default<Config, keyof typeof defaultConfig>;

export type { RemoteStore, RemoteStoreConstructor } from './store';
export { Logger };

/**
 * Caching library for fetching and storing built outputs of packages in a bolt monorepo
 */
export class Cache {
  private config: Config;
  public hasher?: Hasher;
  public logger: Logger;
  public project?: Project;
  private store?: Store;

  /**
   * @param config Cache configuration
   * @param cwd Specify working directory to find bolt project from. Defaults to process.cwd()
   * @param workspaces Pre-fetched workspaces. If not provided will be refetched via bolt.getWorkspaces()
   */
  constructor(
    config: CacheConfig,
    private cwd?: string,
    private workspaces?: Workspace[],
  ) {
    this.config = { ...defaultConfig, ...config };
    this.logger = new Logger(this.config.logLevel, this.config.logFilePath);
  }

  /** Initialise the cache.
   *  Must be called before any other method.
   */
  async init() {
    this.project = await getProject(
      this.config,
      this.logger,
      this.cwd,
      this.workspaces,
    );
    this.hasher = new Hasher(this.logger, this.project, this.config);
    const remoteStore = this.config.remoteStore
      ? new this.config.remoteStore(this.logger)
      : undefined;
    this.store = new Store(
      this.logger,
      path.resolve(this.project.root.dir, this.config.cacheDirectory),
      remoteStore,
    );
  }

  /** Compute the hash of `packageName`.
   * `salt` is an optional array of strings that will be incorporated into the hash
   */
  computeHash(packageName: string, salt?: string[]) {
    assert(this.hasher, 'Cache not initialised');
    return this.hasher.hashPackage(packageName, salt);
  }

  /** Fetch cached contents of `packageName` with `hash` */
  async fetch(packageName: string, hash: string) {
    assert(this.project && this.store, 'Cache not initialised');
    const workspace = this.project.workspaces.get(packageName);
    assert(workspace, `Invalid workspace ${packageName}`);
    const profile = this.logger.profile('cache fetch', packageName);
    const result = await this.store.fetch(workspace.dir, hash);
    const time = profile.stop();
    this.logger.verbose(
      `Cache ${result ? 'hit' : 'miss'} (${time})`,
      packageName,
    );
    return result;
  }

  /** Store cached contents of `packageName` with `hash` */
  async put(
    packageName: string,
    hash: string,
    metadata?: { [key: string]: string },
  ) {
    assert(this.project && this.store, 'Cache not initialised');
    const workspace = this.project.workspaces.get(packageName);
    assert(workspace, `Invalid workspace ${packageName}`);
    const profile = this.logger.profile('cache put', packageName);
    const result = await this.store.put(
      workspace.dir,
      hash,
      this.config.outputGlobs,
      metadata,
    );
    const time = profile.stop();
    this.logger.info(`Cache stored (${time})`, packageName);
    return result;
  }
}
