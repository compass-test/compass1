// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links

// @ts-ignore
import DirectoryWatcher from 'watchpack/lib/DirectoryWatcher';

const ignorePatterns = [
  '__snapshots__',
  '__image_snapshots__',
  '__tests__',
  'node_modules',
];

const _oldSetDirectory = DirectoryWatcher.prototype.setDirectory;

DirectoryWatcher.prototype.setDirectory = function (
  directoryPath: string,
  exist: unknown,
  initial: unknown,
  type: unknown,
) {
  if (!ignorePatterns.some(pattern => directoryPath.includes(pattern))) {
    _oldSetDirectory.call(this, directoryPath, exist, initial, type);
  }
};
// End of the hack
import * as bolt from 'bolt';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import ora from 'ora';
import chalk from 'chalk';
import path from 'path';
import yargs from 'yargs';
import { BuildReporter } from '@atlaskit/build-reporting';
import { createWebpackConfig } from '../create-webpack-config';
import { devServerBanner } from '../banner/dev-server-banner';
import { statsOptions } from '../create-webpack-config/stats-options';
import { filterWorkspaces } from '../utils/filter-workspaces';
import {
  ExperimentalEsbuildCompiler,
  ExperimentalEsbuildServer,
} from '../experimental-esbuild';
import { print } from '../experimental-esbuild/print';

const POSSIBLE_IGNORES = ['website'];

const DEFAULT_IGNORES = [
  'analytics',
  'highlight.js',
  'media-editor',
  'media-viewer',
];

const cli = yargs
  .options({
    report: {
      type: 'boolean',
      default: false,
    },
    liveReload: {
      type: 'boolean',
      default: true,
    },
    enable: {
      type: 'array',
      default: [] as string[],
      choices: [...DEFAULT_IGNORES, ...POSSIBLE_IGNORES],
    },
    disable: {
      type: 'array',
      default: [] as string[],
    },
    port: {
      type: 'number',
      default: +(process.env.ATLASKIT_DEV_PORT || process.env.PORT || 9000),
    },
    host: {
      type: 'string',
      default:
        typeof process.env.VISUAL_REGRESSION !== 'undefined'
          ? '0.0.0.0'
          : process.env.ATLASKIT_DEV_HOST || process.env.HOST || '0.0.0.0',
    },
    disableHostCheck: {
      type: 'boolean',
      default: typeof process.env.VISUAL_REGRESSION !== 'undefined',
    },
    cwd: {
      type: 'string',
      default: process.cwd(),
    },
    watch: {
      type: 'boolean',
      default: true,
    },
    extractReactTypes: {
      type: 'boolean',
      default: process.env.FORCE_EXTRACT_REACT_TYPES === 'true',
    },
    experimental: {
      type: 'array',
      choices: ['esbuild'],
      default: [] as string[],
    },
    minimize: {
      type: 'boolean',
      default: true,
    },
  })
  .strict()
  .example('bolt start button', 'all button examples')
  .example('bolt start <path>', 'a single example')
  .example(
    'bolt start <path> --experimental=esbuild --minimize=false',
    'with esbuild',
  )
  .example('bolt start --disable=website', 'all examples without website shell')
  .example('bolt start editor --enable=media-editor', 'with media-editor')
  .example('bolt start button --enable=analytics', 'with analytics integration')
  .example(
    'bolt start --extract-react-types',
    'with extracted React prop types',
  )
  .example(
    'FORCE_REACT_PROPTYPES=true bolt start',
    'with extracted React prop types',
  );

async function main() {
  const flags = cli.argv;

  const {
    _: input,
    disable,
    disableHostCheck,
    enable,
    host,
    liveReload,
    port,
    report,
  } = flags;

  const cwd = path.resolve(process.cwd(), flags.cwd);
  const mode = 'development';

  const {
    globs,
    allWorkspaces,
    filteredWorkspaces,
    isFile,
    filePath,
    projectRoot,
  } = await filterWorkspaces({
    input,
    docs: !disable.includes('website'),
    cwd,
  });

  // default website to enabled for glob and disabled for file mode
  if (!enable.includes('website') && !disable.includes('website')) {
    const pool = isFile ? disable : enable;
    pool.push('website');
  }

  const isEnabled = (name: string) =>
    !disable.includes(name) &&
    ((enable.length === 0 && !DEFAULT_IGNORES.includes(name)) ||
      enable.includes(name));

  const workspaceNames = filteredWorkspaces.map((ws: bolt.Package) => ws.name);

  cli.choices('disable', [
    ...POSSIBLE_IGNORES,
    ...DEFAULT_IGNORES,
    ...workspaceNames.map(name => {
      const fragments = name.split('/');
      return fragments[fragments.length - 1];
    }),
  ]);

  const isRunning = (name: string) =>
    workspaceNames.some(workspaceName => workspaceName.includes(name));

  if (!globs.length) {
    console.info(`${flags._}: Nothing to run or pattern does not match!`);
    process.exit(0);
  }

  console.log(
    devServerBanner({
      workspaces: filteredWorkspaces,
      port,
      host,
      isAll: allWorkspaces.length === filteredWorkspaces.length,
      isFile,
      filePath,
      input,
      report,
    }),
  );

  if (flags.experimental?.includes('esbuild')) {
    const start = Date.now();
    const spinner = ora(chalk.cyan('Starting experimental server')).start();
    let watchRun = false;

    const esbuildCompiler = await ExperimentalEsbuildCompiler.website({
      extractReactTypes: flags.extractReactTypes,
      globs,
      isEnabled,
      isRunning,
      isFile,
      isPrivateWebsiteBuild: false,
      isProduction: false,
      projectDir: projectRoot,
      contentBase: path.join(cwd, 'public'),
      cwd,
      minify: flags.minimize,
      define: {
        IS_PRIVATE_WEBSITE: false,
        BASE_TITLE: 'Atlaskit by Atlassian',
        PUBLIC_PATH: '/',
        ENABLE_ANALYTICS_GASV3: false,
      },
    });

    esbuildCompiler
      .on('invalidate', () => {
        if (watchRun && process.stdout?.isTTY) {
          const stdout = process.stdout as any;
          stdout.moveCursor(0, -1);
          stdout.clearLine(1);
        }

        watchRun = true;
        spinner.start('Experimentally compiling packages');
      })
      .on('result', (result: any, duration: number) => {
        const seconds = chalk.dim(` ⏱ ${(duration / 1000).toFixed(2)}s`);
        const warnings =
          result.warnings.length > 0
            ? chalk.dim(` ⚠️ ${result.warnings.length}`)
            : '';

        if (result.warnings.length > 0 && flags.verbose) {
          result.warnings.forEach((warning: any) =>
            print(warning, {
              resolvePath: id => id,
              level: 'warning',
            }),
          );
        }

        if (result.errors.length > 0) {
          spinner.stop();

          result.errors.forEach((error: any) =>
            print(error, {
              resolvePath: id => id,
              level: 'error',
            }),
          );

          spinner.fail(`Experimentally compiling packages failed ${seconds}`);
        } else {
          spinner.stop();

          spinner.succeed(
            `Experimentally compiled packages ${warnings}${seconds}`,
          );
        }
      });

    const esbuildServer = ExperimentalEsbuildServer.create(esbuildCompiler, {
      contentBase: path.join(cwd, 'public'),
      hot: liveReload,
    }).on('defer', (deferred: boolean) => {
      if (deferred && !spinner.text.includes('waiting...')) {
        spinner.text = spinner.text + chalk.dim(' waiting...');
      } else {
        spinner.text = spinner.text.replace(/ waiting\.\.\.$/, '');
      }
    });

    const result = await esbuildServer.listen(port);
    const duration = (Date.now() - start) / 1000;
    const seconds = chalk.dim(` ⏱ ${duration.toFixed(2)}s`);
    const warnings =
      result.warnings.length > 0
        ? chalk.dim(` ⚠️ ${result.warnings.length}`)
        : '';

    if (result.warnings.length > 0 && flags.verbose) {
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

      spinner.fail(`Starting experimental server failed ${seconds}`);
      process.exit(1);
    } else {
      spinner.succeed(`Started experimental server ${warnings}${seconds}`);
    }

    return;
  }

  const config = await createWebpackConfig({
    globs,
    mode,
    websiteDir: cwd,
    report,
    isEnabled,
    isRunning,
    isFile,
    port,
    watch: flags.watch,
    extractReactTypes: flags.extractReactTypes,
  });

  const compiler = webpack(config);

  const reporter = BuildReporter.create()
    .augment({
      workspaces: workspaceNames,
    })
    ?.tapWebpack(compiler, () => ({
      action: 'bundled',
      actionSubject: 'webpackDevServer',
    }));

  const spinner = ora(chalk.cyan('Starting server'));

  // Wait for webpack-dev-server start output to be logged
  setTimeout(() => spinner.start(), 0);

  const server = new WebpackDevServer(compiler, {
    compress: true,
    liveReload,
    historyApiFallback: true,
    disableHostCheck,

    overlay: true,
    stats: statsOptions,
    noInfo: true,
    quiet: true,
    contentBase: path.join(cwd, 'public'),
    publicPath: '/',
    before(app) {
      /**
       * See @atlaskit/build-reporting for details
       * {@link BuildReporter#exposeModuleSummary}
       **/
      reporter?.exposeModuleSummary(compiler, {
        app,
        rootPath: projectRoot,
      });

      app.use(
        /^(!bundled\/).*/,
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    },
  });

  return new Promise((_, reject) => {
    let watchRun = false;

    compiler.hooks.watchRun.tap('dev-server', () => {
      if (watchRun && process.stdout?.isTTY) {
        const stdout = process.stdout as any;
        stdout.moveCursor(0, -1);
        stdout.clearLine(1);
      }

      watchRun = true;
      spinner.start(chalk.cyan('Compiling packages'));
    });

    compiler.hooks.done.tap('done', result => {
      const data = result.toJson({
        all: false,
        timings: true,
      });

      const seconds = data.time ? ` ${(data.time / 1000).toFixed(2)}s` : '';

      if (result.hasErrors()) {
        const message = watchRun
          ? 'Compiling packages failed'
          : 'Starting server failed';

        spinner.fail(`${chalk.red(message)}${chalk.dim(seconds)}`);
        console.error(result.toString('errors-only'));
        return;
      }

      const message = watchRun ? 'Compiled packages' : 'Started server';
      spinner.succeed(`${chalk.cyan(message)} ${chalk.dim(seconds)}`);
    });

    // webpack-dev-server previously black-holed errors happening during startup
    // e.g. when trying to bind an occupied port
    if ((server as any).listeningApp) {
      (server as any).listeningApp.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          spinner.fail(`Starting server failed. Port ${port} in use.`);
          reject();
        }

        reject(err);
      });
    } else {
      console.warn(
        `HTTP server not found at expected property server.listeningApp. Test if server shut downs as expected if port is already in use.`,
      );
    }

    // eslint-disable-next-line consistent-return
    server.listen(port, host, err => {
      if (err) {
        spinner.fail();
        return reject(err);
      }
    });
  });
}

main().catch(err => {
  console.error(err);
  process.exit(err.code ?? 1);
});
