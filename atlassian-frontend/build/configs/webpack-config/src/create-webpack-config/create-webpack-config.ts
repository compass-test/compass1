import path from 'path';

import * as bolt from 'bolt';
import webpack from 'webpack';

import { moduleResolveMapBuilder } from '@atlaskit/multi-entry-tools';

import { createDefaultGlob } from '../utils/create-default-glob';
import { statsOptions } from './stats-options';
import { ignoreModules } from './ignore-modules';
import { getCommitHash } from '../utils/get-commit-hash';
import { getPublicPath } from '../utils/get-public-path';
import { getPlugins } from './get-plugins';
import { getOptimizations } from './get-optimizations';
import { getModuleRules } from './get-module-rules';
import { getEntries } from './get-entries';

// Transpiling code using Babel can be a slow, so we need to make sure we
// process as few files as possible.
//
// Usually we do this be excluding node_modules, since packages should come
// with pre-processed modules. However some packages don't come in the required
// formats and still need to be transpiled.
//
// This array is the list of dependencies that need to be excluded from the
// ignore list.
const transpileDependencies = [
  'use-global-hook', // Used by Compass to manage error boundaries
  '@graphql-tools', // Used by Compass to mock AGG in storybooks
];

export interface CreateWebpackConfigOptions {
  entry?: webpack.Configuration['entry'];
  globs?: string[];
  isEnabled?(id: string): boolean;
  isFile?: boolean;
  isRunning?(id: string): boolean;
  websitePrivate?: boolean;
  mode?: 'development' | 'production';
  noMinimize?: boolean;
  openAnalyzer?: boolean;
  output?: webpack.Configuration['output'];
  port?: number;
  report?: boolean;
  websiteDir?: string;
  watch?: boolean;
  extractReactTypes?: boolean;
}

export async function createWebpackConfig(
  opts: CreateWebpackConfigOptions,
): Promise<webpack.Configuration> {
  const globs = opts.globs ?? createDefaultGlob();
  const mode = opts.mode ?? 'development';
  const websiteDir = opts.websiteDir ?? process.cwd();
  const isEnabled = opts.isEnabled ?? (() => true);
  const isRunning = opts.isRunning ?? (() => true);
  const isProduction = opts.mode === 'production';
  const openAnalyzer = opts.openAnalyzer ?? false;
  const project = await bolt.getProject();

  // Synchrony integration should be enabled only in development mode
  const isSynchronyEnabled =
    !isProduction && (process.env.SYNCHRONY_URL || null) !== null;

  // GASv3 integration should be enabled only in development mode
  // So we should check if is not production and we are requiring GASv3
  // integration in dev mode
  const isAnalyticsEnabled =
    !isProduction &&
    (process.env.ENABLE_ANALYTICS_GASV3 || '').toLowerCase() === 'true';

  const isPrivateWebsiteBuild = opts.websitePrivate ?? false;
  const commitHash = getCommitHash();
  const publicPath = getPublicPath(isPrivateWebsiteBuild, commitHash);

  const moduleResolveMap = await moduleResolveMapBuilder({
    addDefaultEntries: true,
  });

  const resolveOptions = {
    mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
    extensions: ['.js', '.ts', '.tsx'],
    alias: { ...moduleResolveMap },
  };

  const ignore = (names: string[], ignored: boolean) =>
    ignoreModules({
      names,
      ignored,
      cwd: websiteDir,
      options: resolveOptions,
    });

  return {
    stats: statsOptions,
    watch: opts.watch,
    mode,
    performance: {
      // performance hints are used to warn you about large bundles but come at their own perf cost
      hints: false,
    },
    entry: opts.entry ?? {
      main: isEnabled('website')
        ? getEntries({
            isProduction,
            websiteDir,
            entryPath: './src/index.tsx',
            port: opts.port,
          })
        : path.resolve(websiteDir, './src/redirect.ts'),
      examples: getEntries({
        isProduction,
        websiteDir,
        entryPath: './src/examples-entry.tsx',
        port: opts.port,
      }),
    },
    output: opts.output
      ? {
          // Opt into webpack 5 behaviour
          futureEmitAssets: isProduction,
          ...opts.output,
        }
      : {
          // Silence worker plugin warning as per https://github.com/GoogleChromeLabs/worker-plugin/issues/20
          globalObject: '(typeof self!="undefined"?self:this)',
          filename: '[name].js',
          path: path.resolve(websiteDir, 'dist'),
          publicPath,
          // Opt into webpack 5 behaviour
          futureEmitAssets: isProduction,
        },
    devtool: isProduction ? false : 'cheap-module-source-map',
    module: {
      rules: getModuleRules({
        globs,
        isEnabled,
        isFile: opts.isFile,
        forceTranspilation: transpileDependencies,
        projectRoot: project.dir,
      }),
    },
    resolve: {
      ...resolveOptions,
      alias: {
        ...moduleResolveMap,
        // skip lowlight bundling if not explicitly enabled
        ...(await ignore(
          [
            require.resolve(
              'react-syntax-highlighter/dist/esm/default-highlight',
            ),
            require.resolve('react-syntax-highlighter/dist/esm/light'),
            require.resolve('react-syntax-highlighter/dist/esm/light-async'),
            require.resolve(
              'react-syntax-highlighter/dist/esm/async-languages/hljs',
            ),
            'lowlight',
          ],
          !isEnabled('highlight.js'),
        )),
        // skip analytics bundling if not explicity enabled
        ...(!isAnalyticsEnabled
          ? {
              '@atlassiansox/analytics-web-client': path.resolve(
                __dirname,
                '../../assets',
                'analytics-web-client-mock.js',
              ),
              '@atlassiansox/analytics-web-client/dist/analytics-web-client.with-deps': path.resolve(
                __dirname,
                '../../assets',
                'analytics-web-client-mock.js',
              ),
            }
          : null),
        // skip media bundling if not explicitly enabled
        ...(await ignore(
          ['@atlaskit/media-editor'],
          !isEnabled('media-editor') && !isRunning('media'),
        )),
        ...(await ignore(
          ['@atlaskit/media-viewer'],
          !isEnabled('media-viewer') && !isRunning('media'),
        )),

        // cldr packages amd modules, but we want es6
        cldr$: 'cldrjs',
        cldr: 'cldrjs/dist/cldr',
      },
    },
    resolveLoader: {
      modules: [
        path.join(project.dir, 'node_modules'),
        path.join(project.dir, 'build'),
      ],
      alias: opts.extractReactTypes
        ? undefined
        : {
            // noop extrac-react-types-loader for a quicker dev loop
            'extract-react-types-loader': require.resolve(
              '../../assets/noop-extract-react-types-loader',
            ),
          },
    },
    plugins: getPlugins({
      websiteDir,
      isProduction,
      report: opts.report,
      isAnalyticsEnabled,
      isSynchronyEnabled,
      commitHash,
      isPrivateWebsiteBuild,
      publicPath,
      openAnalyzer,
    }),
    optimization: getOptimizations({
      isProduction,
      noMinimize: opts.noMinimize,
    }),
  };
}
