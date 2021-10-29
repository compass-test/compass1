import fs from 'fs';
import path from 'path';
import * as bolt from 'bolt';
import webpack from 'webpack';
import yargs from 'yargs';
import ora from 'ora';
import chalk from 'chalk';
import { BuildReporter } from '@atlaskit/build-reporting';
import { createWebpackConfig } from '../create-webpack-config';
import { createDefaultGlob } from '../utils/create-default-glob';
import { createWorkspacesGlob } from '../utils/create-workspaces-glob';
import { isPublicPackage } from '../utils/is-public-package';
import { buildBanner } from '../banner/build-banner';
import { ExperimentalEsbuildCompiler } from '../experimental-esbuild';
import { print } from '../experimental-esbuild/print';

const cli = yargs.strict().options({
  cwd: {
    type: 'string',
    default: process.cwd(),
  },
  minimize: {
    type: 'boolean',
    default: true,
  },
  mode: {
    choices: ['production', 'development'] as const,
    default: 'production' as 'production' | 'development',
  },
  report: {
    type: 'boolean',
    default: false,
  },
  websitePrivate: {
    type: 'boolean',
    default: process.env.BUILD_PRIVATE_WEBSITE === 'true',
  },
  openAnalyzer: {
    type: 'boolean',
    default: !process.env.CI,
  },
  extractReactTypes: {
    type: 'boolean',
    default: process.env.FORCE_EXTRACT_REACT_TYPES === 'true',
  },
  watch: {
    type: 'boolean',
    default: false,
  },
  experimental: {
    type: 'array',
    choices: ['esbuild'],
    default: [] as string[],
  },
});

async function main(): Promise<void> {
  const flags = cli.argv;
  const cwd = path.resolve(process.cwd(), flags.cwd);

  console.log(buildBanner());

  const workspaces = await bolt.getWorkspaces({ cwd });
  const project = await bolt.getProject({ cwd });

  const filteredWorkspaces = workspaces.filter(({ config }) =>
    isPublicPackage(config),
  );

  const globs = flags.websitePrivate
    ? createDefaultGlob()
    : createWorkspacesGlob(filteredWorkspaces, project.dir);

  if (flags.experimental?.includes('esbuild')) {
    const start = Date.now();
    const spinner = ora(chalk.cyan('Building experimentally')).start();

    const esbuildCompiler = await ExperimentalEsbuildCompiler.website({
      globs,
      isEnabled: () => true,
      isRunning: () => true,
      isFile: false,
      isProduction: true,
      isPrivateWebsiteBuild: flags.websitePrivate ?? false,
      cwd,
      projectDir: project.dir,
      extractReactTypes: flags.extractReactTypes,
      contentBase: path.join(cwd, 'public'),
      minify: flags.minimize,
      define: {
        IS_PRIVATE_WEBSITE: false,
        BASE_TITLE: 'Atlaskit by Atlassian',
        PUBLIC_PATH: '/',
        ENABLE_ANALYTICS_GASV3: false,
      },
    });

    const result = await esbuildCompiler.run();
    const duration = (Date.now() - start) / 1000;
    const seconds = chalk.dim(` ⏱ ${duration.toFixed(2)}s`);
    const warnings =
      result.warnings.length > 0
        ? chalk.dim(` ⚠️ ${result.warnings.length}`)
        : '';

    if (result.warnings.length > 0 && cli.argv.verbose) {
      spinner.stop();
      spinner.text = '';

      result.warnings.forEach((warning: any) =>
        print(warning, {
          resolvePath: id => id,
          level: 'warning',
        }),
      );
    }

    if (result.errors.length > 0) {
      spinner.stop();
      spinner.text = '';

      result.errors.forEach((error: any) =>
        print(error, {
          resolvePath: id => id,
          level: 'error',
        }),
      );

      spinner.fail(`Experimental build failed ${seconds}`);
      process.exit(1);
    } else {
      await fs.promises.mkdir(path.join(cwd, 'dist/'), { recursive: true });
      await fs.promises.copyFile(
        path.join(cwd, 'public/index.html'),
        path.join(cwd, 'dist/index.html'),
      );
      spinner.succeed(`Experimental build complete ${warnings}${seconds}`);
    }

    return;
  }

  const config = await createWebpackConfig({
    globs,
    mode: flags.mode,
    noMinimize: !flags.minimize,
    report: flags.report,
    openAnalyzer: flags.openAnalyzer,
    extractReactTypes: flags.extractReactTypes,
    watch: flags.watch,
    websitePrivate: flags.websitePrivate,
  });

  const compiler = webpack(config);

  BuildReporter.create()
    .augment({
      workspaces: filteredWorkspaces.map(ws => ws.name),
    })
    .tapWebpack(compiler, () => ({
      action: 'bundled',
      actionSubject: 'webpack',
    }));

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        reject(err);
      }

      const statsString = stats.toString('minimal');

      if (statsString) {
        console.log(`${statsString}\n`);
      }

      if (stats.hasErrors()) {
        reject(new Error(stats.toString('errors-only')));
      } else {
        resolve();
      }
    });
  });
}

main().catch(err => {
  console.error(err);
  process.exit(err.code ?? 1);
});
