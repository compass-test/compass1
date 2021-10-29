jest.autoMockOff();

import transformer from '../index';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Update getForgeExtensionProvider and getForgeExtensionProviderNext', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
const forgeExtensionProvider = featureFlags[
  "confluence.frontend.forge.macro.renderer.next"
]
? getForgeExtensionProviderNext({
  accountId: accountId ?? undefined,
  cloudId,
  apolloClient,
  contextIds,
  dataProviders: providerFactory,
  environment: environmentToForgeProductEnvironment(environment),
  product: "confluence",
  page: "confluence:macroEditor",
  isEditing: true,
  analyticsWebClient: getAnalyticsWebClient(),
  forgeUIAnalyticsContext: createForgeUIAnalyticsContext({
    objectId: contentId,
    objectType: contentType,
    containerId,
    containerType: "space",
  }),
  extensionData: {},
  shouldRenderHostedResources:
    featureFlags["confluence.frontend.forge.hosted-resources"],
})
: getForgeExtensionProvider(
  apolloClient,
  contextIds,
  providerFactory,
  environmentToForgeProductEnvironment(environment),
  "confluence",
  "confluence:macroEditor",
  createXenContext(accountId, cloudId, contentId, spaceKey),
  true,
  getAnalyticsWebClient(),
  createForgeUIAnalyticsContext({
    objectId: contentId,
    objectType: contentType,
    containerId,
    containerType: "space",
  }),
  featureFlags["confluence.frontend.forge.hosted-resources"]
);
`,
    `
const forgeExtensionProvider = featureFlags[
  "confluence.frontend.forge.macro.renderer.next"
]
? getForgeExtensionProviderNext({
  accountId: accountId ?? undefined,
  cloudId,
  apolloClient,
  contextIds,
  dataProviders: providerFactory,
  environment: environmentToForgeProductEnvironment(environment),
  product: "confluence",
  page: "confluence:macroEditor",
  isEditing: true,
  analyticsWebClient: getAnalyticsWebClient(),

  forgeUIAnalyticsContext: createForgeUIAnalyticsContext({
    objectId: contentId,
    objectType: contentType,
    containerId,
    containerType: "space",
  }),

  extensionData: {},
  temporaryContext: createXenContext(accountId, cloudId, contentId, spaceKey),

  shouldRenderHostedResources:
    featureFlags["confluence.frontend.forge.hosted-resources"]
})
: getForgeExtensionProvider(
  apolloClient,
  contextIds,
  cloudId,
  providerFactory,
  environmentToForgeProductEnvironment(environment),
  "confluence",
  "confluence:macroEditor",
  {},
  createXenContext(accountId, cloudId, contentId, spaceKey),
  accountId ?? undefined,
  true,
  getAnalyticsWebClient(),
  createForgeUIAnalyticsContext({
    objectId: contentId,
    objectType: contentType,
    containerId,
    containerType: "space",
  }),
  featureFlags["confluence.frontend.forge.hosted-resources"]
);
    `,
    'should update getForgeExtensionProvider and getForgeExtensionProviderNext in EditorComponent',
  );

  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `
  const forgeExtensionProvider =
    featureFlags &&
    featureFlags["confluence.frontend.forge.macro.renderer.next"]
      ? getForgeExtensionProviderNext({
          accountId: accountId ?? undefined,
          cloudId,
          apolloClient,
          contextIds,
          dataProviders: providerFactory,
          environment: environmentToForgeProductEnvironment(environment),
          product: "confluence",
          page: "confluence:macroRenderer",
          isEditing: false,
          analyticsWebClient: getAnalyticsWebClient(),
          forgeUIAnalyticsContext: createForgeUIAnalyticsContext({
            objectId: contentId,
            objectType: contentType,
            containerId,
            containerType: "space",
          }),
          extensionData: {},
          shouldRenderHostedResources:
            featureFlags &&
            featureFlags["confluence.frontend.forge.hosted-resources"],
        })
      : getForgeExtensionProvider(
          apolloClient,
          contextIds,
          providerFactory,
          environmentToForgeProductEnvironment(environment),
          "confluence",
          "confluence:macroRenderer",
          createXenContext(accountId, cloudId, contentId, spaceKey),
          false,
          getAnalyticsWebClient(),
          createForgeUIAnalyticsContext({
            contentId,
            objectType: contentType,
            containerId,
            containerType: "space",
          }),
          featureFlags &&
            featureFlags["confluence.frontend.forge.hosted-resources"]
        );
`,
    `
const forgeExtensionProvider =
    featureFlags &&
    featureFlags["confluence.frontend.forge.macro.renderer.next"]
      ? getForgeExtensionProviderNext({
      accountId: accountId ?? undefined,
      cloudId,
      apolloClient,
      contextIds,
      dataProviders: providerFactory,
      environment: environmentToForgeProductEnvironment(environment),
      product: "confluence",
      page: "confluence:macroRenderer",
      isEditing: false,
      analyticsWebClient: getAnalyticsWebClient(),

      forgeUIAnalyticsContext: createForgeUIAnalyticsContext({
        objectId: contentId,
        objectType: contentType,
        containerId,
        containerType: "space",
      }),

      extensionData: {},
      temporaryContext: createXenContext(accountId, cloudId, contentId, spaceKey),

      shouldRenderHostedResources:
        featureFlags &&
        featureFlags["confluence.frontend.forge.hosted-resources"]
    })
      : getForgeExtensionProvider(
      apolloClient,
      contextIds,
      cloudId,
      providerFactory,
      environmentToForgeProductEnvironment(environment),
      "confluence",
      "confluence:macroRenderer",
      {},
      createXenContext(accountId, cloudId, contentId, spaceKey),
      accountId ?? undefined,
      false,
      getAnalyticsWebClient(),
      createForgeUIAnalyticsContext({
        contentId,
        objectType: contentType,
        containerId,
        containerType: "space",
      }),
      featureFlags &&
        featureFlags["confluence.frontend.forge.hosted-resources"]
    );
    `,
    'should update getForgeExtensionProvider and getForgeExtensionProviderNext in RendererComponent',
  );
});
