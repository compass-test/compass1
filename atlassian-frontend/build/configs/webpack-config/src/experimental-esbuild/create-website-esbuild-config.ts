import fs from 'fs';
import path from 'path';
import { BuildOptions, Plugin } from 'esbuild';
import * as memfs from 'memfs';
import pluginGlobals from '@esbuild-plugins/node-globals-polyfill';
import { moduleResolveMapBuilder } from '@atlaskit/multi-entry-tools';

import { pluginResolveLocal } from './plugin-resolve-local';
import { pluginResolveData } from './plugin-resolve-data';
import { pluginDisabled } from './plugin-disabled';
import { getCommitHash } from '../utils/get-commit-hash';
import { pluginHtml } from './plugin-html';
import { getPublicPath } from '../utils/get-public-path';
import { createEsbuildConfig } from './create-esbuild-config';

export interface CreateWebsiteEsbuildConfig {
  extractReactTypes?: boolean;
  fs: typeof fs | memfs.IFs;
  globs: string[];
  write?: boolean;
  incremental: boolean;
  plugins: Plugin[];
  isEnabled(id: string): boolean;
  isRunning(id: string): boolean;
  isPrivateWebsiteBuild: boolean;
  isProduction: boolean;
  cwd: string;
  rootPath: string;
  outdir: string;
  contentBase: string;
  define?: Record<string, string | boolean | number | undefined>;
  minify?: boolean;
}

export async function createWebsiteEsbuildConfig(
  opts: CreateWebsiteEsbuildConfig,
): Promise<BuildOptions> {
  const mainEntry = opts.isEnabled('website')
    ? path.join(opts.cwd, 'src/index.tsx')
    : path.join(opts.cwd, 'src/redirect.ts');

  const exampleEntry = path.join(opts.cwd, 'src/examples-entry.tsx');

  const commitHash = getCommitHash();
  const iconSuffix = opts.isProduction ? '' : '-dev';
  const publicPath = getPublicPath(opts.isPrivateWebsiteBuild, commitHash);

  const title = opts.isProduction
    ? 'Atlaskit by Atlassian'
    : 'atlassian-frontend development';

  return createEsbuildConfig({
    write: opts.write ?? false,
    incremental: opts.incremental,
    splitting: opts.isEnabled('website'),
    tsconfig: path.join(opts.rootPath, 'tsconfig.json'),
    babelconfig: path.join(opts.rootPath, 'babel.config.js'),
    outdir: opts.outdir,
    publicPath: '/output',
    define: opts.define,
    minify: opts.minify,
    entryPoints: {
      main: mainEntry,
      example: exampleEntry,
    },
    plugins: [
      pluginHtml({
        template: path.join(opts.cwd, 'public/index.html.ejs'),
        outdir: opts.contentBase,
        entryPoints: ['output/main.js'],
        publicPath,
        fs: opts.fs,
        favicon: `favicon${iconSuffix}.ico`,
        title,
      }),
      pluginHtml({
        template: path.join(opts.cwd, 'public/examples.html.ejs'),
        outdir: opts.contentBase,
        entryPoints: ['output/example.js'],
        publicPath,
        fs: opts.fs,
        favicon: `favicon${iconSuffix}.ico`,
        title,
      }),
      pluginGlobals({
        // buffer: true,
        // process: true,
        process: false,
        define: {
          SYNCHRONY_URL: `${JSON.stringify('')}`,
          ENABLE_ANALYTICS_GASV3: `${JSON.stringify(
            opts.isEnabled('analytics'),
          )}`,
          COMMIT_HASH: JSON.stringify(getCommitHash()),
          IS_PRIVATE_WEBSITE: JSON.stringify(opts.isPrivateWebsiteBuild),
          'process.release.name': JSON.stringify(''),
          'process.env.CI': JSON.stringify(false),
          'process.env.NODE_DEBUG': JSON.stringify(''),
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env._PACKAGE_NAME_': JSON.stringify('package_name'),
          'process.env._PACKAGE_VERSION_': JSON.stringify('0.0.0-development'),
        },
      }),
      pluginDisabled({
        isEnabled: opts.isEnabled,
        isRunning: opts.isRunning,
      }),
      pluginResolveLocal({
        map: await moduleResolveMapBuilder({
          addDefaultEntries: true,
          useAtlaskitSrc: true,
        }),
      }),
      pluginResolveData({
        extractReactTypes: opts.extractReactTypes ?? false,
        isEnabled: opts.isEnabled,
        include: opts.globs,
        exclude: [
          '**/node_modules/**',
          'packages/build/website/docs/**',
          'packages/css-packs/**', // uses style-loader
          'packages/design-system/code/**', // uses style-loader
        ],
      }),
    ],
  });
}
