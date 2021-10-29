const merge = require('webpack-merge');
const CspWebPackPlugin = require('csp-webpack-plugin');

const constants = require('./build-config/constants');
const common = require('./webpack.common.js');

module.exports = async () =>
  merge(await common(), {
    mode: 'development',

    output: {
      filename: '[name].bundle.js',
    },
    plugins: [
      new CspWebPackPlugin({
        'base-uri': "'self'",
        'object-src': "'none'",
        'script-src': [
          "'self'",
          'http://localhost:3000',
          'https://widget.intercom.io/widget/r9osvpuz',
          'https://js.intercomcdn.com',
        ],
      }),
    ],
    resolve: {
      alias: {
        // @hot-loader/react-dom replaces the "react-dom" package of the same
        // version, but with additional patches to support hot reloading.
        'react-dom': '@hot-loader/react-dom',
      },
    },

    devServer: {
      contentBase: './dist',
      historyApiFallback: {
        index: constants.PUBLIC_PATH,
      },
      port: 3000,
      publicPath: constants.PUBLIC_PATH,
      proxy: {
        '/jsw/devops/public/graphql': configProxy(),
        '/jsw/graphql': configProxy(),
        '/_edge/tenant_info': configProxy(),
        '/gateway/api/graphql': graphqlProxy(),
        '/gateway/api': configProxy(),
        '/rest': configProxy(),
      },
      // disabled to allow forwarding of the front end through a tunnel, and to allow accessing local frontend in pollinator docker container
      disableHostCheck: true,
    },
    // Ideally we would use one of the `eval-*` methods here (which are fastest
    // in development), but unfortunately these don't currently work with the
    // Dragonfruit FE extension because the CSP disallows unsafe `eval` methods
    devtool: 'cheap-source-map',
  });

function configProxy({
  host = process.env.COMPASS_SITE_HOST
    ? process.env.COMPASS_SITE_HOST
    : 'compassdog.jira-dev.com',
  protocol = 'https:',
  port = 443,
  secure = false,
  changeOrigin = true,
  headers = undefined,
  pathRewrite = undefined,
  auth = undefined,
} = {}) {
  return {
    target: {
      host,
      protocol,
      port,
    },
    secure,
    changeOrigin,
    headers,
    logLevel: 'debug',
    pathRewrite,
    onProxyReq: changeOrigin
      ? (request) => {
          // change the origin to localhost so that stargate does not reject our request due to CORS
          // e.g. if accessing the frontend through a http forward such as ngrok, the origin will appear as https://55ceecbc15ab.ngrok.io,
          // which is not allowed by stargate
          request.setHeader('origin', 'http://localhost:3000');
        }
      : undefined,
    auth,
  };
}

function graphqlProxy() {
  if (process.env.GRAPHQL_PROXY_URL) {
    // example https://api-private.stg.atlassian.com/graphql/branch-issue-ciwy22q1-3-compass-announcements-innovation/graphql?serviceOverride=compass=http://118db4a45b13.ngrok.io/graphql
    const url = new URL(process.env.GRAPHQL_PROXY_URL);

    // example dchan4@atlassian.com:oy3FDHabkXOl7ACk0d3wA532
    // if not provided, will be undefined
    const auth = process.env.GRAPHQL_PROXY_AUTH;

    return configProxy({
      host: url.host,
      protocol: url.protocol,
      pathRewrite: {
        '^/gateway/api/graphql': url.pathname + url.search,
      },
      auth,
    });
  }

  return configProxy();
}
