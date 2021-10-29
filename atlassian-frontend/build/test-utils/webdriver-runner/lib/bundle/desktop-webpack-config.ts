/*
 * util module to build webpack-dev-server for running integration test.
 * const CHANGED_PACKAGES accepts environment variable which is used to
 * identify changed packages and return changed packages containing webdriverTests to be built.
 */

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links
// @ts-ignore
import DirectoryWatcher from 'watchpack/lib/DirectoryWatcher';

if (!DirectoryWatcher.afPatched) {
  const _oldcreateNestedWatcher =
    DirectoryWatcher.prototype.createNestedWatcher;
  // eslint-disable-next-line func-names
  DirectoryWatcher.prototype.createNestedWatcher = function (dirPath: string) {
    // Any new files created under src/ will trigger a rebuild when in watch mode
    // If we are just adding snapshots or updating tests, we can safely ignore those
    if (dirPath.includes('__snapshots__')) {
      return;
    }
    if (dirPath.includes('__image_snapshots__')) {
      return;
    }
    if (
      dirPath.includes('__tests__') &&
      !dirPath.includes('integration') &&
      !dirPath.includes('integration-webview') &&
      !dirPath.includes('visual-regression')
    ) {
      return;
    }
    if (dirPath.includes('node_modules')) {
      return;
    }
    _oldcreateNestedWatcher.call(this, dirPath);
  };
  DirectoryWatcher.afPatched = true;
}

import * as bolt from 'bolt';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import ora from 'ora';
import chalk from 'chalk';
import globby from 'globby';
import { BuildReporter } from '@atlaskit/build-reporting';
import {
  createWebpackConfig,
  createWorkspacesGlob,
} from '@atlaskit/webpack-config';
import * as mobileWebpack from './mobile-webpack-config';

interface StartDevServerOptions {
  mobile: boolean;
  watch: boolean;
  host: string;
  port: number;
  patterns: string[];
  testDirectory: string;
  changed?: string[];
}

/**
 * Promisify the close function so that we can await it and catch/swallow any errors
 * thrown by DirectoryWatcher when closing. The cause of the errors are unknown.
 */
class PromisifiedWebpackDevServer extends WebpackDevServer {
  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        super.close(() => {
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

/**
 * @deprecated
 * Remap packages without examples to a package they intend to leverage within their tests.
 */
function rewritePackagesWithoutExamples(globs: string[]) {
  return globs.map((glob: string) => {
    return glob
      .replace(
        'build/test-utils/webdriver-runner',
        'packages/design-system/button',
      )
      .replace('website', 'packages/design-system/button')
      .replace('build/configs/webpack-config', 'packages/design-system/button')
      .replace('packages/editor/editor-common', 'packages/editor/editor-core');
  });
}

const workspaceTestable = (
  pattern: string,
): ((ws: bolt.Package) => boolean) => ws => {
  const matches = globby.sync(
    `{**/__tests__,__tests__}/${pattern}/**/*.+(js|ts|tsx)`,
    {
      cwd: ws.dir,
      ignore: ['node_modules', 'build'],
    },
  );
  return matches.length > 0;
};

interface WorkspaceMatchesOptions {
  patterns: string[];
  projectRoot: string;
}

const workspaceMatches = ({
  patterns,
  projectRoot,
}: WorkspaceMatchesOptions): ((ws: bolt.Package) => boolean) => ws =>
  patterns.some(
    pattern =>
      ws.name.endsWith(pattern) ||
      path.join(projectRoot, pattern).startsWith(ws.dir),
  );

export async function startDevServer(options: StartDevServerOptions) {
  const project = await bolt.getProject({ cwd: process.cwd() });
  const allWorkspaces = await bolt.getWorkspaces();

  const patterns =
    options.patterns.length > 0
      ? options.patterns
      : allWorkspaces.map(ws => ws.name);

  const workspaces = allWorkspaces
    .filter(
      workspaceMatches({
        patterns: options.changed ?? patterns,
        projectRoot: project.dir,
      }),
    )
    .filter(workspaceTestable(options.testDirectory));

  /**
   * At the moment, the website, editor-common, webdriver-runner and webpack folders do not have examples and it is not possible to test it.
   * The current workaround, is to build / start another package that starts the homepage and indirectly test the website and other examples.
   */
  const globs = rewritePackagesWithoutExamples(
    createWorkspacesGlob(workspaces, project.dir, false),
  );

  const port = options.mobile
    ? mobileWebpack.getEditorMobileBridgePort()
    : options.port;

  const webpackConfig = options.mobile
    ? await mobileWebpack.getEditorMobileBridgeWebpackConfig()
    : await createWebpackConfig({
        globs,
        mode: 'development',
        websiteDir: path.join(__dirname, '../../../../..', 'website'),
        watch: false,
      });

  if (
    options.mobile &&
    !workspaces.some(ws => ws.name === '@atlaskit/editor-mobile-bridge')
  ) {
    console.log(
      chalk.yellow(
        'No editor-mobile-bridge tests to run or pattern contains different package(s) - currently only editor-mobile-bridge is configured to run the mobile app tests',
      ),
    );
    return Promise.resolve(null);
  } else if (!workspaces.length) {
    console.info(chalk.yellow('Nothing to run or pattern does not match!'));
    return Promise.resolve(null);
  }

  const compiler = webpack({ ...webpackConfig, watch: options.watch });

  const reporter = BuildReporter.create()
    .augment({
      workspaces: workspaces.map((ws: any) => ws.name),
    })
    .tapWebpack(compiler, () => ({
      action: 'bundled',
      actionSubject: 'webpackTestServer',
    }));

  const spinner = ora(chalk.cyan('Starting webpack dev server'));
  // Wait for webpack-dev-server start output to be logged
  setTimeout(() => spinner.start());

  const server = new PromisifiedWebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,
    historyApiFallback: true,

    //silence webpack logs
    quiet: true,
    noInfo: false,
    overlay: false,
    // Disable host checking to ensure Browerstack local testing correctly resolves.
    disableHostCheck: true,

    // disable hot reload for tests - they don't need it for running
    hot: false,
    liveReload: false,
    inline: false,
    watchOptions: {
      ignored: options.watch ? undefined : ['**/*', '**/.*', '**/.*/**'],
    },

    before(app) {
      /**
       * See @atlaskit/build-reporting for details
       * {@link WepbackBuildReporter#exposeModuleSummary}
       **/

      reporter.exposeModuleSummary(compiler, {
        app,
        rootPath: project.dir,
      });

      app.use(
        /^(!bundled\/).*/,
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    },
    publicPath: '/',
    contentBase: options.mobile
      ? undefined
      : path.join(__dirname, '../../../../..', 'website/public'),
  });

  return new Promise<PromisifiedWebpackDevServer>((resolve, reject) => {
    compiler.hooks.done.tap('done', result => {
      if (result.hasErrors()) {
        const err = new Error(result.toString('errors-only'));

        if (!options.watch) {
          spinner.succeed(chalk.cyan('Failed compiling packages!'));
          return reject(err);
        } else {
          console.error(err);
        }
      }

      resolve(server);
      spinner.succeed(chalk.cyan('Compiled packages!'));
    });

    // webpack-dev-server previously black-holed errors happening during startup
    // e.g. when trying to bind an occupied port
    if ((server as any).listeningApp) {
      (server as any).listeningApp.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          spinner.fail(
            `Starting server failed. Port ${options.port} in use. Alternative:`,
          );
          console.log(`PORT=${options.port + 1} bolt start`);
          process.exit(1);
        }
      });
    } else {
      console.warn(
        `HTTP server not found at expected property server.listeningApp. Test if server shut downs as expected if port is already in use.`,
      );
    }

    // eslint-disable-next-line consistent-return
    server.listen(port, options.host, err => {
      if (err) {
        spinner.fail();
        console.log(chalk.red((err.stack as any) || err));
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject(1);
      }
    });
  });
}
