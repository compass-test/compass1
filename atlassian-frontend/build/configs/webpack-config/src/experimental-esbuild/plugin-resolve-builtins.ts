import path from 'path';
import type Esbuild from 'esbuild';

export const pluginResolveBuiltins = (): Esbuild.Plugin => ({
  name: 'resolve-builtins',

  async setup(esbuild) {
    const mapping: Record<string, string> = {
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('../../assets/empty.js'),
      https: require.resolve('../../assets/empty.js'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('../../assets/empty.js'),
      // force-resolve to commonjs output to avoid interop issues
      'react-loosely-lazy': require.resolve('react-loosely-lazy'),
      'react-resource-router': require.resolve('react-resource-router'),
      'react-router': require.resolve('react-router'),
      'react-router-dom': require.resolve('react-router-dom'),
      history: require.resolve('history'),
      'value-equal': require.resolve('value-equal'),
      nanoid: path.join(require.resolve('nanoid'), '../index.prod.js'),
      'apollo-client': require.resolve('apollo-client'),
    };

    Object.entries(mapping).forEach(([id, tsPath]) => {
      esbuild.onResolve({ filter: new RegExp(`^${id}$`) }, () => ({
        path: tsPath,
      }));
    });
  },
});
