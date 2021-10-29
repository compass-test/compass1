import * as bolt from 'bolt';

import { LogLevel } from './logger';
import { RemoteStoreConstructor } from './store';

export type ImplicitDepMap = {
  [name: string]: '*' | string[];
};

export type Config = {
  /** Console logging level */
  logLevel: LogLevel;
  /** Cache directory, relative to project root */
  cacheDirectory: string;
  /** Glob paths to the built output of a package, relative to the package root */
  outputGlobs: string[];
  /** Glob patterns to exclude non-source files within a package, rooted from the project directory.
   * Uses micromatch for pattern matching
   */
  excludeGlobs: string[];
  /** Include package.json devDependencies in the hash of a package */
  includeDevDependencies?: 'direct' | 'transitive';
  /** Function to filter the list of devDependencies included in the hash of a package.
   * Useful for excluding certain devDependencies that don’t affect the operation being cached.
   * Returns a list of <package name, package version> pairs.
   */
  filterDevDependencies?: (pkg: bolt.Package) => Array<[string, string]>;
  /** Implicit dependencies. Keys denote the implicit dependencies and values denote the workspaces the are dependencies of.
   * '*' means it applies to all workspaces
   */
  implicitDependencies: {
    packages?: ImplicitDepMap;
    files?: ImplicitDepMap;
  };
  /** Remote store client */
  remoteStore?: RemoteStoreConstructor;
  /** Filepath to write logs to rather than stdout */
  logFilePath?: string;
};

export const defaultConfig = {
  logLevel: 'info' as const,
  cacheDirectory: 'node_modules/.cache/af-cache',
  excludeGlobs: [],
  implicitDependencies: {},
};
