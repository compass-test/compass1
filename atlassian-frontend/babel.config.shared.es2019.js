/* Override the preset-env plugin es2019 targets to also include pre-chromium edge (18) and current version
 * of node so that features like TS optional chaining are still compiled down for node bundlers such
 * as webpack.
 */
module.exports = {
  extends: './babel.config.shared.js',
  presets: [
    [
      '@babel/env',
      {
        bugfixes: true,
        modules: false,
        targets: [
          'last 1 chrome versions',
          'last 1 firefox versions',
          'last 1 safari versions',
          'last 1 and_chr versions',
          'last 1 ios_saf versions',
          // support last non-chrome-based version of edge
          'edge >= 18',
        ],
      },
    ],
  ],
};
