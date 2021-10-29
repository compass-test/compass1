import * as esbuild from 'esbuild';
import pluginGlobals from '@esbuild-plugins/node-globals-polyfill';
import { pluginCompiledReact } from './plugin-compiled-react';
import { pluginResolveBuiltins } from './plugin-resolve-builtins';

export interface CreateEsbuildConfig {
  write?: boolean;
  minify?: boolean;
  incremental?: boolean;
  splitting?: boolean;
  outdir: string;
  entryPoints: Record<string, string>;
  tsconfig: string;
  babelconfig: string;
  define?: Record<string, string | boolean | number | undefined>;
  plugins?: esbuild.Plugin[];
  publicPath?: string;
}

export async function createEsbuildConfig(
  opts: CreateEsbuildConfig,
): Promise<esbuild.BuildOptions> {
  return {
    write: opts.write ?? false,
    incremental: opts.incremental,
    metafile: true,
    bundle: true,
    splitting: opts.splitting,
    format: 'esm',
    outdir: opts.outdir,
    minify: opts.minify,
    publicPath: opts.publicPath,
    sourcemap: true,
    sourcesContent: true,
    mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
    loader: {
      '.js': 'jsx',
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'file',
      '.md': 'text',
    },
    resolveExtensions: ['.js', '.ts', '.tsx'],
    entryPoints: opts.entryPoints,
    tsconfig: opts.tsconfig,
    plugins: [
      ...(opts.plugins ?? []),
      pluginResolveBuiltins(),
      pluginCompiledReact({
        filter: new RegExp('design-system/lozenge(.*).(tsx?)'),
        configFile: opts.babelconfig,
      }),
      pluginGlobals({
        buffer: true,
        process: true,
        define: {
          'process.release.name': JSON.stringify(''),
          'process.env.CI': JSON.stringify(false),
          'process.env.NODE_DEBUG': JSON.stringify(''),
          'process.env.NODE_ENV': JSON.stringify('development'),
          'process.env._PACKAGE_NAME_': JSON.stringify('package_name'),
          'process.env._PACKAGE_VERSION_': JSON.stringify('0.0.0-development'),
        },
      }),
    ],
    define: {
      global: 'window',
      setImmediate: 'setTimeout',
      ...Object.entries(opts.define ?? {}).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          acc[key] = JSON.stringify(value);
          return acc;
        },
        {},
      ),
    },
  };
}
