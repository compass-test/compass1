/* eslint-disable global-require */
import { Compiler } from 'webpack';
import {
  analyticsClient,
  AnalyticsClient,
} from '@atlassiansox/analytics-node-client';
import git from '@af/utils/git';

// Set to false to short-circuit all builds analytics into noop
const {
  BUILD_REPORTING_ENABLED, // top level switch
  BUILD_REPORTING_TAP_WEBPACK, // toggle bundle stats
  BUILD_REPORTING_EXPOSE_MODULE_SUMMARY, // toggle module summaries
} = process.env;

type PrivateProperties = {
  augmentation?: Record<string, string | string[] | number | boolean>;
  anonymousId?: string;
  source?: string;
  analyticsClient?: InstanceType<typeof AnalyticsClient>;
};

const privateProperties = new WeakMap<BuildReporter, PrivateProperties>();

const set = <T extends keyof PrivateProperties>(
  self: BuildReporter,
  prop: T | PrivateProperties,
  value?: PrivateProperties[T],
) => {
  if (typeof prop === 'object' && typeof value === 'undefined') {
    privateProperties.set(self, {
      ...(privateProperties.get(self) || {}),
      ...(prop as PrivateProperties),
    });

    return;
  }

  privateProperties.set(self, {
    ...(privateProperties.get(self) || {}),
    [prop as T]: value,
  });
};

export class BuildReporter {
  static create() {
    const env = process.env.ANALYTICS_ENV || 'prod';
    return new BuildReporter({
      env,
    });
  }

  static safely<P extends Array<any>, R>(
    fn: (...args: P) => R,
    silent: boolean,
    fallback: R,
  ): (...args: P) => R;
  static safely<P extends Array<any>, R>(
    fn: (...args: P) => R,
    silent?: boolean,
    fallback?: R,
  ): (...args: P) => R | undefined;
  static safely<P extends Array<any>, R>(
    fn: (...args: P) => R,
    silent = false,
    fallback?: R,
  ): (...args: P) => R | undefined {
    return (...args: P) => {
      try {
        if (BUILD_REPORTING_ENABLED !== 'false') {
          return fn(...args);
        }
      } catch (err) {
        if (silent === false) {
          console.debug('Failed in build reporter: ', err);
        }
      }

      return fallback;
    };
  }

  constructor(opts: { env: string; anonymousId?: string; source?: string }) {
    set(this, {});

    BuildReporter.safely(() => {
      set(this, {
        augmentation: {},
        // eslint-disable-next-line global-require
        anonymousId: opts.anonymousId || require('uuid/v4')(),
        source: opts.source || 'build-reporting.js',
        analyticsClient: analyticsClient({
          env: opts.env,
          product: 'atlaskit',
        }),
      });
    })();
  }

  env = BuildReporter.safely(async () => {
    const {
      BITBUCKET_BRANCH,
      BITBUCKET_BUILD_NUMBER,
      BITBUCKET_COMMIT,
      BITBUCKET_PARALLEL_STEP,
      BITBUCKET_PIPELINE_UUID,
      BITBUCKET_PR_DESTINATION_BRANCH,
      BITBUCKET_PR_ID,
      BITBUCKET_STEP_TRIGGERER_UUID,
      BITBUCKET_STEP_UUID,
      CUSTOM_BUILD,
      LANDKID,
      USER,
    } = process.env;

    // There is an edge case, when running a custom build on a commit where
    // - `BITBUCKET_BRANCH` will not be defined as per the implementation of BB env vars.
    // - `git().getBranchName()` will not be defined due to running on a detached `HEAD`.
    const branchName = BITBUCKET_BRANCH || (await git().getBranchName()) || '';

    const branchOrLandkid = LANDKID ? 'Landkid' : branchName;
    const branchOrLocal =
      USER && !branchOrLandkid ? `${USER}_local_run` : branchOrLandkid;

    const BUILD_BRANCH_NAME = [branchOrLocal, BITBUCKET_PARALLEL_STEP]
      .filter(Boolean)
      .join('_');

    const buildType = CUSTOM_BUILD ? 'custom' : 'default';

    const { augmentation } = privateProperties.get(this)!;

    return {
      BITBUCKET_BUILD_NUMBER,
      BITBUCKET_BRANCH,
      BITBUCKET_COMMIT,
      BITBUCKET_PIPELINE_UUID,
      BITBUCKET_PR_ID,
      BITBUCKET_PR_DESTINATION_BRANCH,
      BITBUCKET_STEP_TRIGGERER_UUID,
      BITBUCKET_STEP_UUID,
      buildNumber: BITBUCKET_BUILD_NUMBER,
      branch: BUILD_BRANCH_NAME,
      buildType,
      ...augmentation,
    };
  });

  /**
   * @description
   * Add attributes to events fired from this reporter
   *
   * @example
   * ```ts
   * const reporter = BuildReporter.create();
   * reporter.augment({ Hello: 'World!' });
   * ```
   */
  augment = BuildReporter.safely(
    (augmentation: PrivateProperties['augmentation']) => {
      set(this, 'augmentation', augmentation);
      return this;
    },
    true,
    this,
  );

  /**
   * @description
   * Tap into a webpack compiler instance and send events on done
   *
   * @example
   * ```ts
   * BuildReporter
   *  .create()
   *  .tapWebpack(compiler);
   * ```
   */
  tapWebpack = BuildReporter.safely(
    (compiler: Compiler, action) => {
      if (BUILD_REPORTING_TAP_WEBPACK === 'false') {
        return this;
      }

      // eslint-disable-next-line global-require
      const { performance } = require('perf_hooks');
      let buildStart = performance.now();
      let bundleType = 'build';

      compiler.hooks.run.tap('build-reporting', () => {
        buildStart = performance.now();
      });

      compiler.hooks.watchRun.tap('build-reporting', () => {
        buildStart = performance.now();
        bundleType = 'watch';
      });

      compiler.hooks.done.tap('build-reporting', async (stats: any) => {
        try {
          const data = stats.toJson({
            all: false,
            modules: true,
            version: true,
          });

          await this.sendOperationalEvent({
            ...action(stats),
            attributes: {
              duration: performance.now() - buildStart,
              bundleType,
              version: data.version,
              modules: data.modules.length,
              moduleSize: data.modules.reduce(
                (acc: number, mod: any) => acc + mod.size,
                0,
              ),
              isHotReload: stats.compilation.fileTimestamps.size > 0,
            },
          });
        } catch (err) {
          console.error(err);
        }
      });
      return this;
    },
    true,
    this,
  );

  /**
   * @summary
   * Expose a summary of the modules in a webpack compilation as
   * route on webpack-dev-server
   *
   * @details
   * Mounts a route at /bundled/:id exposing data about the module
   * with a given id. Can be switched of via
   * BUILD_REPORTING_EXPOSE_MODULE_SUMMARY or BUILD_REPORTING_ENABLED.
   *
   * ```sh
   * yarn start editor-core
   * curl localhost:9000/bundled/react-popper
   * {
   *  "id": "node_modules/react-popper/lib/esm/index.js",
   *  "name": "react-popper",
   *  "bundled": true,
   *  "chunks": ["main"],
   *  "path": [
   *    "node_modules/@atlaskit/navigation/dist/esm/index.js",
   *    "node_modules/@atlaskit/navigation/dist/esm/components/js/overflow/OverflowHandler.js",
   *    "node_modules/@atlaskit/navigation/dist/esm/components/js/overflow/OverflowDropdown.js",
   *    "node_modules/@atlaskit/tooltip/dist/esm/index.js",
   *    "node_modules/@atlaskit/tooltip/dist/esm/components/Tooltip.js",
   *    "node_modules/@atlaskit/tooltip/node_modules/@atlaskit/popper/dist/esm/index.js",
   *    "node_modules/@atlaskit/tooltip/node_modules/@atlaskit/popper/dist/esm/Popper.js"
   *  ]
   * }
   *
   * curl localhost:9000/bundled/jest
   * {
   *   "id": "node_modules/jest/build/jest.js",
   *   "name": "jest",
   *   "bundled":false,
   *   "chunks":[],
   *   "path":[]
   * }
   * ```
   *
   * @example
   * ```ts
   * BuildReporter
   *  .create()
   *  .exposeModuleSummary(compiler, { cwd: process.cwd() });
   * ```
   */
  exposeModuleSummary = BuildReporter.safely(
    (compiler: Compiler, { app, rootPath }) => {
      if (BUILD_REPORTING_EXPOSE_MODULE_SUMMARY === 'false') {
        return this;
      }

      // eslint-disable-next-line import/no-extraneous-dependencies
      const { ModuleSummary } = require('./module-summary');

      let queue: Array<(data: any) => void> = [];
      let status = 'run';
      let statsData: any;

      const enqueue = (fn: (data: any) => void) =>
        status === 'run' ? queue.push(fn) : fn(statsData);

      compiler.hooks.run.tap('build-reporting', () => {
        status = 'run';
      });

      compiler.hooks.watchRun.tap('build-reporting', () => {
        status = 'run';
      });

      compiler.hooks.done.tap('build-reporting', (stats: any) => {
        status = 'done';
        statsData = stats.toJson({ all: false, modules: true });
        queue.forEach(fn => fn(statsData));
        queue = [];
      });

      app.use('/bundled/:name', (req: any, res: any) => {
        enqueue(async data => {
          try {
            const summary = ModuleSummary.create(data, {
              rootPath,
              options: compiler.options,
            });

            const mod = await summary.get(req.params.name);
            res.type('json').send(mod);
          } catch (err) {
            console.error(err);
            res.status(500).send({
              message: err.message,
            });
          }
        });
      });

      return this;
    },
    undefined,
    this,
  );

  sendOperationalEvent = BuildReporter.safely(async event => {
    const { analyticsClient, source, anonymousId } = privateProperties.get(
      this,
    )!;

    if (!analyticsClient && (process.env.CI || process.env.ANALYTICS_DEBUG)) {
      console.warn(
        'analytics client not available, skipping sendOperationalEvent',
      );
      return;
    }

    const env = await this.env();
    const payload = {
      anonymousId,
      operationalEvent: {
        source,
        ...event,
        attributes: {
          ...env,
          ...event.attributes,
        },
      },
    };

    if (process.env.ANALYTICS_DEBUG) {
      // eslint-disable-next-line global-require
      const util = require('util');
      console.log(util.inspect(payload, { depth: Infinity, colors: true }));
    }

    await analyticsClient!.sendOperationalEvent(payload);
  }, !process.env.CI && !process.env.ANALYTICS_DEBUG);
}
