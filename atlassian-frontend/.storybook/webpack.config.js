/* eslint-disable no-param-reassign */
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { moduleResolveMapBuilder } = require('@atlaskit/multi-entry-tools');

module.exports = async ({ config }) => {
  const engagekitMockPath = path.resolve(__dirname, './mocks/engagekit.ts');
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          envName: 'website',
        },
      },
    ],
  });
  // Lets us resolve default exports for packages (i.e import Button from '@atlaskit/button';)
  config.resolve.mainFields = ['atlaskit:src', 'module', 'browser', 'main'];
  config.resolve.extensions.push('.ts', '.tsx');
  // Lets us resolve multi-entrypoint parts of packages (i.e import types from '@atlaskit/button/types')
  config.resolve.alias = {
    ...config.resolve.alias,
    // Context: https://atlassian.slack.com/archives/CL6HC337Z/p1613689821347900
    // Current workaround for an issue in project-pages in which when an external dependency (engagekit in this case)
    // has a dependency on a package that exists in atlassian-frontend without defining it as a direct dependency it
    // will not be able to resolve it to the actual internal package. Quick workaround for now is to mock the package
    // when running storybooks. We can't add the dependency to engagekit due to bundle size issues in
    // product.

    // Proper Solution: engagekit gets migrated onto atlassian-frontend. Scheduled for FY21Q4
    // https://atlassian.slack.com/archives/C015UA3KH1P/p1614209255045500?thread_ts=1614207452.042600&cid=C015UA3KH1P
    '@atlassiansox/engagekit/dist/esm/coordination/coordination-client': engagekitMockPath,
    '@atlassiansox/engagekit': engagekitMockPath,
    // addDefaultEntries is set to resolve devDependenvies that may not exist in the package
    ...(await moduleResolveMapBuilder({ addDefaultEntries: true })),

    // last-defined override works. In order to have analytics mocked it has to be defined after moduleResolveMapBuilder
    '@atlassiansox/analytics-web-client': require.resolve('../build/configs/webpack-config/assets/analytics-web-client-mock.js'),
  };
  return config;
};
