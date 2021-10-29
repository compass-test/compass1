const eslintAdapter = require('./eslint-adapter');
const { getTechstackConfig } = require('./utils');

const createCheck = ({
  pluginId,
  configuration,
  filesGlob,
  packageId,
  noPlugin = false,
}) => ({
  checks: [
    {
      plugin: !noPlugin ? `plugin-${pluginId}` : undefined,
      rule: `rule-${pluginId}`,
      configuration,
      filesGlob,
    },
  ],
  packageRootPath: {
    relative: `packages/package-${packageId}`,
    absolute: `/Foo/project/packages/package-${packageId}`,
  },
});

const mockChecks = [
  createCheck({
    pluginId: 'a',
    configuration: ['error', { foo: 'bar' }],
    filesGlob: '**/*.js',
    packageId: 'a',
  }),
  createCheck({ pluginId: 'b', configuration: 'error', packageId: 'b' }),
  createCheck({ pluginId: 'c', packageId: 'c' }),
  createCheck({ pluginId: 'd', packageId: 'd', noPlugin: true }),
];

jest.mock('./utils', () => ({
  getChecksForPackages: () => mockChecks,
  getTechstackConfig: jest.fn().mockImplementation(() => ({
    config: {
      pathToPackages: 'packages',
      rootPath: '.',
      eslintConfigPath: '.',
    },
  })),
  getRelativePath: (from, to) => to,
  createPathResolver: () => from => from,
}));

describe('Eslint adapter', () => {
  test('returns the correct eslint config', () => {
    expect(
      eslintAdapter({
        plugins: ['plugin-e'],
        overrides: [
          {
            files: ['**/*.js'],
            rules: {
              'rule-e': 'error',
            },
          },
        ],
      }),
    ).toMatchSnapshot();
  });

  test('handles custom working directory', () => {
    eslintAdapter(
      {
        plugins: ['plugin-e'],
      },
      {
        workingDirectory: '/home',
      },
    );

    expect(getTechstackConfig).toBeCalledWith(
      expect.objectContaining({
        rootPath: '/home',
      }),
    );
  });
});
