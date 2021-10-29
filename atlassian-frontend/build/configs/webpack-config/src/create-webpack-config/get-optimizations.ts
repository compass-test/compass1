import os from 'os';
import webpack from 'webpack';
import TerserJsPlugin from 'terser-webpack-plugin';

export interface GetOptimizationsOptions {
  isProduction: boolean;
  noMinimize?: boolean;
}

export function getOptimizations(
  opts: GetOptimizationsOptions,
): webpack.Options.Optimization | undefined {
  if (!opts.isProduction) {
    return;
  }

  const terserPlugin = new TerserJsPlugin({
    parallel: Math.max(os.cpus().length - 1, 1),
    terserOptions: {
      compress: {
        // Disabling following options speeds up minimization by 20 - 30s
        // without any significant impact on a bundle size.
        arrows: false,
        booleans: false,
        collapse_vars: false,

        // https://product-fabric.atlassian.net/browse/MSW-436
        comparisons: false,
        // We disables a lot of these rules because they don't effect the size very much, but cost a lot
        // of time
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        if_return: false,
        inline: false,
        join_vars: false,
        keep_infinity: true,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_vars: false,
        sequences: false,
        side_effects: false,
        switches: false,
        top_retain: [],
        toplevel: false,
        typeofs: false,
        unused: false,

        // Switch off all types of compression except those needed to convince
        // react-devtools that we're using a production build
        conditionals: true,
        dead_code: true,
        evaluate: true,
      },
      mangle: true,
    },
  });

  return {
    // There's an interesting bug in webpack where passing *any* uglify plugin, where `minimize` is
    // false, causes webpack to use its own minimizer plugin + settings.
    minimizer: opts.noMinimize ? undefined : [terserPlugin],
    minimize: !opts.noMinimize,
    splitChunks: {
      // "Maximum number of parallel requests when on-demand loading. (default in production: 5)"
      // The default value of 5 causes the webpack process to crash, reason currently unknown
      maxAsyncRequests: Infinity,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          enforce: true,
          chunks: 'all',
          test: (module: { context: string | null }) => {
            if (!module.context) {
              return false;
            }
            return /node_modules\/(react|react-dom|styled-components|prop-types|@emotion|@babel\/runtime)($|\/)/.test(
              module.context,
            );
          },
          priority: 1,
        },
      },
    },
  };
}
