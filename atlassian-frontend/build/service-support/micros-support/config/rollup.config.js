import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import pluginJson from '@rollup/plugin-json';
import builtins from 'builtin-modules';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/handler.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      include: /.ts/,
    }),
    pluginJson(),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: ['./src/**/*.ts', /node_modules/], // Default: undefined

      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false, // Default: false

      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false, // Default: true
      /* Don't process or bundle these modules and keep any existing require's for them as-is
       * They cause issues because they are dynamically required inside try-catch which is incompatible
       * with rollup due to the fact that rollup hoists all imports to the top.
       * See https://github.com/rollup/rollup-plugin-commonjs/issues/355#issuecomment-525383876
       * Additionally spawn-sync is a redundant polyfill for child_process.spawnSync so is not necessary anyway.
       */
      ignore: ['try-thread-sleep', 'spawn-sync'],
    }),

    nodeResolve({
      mainFields: ['atlaskit:src', 'main'],
      preferBuiltins: true,
      extensions: ['.mjs', '.js', '.ts', '.json', '.node'],
    }),
  ],
  external: ['aws-sdk', ...builtins],
};
