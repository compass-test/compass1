/**
 * Lint type declarations to catch build issues that would otherwise not be caught.
 * In particular, this detects references to package dists in declaration files. We refer to these
 * as 'deep imports'. This indicates that the types of a package rely on internal package file
 * structure of another package which will cause breakages when there are version mismatches since
 * package file structure is not public API and does not fall under semver.
 * Related issues:
 * - https://product-fabric.atlassian.net/browse/AFP-2438
 * - https://github.com/microsoft/TypeScript/issues/38111
 * - https://github.com/microsoft/TypeScript/pull/24071
 */
import path from 'path';

import * as bolt from 'bolt';
import spawn, { ChildProcessError, Result } from 'spawndamnit';

type Options = {
  cwd: string;
  pkgDir?: string;
  profiling?: boolean;
};

const distDir = 'dist';

export async function lintTypeDeclarations(partialOpts: Partial<Options>) {
  const opts = { cwd: process.cwd(), ...partialOpts };
  const before = Date.now();

  const project = await bolt.getProject({ cwd: opts.cwd });

  let packagePath = opts.pkgDir ?? path.resolve(project.dir, 'packages');

  let result: Result;
  try {
    result = await spawn(
      'grep',

      [
        '--color=always',
        '-r',
        '--include=*.d.ts',
        '--exclude-dir=node_modules',
        '-E',
        `import\\("(@atlaskit|@atlassian.*)/[^/]+/${distDir}/[^"]+"`,
        packagePath,
      ],
    );
    if (opts.profiling) {
      console.log(`Search time: ${(Date.now() - before) / 1000}s`);
    }
  } catch (e) {
    if (opts.profiling) {
      console.log(`Search time: ${(Date.now() - before) / 1000}s`);
    }
    if (e instanceof ChildProcessError) {
      if (e.code === 1) {
        // Grep returning 1 actually indicates success - as it found no violations
        result = e;
      } else {
        throw new Error(
          `Unexpected error: ${
            e.code
          }\nstderr: ${e.stderr.toString()}\nstdout: ${e.stdout.toString()}`,
        );
      }
    } else {
      throw e;
    }
  }

  if (result.code === 0) {
    throw new Error(
      `Found occurrences of deep import paths in type declaration files. This happens when an inferred type is not exported from the root of a package or an entry point. Export the type from the root and any relevant entry points to fix the issue.NOTE: Entry points need to be declarative to fix deep import paths from package entry points.\n${result.stderr.toString()}${result.stdout.toString()})`,
    );
  }
}
