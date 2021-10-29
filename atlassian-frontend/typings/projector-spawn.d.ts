/// <reference types="node" />

declare module 'projector-spawn' {
  import * as child_process from 'child_process';

  declare namespace spawn {
    export interface Result {
      code: number;
      stdout: string;
      stderr: string;
    }
  }

  /**
   * The `spawn()` method spawns a new process using the given `command`, with
   * command line arguments in `args`. If omitted, `args` defaults to an empty array.
   * Returns a promise that resolves when the process exits successfully or rejects otherwise.
   */
  declare function spawn(
    command: string,
    options: child_process.SpawnOptions,
  ): Promise<spawn.Result>;
  declare function spawn(
    command: string,
    args?: ReadonlyArray<string>,
    options?: child_process.SpawnOptions,
  ): Promise<spawn.Result>;

  export = spawn;
}
