import path from 'path';
import { Logger } from 'winston';
import { FilePath } from '../../types';
import { IUnionFs } from 'unionfs';
import { promisify } from 'util';
import _resolve from 'resolve';
import _webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import getAlternativeEntryPointAliasMap from './multi-entry-tools/moduleResolveMapBuilder';

const resolve = promisify(_resolve);

export default async function createWebpackConfig(
  entry: FilePath,
  outputDir: FilePath,
  fs: IUnionFs,
  logger: Logger,
) {
  const entryDir = path.dirname(entry);
  const outputBasename = path.basename(entry, path.extname(entry)) + '.js';
  const [reactPath, reactDomPath] = await Promise.all([
    // @ts-ignore
    resolve('react', { baseDir: entryDir }),
    // @ts-ignore
    resolve('react-dom', { baseDir: entryDir }),
  ]);

  const compiler = _webpack({
    // @ts-ignore
    entry,
    mode: 'production',
    output: {
      path: outputDir,
      filename: `[name].${outputBasename}`,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              rootMode: 'upward',
              envName: 'production:esm',
              cacheDirectory: true,
            },
          },
        },
        {
          test: /\.(png|jpe?g|svg|gif)?$/,
          use: 'url-loader',
        },
      ],
    },
    resolve: {
      alias: {
        react: reactPath,
        'react-dom': reactDomPath,
        // lets us resolve multi-entrypoint parts of packages (i.e import types from '@atlaskit/button/types')
        ...(await getAlternativeEntryPointAliasMap()),
      },
      // lets us resolve default exports for packages (i.e import Button from '@atlaskit/button';)
      mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false,
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
      runtimeChunk: 'single',
    },
  });
  // @ts-ignore
  compiler.inputFileSystem = fs;

  return {
    outputFilepath: path.join(outputDir, outputBasename),
    compiler,
  };
}
