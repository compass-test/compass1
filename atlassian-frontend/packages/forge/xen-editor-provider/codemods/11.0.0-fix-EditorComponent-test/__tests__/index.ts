jest.autoMockOff();

import transformer from '../index';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Update getForgeExtensionProvider and getForgeExtensionProviderNext', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `expect(getForgeExtensionProvider).to.have.been.calledWith(
  xenClient,
  [\`ari:cloud:confluence::site/\${testCloudId}\`],
  providerFactory,
  ProductEnvironment.DEVELOPMENT,
  "confluence",
  "confluence:macroEditor",
  xenContext,
  true,
  analyticsWebClient,
  forgeUIAnalyticsContext,
  true
);`,
    `expect(getForgeExtensionProvider).to.have.been.calledWith(
  xenClient,
  [\`ari:cloud:confluence::site/\${testCloudId}\`],
  testCloudId,
  providerFactory,
  ProductEnvironment.DEVELOPMENT,
  "confluence",
  "confluence:macroEditor",
  {},
  xenContext,
  defaultProps.accountId,
  true,
  analyticsWebClient,
  forgeUIAnalyticsContext,
  true
);`,
    'should update getForgeExtensionProvider and getForgeExtensionProviderNext in EditorComponent',
  );
});
