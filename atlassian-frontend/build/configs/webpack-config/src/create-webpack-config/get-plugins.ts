import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
// @ts-ignore
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { statsOptions } from './stats-options';

export interface GetPluginsOptions {
  commitHash: string | null;
  isAnalyticsEnabled: boolean;
  isPrivateWebsiteBuild: boolean;
  isProduction: boolean;
  isSynchronyEnabled: boolean;
  openAnalyzer?: boolean;
  publicPath: string;
  report?: boolean;
  websiteDir: string;
}

export function getPlugins(opts: GetPluginsOptions): webpack.Plugin[] {
  const iconSuffix = opts.isProduction ? '' : '-dev';
  const favicon = path.join(opts.websiteDir, `public/favicon${iconSuffix}.ico`);

  const title = opts.isProduction
    ? 'Atlaskit by Atlassian'
    : 'atlassian-frontend development';

  const plugins: webpack.Plugin[] = [
    new HtmlWebpackPlugin({
      template: path.join(opts.websiteDir, 'public/index.html.ejs'),
      title: title,
      favicon: favicon,
      excludeChunks: ['examples'],
    }),

    new HtmlWebpackPlugin({
      filename: 'examples.html',
      title: title,
      template: path.join(opts.websiteDir, 'public/examples.html.ejs'),
      favicon,
      excludeChunks: ['main'],
    }),

    new webpack.EnvironmentPlugin({
      IS_ATLASKIT: JSON.stringify(true),
      ENABLE_TOKENS: JSON.stringify(process.env.ENABLE_TOKENS),
    }),

    new webpack.DefinePlugin({
      SYNCHRONY_URL: `${JSON.stringify(
        opts.isSynchronyEnabled ? String(process.env.SYNCHRONY_URL) : '',
      )}`,
      ENABLE_ANALYTICS_GASV3: `${String(opts.isAnalyticsEnabled)}`,
      BASE_TITLE: JSON.stringify(title),
      DEFAULT_META_DESCRIPTION: `"Atlaskit is the official component library for Atlassian's Design System."`,
      COMMIT_HASH: JSON.stringify(opts.commitHash),
      IS_PRIVATE_WEBSITE: JSON.stringify(opts.isPrivateWebsiteBuild),
      PUBLIC_PATH: JSON.stringify(opts.publicPath),
    }),
  ];

  if (opts.report) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../public/report.html',
        statsFilename: '../public/stats.json',
        generateStatsFile: true,
        openAnalyzer: opts.openAnalyzer,
        logLevel: 'error',
        statsOptions: { ...statsOptions, assets: true, modules: true },
        defaultSizes: 'gzip',
      }),
    );
  }

  if (!opts.isSynchronyEnabled) {
    plugins.push(new webpack.IgnorePlugin(/prosemirror-synchrony-plugin/));
  }

  return plugins;
}
