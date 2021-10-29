jest.autoMockOff();

import transformer from '../index';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Fix useWebRuntime tests', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `  expect(mockUseWebRuntime).toHaveBeenCalledWith({
    apolloClient: mockApolloClient,
    contextIds: ["ari:cloud:confluence::site/cloud1"],
    extensionId:
      "ari:cloud:ecosystem::extension/1c555a1b-e566-4ac4-b3ce-962a0cf89491/67d15083-fcc3-4a7a-acb8-68e97cc3e2e7/static/byline-ref-app",
    coreData: {
      localId: "local-id",
      cloudId: "cloud1",
    },
  });`,
    `  expect(mockUseWebRuntime).toHaveBeenCalledWith({
    apolloClient: mockApolloClient,
    contextIds: ["ari:cloud:confluence::site/cloud1"],

    extensionId:
      "ari:cloud:ecosystem::extension/1c555a1b-e566-4ac4-b3ce-962a0cf89491/67d15083-fcc3-4a7a-acb8-68e97cc3e2e7/static/byline-ref-app",

    coreData: {
      localId: "local-id",
      cloudId: "cloud1",
    },

    temporaryContext: {}
  });`,
    'should update useWebRuntime test',
  );
});
