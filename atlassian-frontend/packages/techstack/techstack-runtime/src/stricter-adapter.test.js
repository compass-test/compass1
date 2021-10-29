const isFunction = require('lodash/isFunction');
const mapValues = require('lodash/mapValues');

const stricterAdapter = require('./stricter-adapter');

const createConfiguration = ({ pluginId, configId }) => ({
  level: 'error',
  config: { foo: `bar-${pluginId}-${configId}` },
});

const createCheck = ({ pluginId, configId, noPlugin = false }) => ({
  checks: [
    {
      plugin: !noPlugin ? `plugin-${pluginId}` : undefined,
      rule: `rule-${pluginId}`,
      configuration: createConfiguration({ pluginId, configId }),
    },
  ],
  packageRootPath: {
    relative: `foo`,
    absolute: `/Foo/project/packages/foo`,
  },
});

const mockChecks = [
  createCheck({ pluginId: 'a', configId: 'a' }),
  createCheck({ pluginId: 'a', configId: 'b' }),
  createCheck({ pluginId: 'b', configId: 'a' }),
  createCheck({ pluginId: 'c', configId: 'a' }),
  createCheck({ pluginId: 'c', configId: 'b' }),
  createCheck({ pluginId: 'd', configId: 'a', noPlugin: true }),
];

jest.mock('./utils', () => ({
  getChecksForPackages: () => mockChecks,
  getTechstackConfig: () => ({
    config: {
      pathToPackages: 'packages',
      rootPath: '.',
    },
  }),
}));

describe('Stricter adapter', () => {
  test('returns the correct stricter config', () => {
    expect(
      stricterAdapter({
        plugins: ['plugin-e'],
        rules: {
          'rule-e': createConfiguration({ pluginId: 'e', configId: 'a' }),
        },
      }),
    ).toMatchSnapshot();
  });

  test('returns the correct stricter config when existing rules clash with the techstack rules', () => {
    const result = stricterAdapter({
      plugins: ['plugin-a', 'plugin-b', 'plugin-c'],
      rules: {
        'rule-a': createConfiguration({ pluginId: 'a', configId: 'c' }),
        'rule-b': [
          createConfiguration({ pluginId: 'b', configId: 'b' }),
          createConfiguration({ pluginId: 'b', configId: 'c' }),
        ],
        'rule-c': () => createConfiguration({ pluginId: 'c', configId: 'c' }),
        'rule-d': () => [
          createConfiguration({ pluginId: 'd', configId: 'b' }),
          createConfiguration({ pluginId: 'd', configId: 'c' }),
        ],
      },
    });

    expect(result).toMatchSnapshot();

    const resolvedRules = mapValues(result.rules, val =>
      isFunction(val) ? val({ packages: [] }) : val,
    );

    expect(resolvedRules).toMatchSnapshot();
  });
});
