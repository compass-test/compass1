import rule from './index';

const atlaskitPackage = {
  name: '@atlaskit/package-a',
  dir: 'packages/package-a',
  publishConfig: {
    registry: 'https://registry.npmjs.org/',
  },
  atlassian: {
    website: {
      name: 'package',
    },
    releaseModel: 'scheduled',
  },
  'af:exports': {},
  devDependencies: {
    '@atlassian/atlassian-frontend-prettier-config-1.0.0':
      'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
  },
  prettier: '@atlassian/atlassian-frontend-prettier-config-1.0.0',
};

const atlassianPackage = {
  name: '@atlassian/package-b',
  dir: 'packages/package-b',
  publishConfig: {
    registry: 'https://packages.atlassian.com/api/npm/npm-remote',
  },
  atlassian: {
    releaseModel: 'continuous',
  },
  'af:exports': {},
  devDependencies: {
    '@atlassian/atlassian-frontend-prettier-config-1.0.0':
      'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
  },
  prettier: '@atlassian/atlassian-frontend-prettier-config-1.0.0',
};

const atlassianSoxPackage = {
  name: '@atlassiansox/package-c',
  dir: 'packages/package-c',
  publishConfig: {
    registry: 'https://packages.atlassian.com/api/npm/npm-remote',
  },
  atlassian: {
    releaseModel: 'continuous',
  },
  'af:exports': {},
  devDependencies: {
    '@atlassian/atlassian-frontend-prettier-config-1.0.0':
      'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
  },
  prettier: '@atlassian/atlassian-frontend-prettier-config-1.0.0',
};

const afPackage = {
  name: '@af/package-d',
  dir: 'packages/package-d',
  atlassian: {
    releaseModel: 'continuous',
  },
  'af:exports': {},
  devDependencies: {
    '@atlassian/atlassian-frontend-prettier-config-1.0.0':
      'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
  },
  prettier: '@atlassian/atlassian-frontend-prettier-config-1.0.0',
};

const servicePackage = {
  name: '@af/service',
  private: true,
  devDependencies: {
    '@atlassian/atlassian-frontend-prettier-config-1.0.0':
      'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
  },
  prettier: '@atlassian/atlassian-frontend-prettier-config-1.0.0',
  dir: 'services/service',
  'af:services': {
    serviceName: 'service',
    master: {
      continuous: {
        env: 'ddev',
      },
    },
  },
};

const runRule = (...configs: any[]) =>
  rule.onProject({
    rootPath: '.',
    config: {
      workspaces: configs.map(config => ({
        name: config.name,
        dir: config.dir,
        config,
      })),
      teams: {},
      disableCache: true,
    },
    files: {},
    dependencies: {},
  });

const expectError = (errors: any[], expected: string) => {
  expect(errors).toHaveLength(1);
  expect(errors).toEqual(
    expect.arrayContaining([expect.stringContaining(expected)]),
  );
};

describe('Validate Package jsons Stricter Check', () => {
  describe('Public @atlaskit packages', () => {
    test('No errors for valid package', () => {
      expect(runRule(atlaskitPackage)).toHaveLength(0);
    });

    test('Error for incorrect (not public npm) registry', () => {
      const errors = runRule({
        ...atlaskitPackage,
        publishConfig: {
          registry: 'https://packages.atlassian.com/api/npm/npm-remote',
        },
      });
      expectError(
        errors,
        'Public packages need to be published to the npm registry (https://registry.npmjs.org/)',
      );
    });

    test('Error for no releaseModel field', () => {
      const { atlassian, ...noAtlassianConfig } = atlaskitPackage;
      const errors = runRule(noAtlassianConfig);
      expectError(errors, 'Missing or invalid atlassian.releaseModel field');
    });

    test('Detects when a public package depends on an internal package', () => {
      const errors = runRule({
        ...atlaskitPackage,
        dependencies: {
          '@atlassian/internal-package': '^1.3.2',
          '@atlaskit/valid-package': '0.0.1',
        },
      });
      expectError(
        errors,
        'This public package can not depend on private packages',
      );
    });

    test('Internal devDependencies are allowed', () => {
      const errors = runRule({
        ...atlaskitPackage,
        dependencies: {
          '@atlaskit/valid-package': '0.0.1',
        },
        devDependencies: {
          '@atlassian/atlassian-frontend-prettier-config-1.0.0':
            'npm:@atlassian/atlassian-frontend-prettier-config@1.0.0',
          '@atlassian/internal-package': '^1.3.2',
        },
      });
      expect(errors).toHaveLength(0);
    });

    test('Detects when a public package depends on a private atlaskit package', () => {
      const errors = runRule(
        {
          ...atlaskitPackage,
          dependencies: {
            '@atlaskit/valid-package': '0.0.1',
            '@af/service': '0.1.0',
          },
        },
        servicePackage,
      );
      expectError(
        errors,
        'This public package can not depend on private packages',
      );
    });

    test('Error if a private package has a publishConfig', () => {
      const errors = runRule({
        ...atlaskitPackage,
        private: true,
      });
      expectError(
        errors,
        'Private packages do not need to have publishConfig defined',
      );
    });
  });

  describe('Internal @atlassian packages', () => {
    test('No errors for valid package', () => {
      expect(runRule(atlassianPackage)).toHaveLength(0);
    });

    test('Error for incorrect (not internal) registry', () => {
      const errors = runRule({
        ...atlassianPackage,
        publishConfig: {
          registry: 'https://registry.npmjs.org/',
        },
      });
      expectError(
        errors,
        'Internal packages need to be published to the atlassian registry (https://packages.atlassian.com/api/npm/npm-remote)',
      );
    });

    test('Error when a license is defined', () => {
      const errors = runRule({
        ...atlassianPackage,
        license: 'Apache-2.0',
      });
      expectError(
        errors,
        'A License does not need to be defined for internal packages',
      );
    });

    test('Error if a private package has a publishConfig', () => {
      const errors = runRule({
        ...atlassianPackage,
        private: true,
      });
      expectError(
        errors,
        'Private packages do not need to have publishConfig defined',
      );
    });
  });

  describe('Internal @atlassiansox packages', () => {
    test('No errors for valid package', () => {
      expect(runRule(atlassianSoxPackage)).toHaveLength(0);
    });

    test('Error for incorrect (not internal) registry', () => {
      const errors = runRule({
        ...atlassianSoxPackage,
        publishConfig: {
          registry: 'https://registry.npmjs.org/',
        },
      });
      expectError(
        errors,
        'Internal packages need to be published to the atlassian registry (https://packages.atlassian.com/api/npm/npm-remote)',
      );
    });

    test('Error when a license is defined', () => {
      const errors = runRule({
        ...atlassianSoxPackage,
        license: 'ISC',
      });
      expectError(
        errors,
        'A License does not need to be defined for internal packages',
      );
    });

    test('Error if a private package has a publishConfig', () => {
      const errors = runRule({
        ...atlassianSoxPackage,
        private: true,
      });
      expectError(
        errors,
        'Private packages do not need to have publishConfig defined',
      );
    });
  });

  describe('Service packages', () => {
    test("Error if af:services is defined but serviceName isn't", () => {
      const errors = runRule({
        ...servicePackage,
        'af:services': { serviceName: undefined },
      });
      expectError(errors, 'af:services.serviceName must be defined');
    });

    test("Error if the package isn't allowed to use custom pipeline", () => {
      const errors = runRule({
        ...servicePackage,
        'af:services': {
          ...servicePackage['af:services'],
          master: {
            continuous: {
              customPipeline: 'pipeline',
            },
          },
        },
      });
      expectError(
        errors,
        "Custom deployment pipelines aren't allowed without explicit AFP approval",
      );
    });

    test('Error if invalid environment is defined', () => {
      const pkg = { ...servicePackage };
      pkg['af:services'].master.continuous.env = 'fake-env';
      const errors = runRule(pkg);
      expectError(
        errors,
        'af:services includes env declarations that are not valid',
      );
    });
  });

  describe('Restricted/ private @af packages', () => {
    test('No errors for valid package', () => {
      expect(
        runRule({
          ...afPackage,
          private: true,
        }),
      ).toHaveLength(0);
    });

    test('Error when a license is defined', () => {
      const errors = runRule({
        ...afPackage,
        private: true,
        license: 'ISC',
      });
      expectError(
        errors,
        'A License does not need to be defined for internal packages',
      );
    });

    test('Error if a private package does not set `private:true`', () => {
      const errors = runRule({
        ...afPackage,
      });
      expectError(
        errors,
        'Private packages should have `private: true` declared',
      );
    });
  });

  describe('Enforce prettier config', () => {
    test('Error when prettier config is not defined', () => {
      const errors = runRule({
        ...atlaskitPackage,
        prettier: undefined,
      });
      expectError(
        errors,
        'Must declare a prettier config to use the aliased atlassian-frontend config, "prettier": "@atlassian/atlassian-frontend-prettier-config-x.x.x"',
      );
    });

    test("Error if prettier devDependency npm alias isn't present`", () => {
      const errors = runRule({
        ...atlaskitPackage,
        devDependencies: {},
      });
      expectError(
        errors,
        'Must have a alias dependency for prettier-config as "@atlassian/atlassian-frontend-prettier-config-x.x.x": "@atlassian/atlassian-frontend-prettier-config-x.x.x"',
      );
    });
  });
});
