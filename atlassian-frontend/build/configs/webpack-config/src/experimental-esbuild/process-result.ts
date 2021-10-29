import path from 'path';
import { BuildResult } from 'esbuild';
import { Ora } from 'ora';
import chalk from 'chalk';
import { print } from './print';

export interface ProcessResultOptions {
  start: number;
  rootPath: string;
  cwd: string;
  spinner: Ora;
}

export function processResult(
  result: BuildResult,
  options: ProcessResultOptions,
) {
  const seconds = `${((Date.now() - options.start) / 1000).toFixed(2)}s`;
  const resolvePath = (file: string) =>
    path.relative(options.rootPath, path.join(options.cwd, file));

  if (result.warnings.length > 0) {
    options.spinner.stop();

    result.warnings.forEach(warning =>
      print(warning, {
        resolvePath,
        level: 'warning',
      }),
    );
  }

  if (result.errors.length > 0) {
    options.spinner.stop();

    result.errors.forEach(error =>
      print(error, {
        resolvePath,
        level: 'error',
      }),
    );

    const message = 'Experimentally compiling packages failed';
    options.spinner.fail(`${chalk.red(message)} ${chalk.dim(seconds)}`);
  } else {
    const message = 'Experimentally compiled packages';
    options.spinner.succeed(`${chalk.cyan(message)} ${chalk.dim(seconds)}`);
  }
}
