jest.autoMockOff();

import transformer from '../index';

const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;

describe('Pass context to useWebRuntime', () => {
  defineInlineTest(
    { default: transformer, parser: 'tsx' },
    {},
    `  const [dispatch, { forgeDoc, error, loading }] = useWebRuntime({
    apolloClient,
    contextIds: [\`ari:cloud:confluence::site/\${cloudId}\`],
    extensionId: app.id,
    coreData: {
      localId,
      cloudId,
    },
    entryPoint,
  });`,
    `  const [dispatch, { forgeDoc, error, loading }] = useWebRuntime({
    apolloClient,
    contextIds: [\`ari:cloud:confluence::site/\${cloudId}\`],
    extensionId: app.id,

    coreData: {
      localId,
      cloudId,
    },

    entryPoint,
    temporaryContext: extensionData
  });`,
    'should transform useWebRuntime to accept extensionData in temporaryContext',
  );
});
