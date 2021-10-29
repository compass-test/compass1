// Type definitions for bolt 0.24.1
// Project: https://github.com/boltpkg/bolt/#readme
// Definitions by: Michael B. <https://github.com/Blasz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped (soon)

/// <reference types="node" />

declare module 'bolt' {
  type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
  interface JsonMap {
    [key: string]: AnyJson;
  }
  interface JsonArray extends Array<AnyJson> {}

  type ConfigDependencyType =
    | 'dependencies'
    | 'devDependencies'
    | 'peerDependencies'
    | 'optionalDependencies';

  interface Cwd {
    cwd?: string;
  }

  // Hooray https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#import-types
  export type PackageJSON = import('./package-json').IPackageJSON;

  /* Common types */
  export type Graph = Map<string, Array<string>>;

  export interface Package<T = PackageJSON> {
    dir: string;
    name: string;
    config: T;
  }

  /** Glob patterns (minimatch) to filter execution to certain workspaces */
  export interface FilterOpts {
    only?: string;
    ignore?: string;
    onlyFs?: string;
    ignoreFs?: string;
  }

  export interface SpawnOpts {
    /* Run tasks in serial, parallel or in parallel across a number of worker nodes.
     * For 'parallel-nodes', the command should be executed once for each node/process, with
     * CI_NODE_TOTAL' and 'CI_NODE_INDEX' env variables representing the total number of nodes and the
     * current node executing the command.
     * Bolt will then execute the specific chunk of packages referred to by CI_NODE_INDEX, in parallel.
     */
    orderMode?: 'serial' | 'parallel' | 'parallel-nodes';
    bail?: boolean;
    excludeFromGraph?: Array<ConfigDependencyType>;
  }

  export interface PackageMeta {
    name: string;
    newVersion: string;
    published: boolean;
  }

  /* Standalone functions */
  export function getProject<T = PackageJSON>(opts?: Cwd): Promise<Package<T>>;
  export function getWorkspaces<T = PackageJSON>(
    opts?: Cwd & FilterOpts,
  ): Promise<Package<T>[]>;
  export function getDependencyGraph(
    opts?: Cwd & { excludedTypes?: Array<ConfigDependencyType> },
  ): Promise<Graph>;
  export function getDependentsGraph(
    opts?: Cwd & { excludedTypes?: Array<ConfigDependencyType> },
  ): Promise<Graph>;
  export function publishPackages(
    opts: Cwd & {
      access?: string;
      spawnOpts?: SpawnOpts;
      prePublish?: Function;
    },
  ): Promise<PackageMeta[]>;
  export function runWorkspaceTasks(
    task: (workspace: { dir: string; config: PackageJSON }) => Promise<any>,
    opts?: Cwd & { spawnOpts?: SpawnOpts; filterOpts?: FilterOpts },
  ): Promise<void>;
  export function updatePackageVersions(
    updatedPackages: { [name: string]: string },
    opts?: Cwd,
  ): Promise<null>;

  /* Commands */

  export function workspaceRun(
    opts: Cwd & {
      script: string;
      scriptArgs?: string[];
      pkgName: string;
    },
  ): Promise<void>;

  export function workspacesRun(
    opts: Cwd & {
      script: string;
      scriptArgs?: string[];
      spawnOpts: SpawnOpts;
      filterOpts: FilterOpts;
    },
  ): Promise<void>;

  export function workspacesExec(
    opts: Cwd & {
      command: string;
      commandArgs?: string[];
      spawnOpts: SpawnOpts;
      filterOpts: FilterOpts;
    },
  ): Promise<void>;

  export function exec(
    opts: Cwd & {
      command: string;
      commandArgs?: string[];
    },
  );

  // TODO...

  /*~ If there are types, properties, or methods inside dotted names
   *~ of the module, declare them inside a 'namespace'.
   */
  export namespace subProp {
    /*~ For example, given this definition, someone could write:
     *~   import { subProp } from 'yourModule';
     *~   subProp.foo();
     *~ or
     *~   import * as yourMod from 'yourModule';
     *~   yourMod.subProp.foo();
     */
    export function foo(): void;
  }
}
