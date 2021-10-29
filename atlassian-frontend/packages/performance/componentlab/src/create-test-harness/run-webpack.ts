import _webpack from 'webpack';

export default function runWebpack(
  webpack: _webpack.Compiler,
): Promise<_webpack.Stats> {
  return new Promise((resolve, reject) => {
    webpack.run((err, stats) => {
      if (err != null) {
        reject(err);
        return;
      }

      const serialized = stats.toJson();

      if (stats.hasErrors()) {
        reject(new WebpackError(serialized.errors));
        return;
      }
      resolve(stats);
    });
  });
}

class WebpackError extends Error {
  webpackErrors: string[];

  constructor(webpackErrors: string[]) {
    super('Webpack encountered errors: ' + webpackErrors.join('\n'));
    this.webpackErrors = webpackErrors;
  }
}
