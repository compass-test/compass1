const path = require('path');

const {
  commonUIComponent,
  serviceComponent,
  sharedFiles,
  sharedUIFiles,
  sweetStateAdditionalFiles,
  uiComponent,
  i18nComponent,
  scriptFile,
} = require('./constants');

const tangerineNext = {
  id: 'tangerine-next',
  caption: 'Tangerine Next',
  description: 'Now with *even more* flavour! 🍊',
  status: 'recommended',
  checks: ({ pathToPackages, packageRootPath }) => [
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/no-restricted-paths',
      configuration: [
        'error',
        {
          basePath: path.join(pathToPackages, packageRootPath.relative, 'src'),
          srcRoot: 'src',
          restrictions: [
            {
              target: 'services',
              from: ['controllers', 'ui'],
            },
            {
              target: 'controllers',
              from: ['ui'],
            },
            {
              target: 'common',
              from: ['services', 'controllers', 'ui'],
            },
          ],
          message: `If you see this error that means that some of your files import from places they are not supposed to.
                        For more details see http://go.atlassian.com/tangerine-next-structure. Ask for advise in #tangerine channel if the docs don't help`,
        },
      ],
    },
    {
      type: 'eslint',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/import/no-parent-imports',
      configuration: [
        'error',
        {
          basePath: path.join(pathToPackages, packageRootPath.relative, 'src'),
          srcRoot: 'src',
          dirs: ['ui'],
          message: `If you see this error that means that some of your files import from places they are not supposed to.
                      For more details see http://go.atlassian.com/tangerine-ui-structure. Ask for advise in #tangerine channel if the docs don't help`,
        },
      ],
    },
    {
      type: 'stricter',
      plugin: '@atlassian/tangerine',
      rule: '@atlassian/tangerine/project-structure',
      configuration: {
        level: 'error',
        config: {
          rootPath: packageRootPath.absolute,
          errorTemplate: `#messages#\nIf you see this error that means that some of your files of folders either named incorrectly or in the wrong place.
                      For more details see http://go.atlassian.com/tangerine-app-structure or http://go.atlassian.com/tangerine-package-structure. Ask for advise in #tangerine channel if the docs don't help`,
          definitions: {
            '.': 'package',
            package: {
              src: { type: 'src' },
              '*': [{ type: 'file' }, { type: 'dir' }],
            },
            src: {
              common: { type: 'common', optional: true },
              controllers: { type: 'controllers', optional: true },
              i18n: { type: 'i18n', optional: true },
              services: { type: 'services', optional: true },
              ui: { type: 'ui', optional: true },
              'index.js.flow': { type: 'file', optional: true },
              'version.json': { type: 'file', optional: true },
              // inside src we can have just one tiny component at the root
              ...sharedFiles,
              ...sharedUIFiles,
              ...sweetStateAdditionalFiles,
              ...scriptFile('async'),
              ...scriptFile('context'),
              ...scriptFile('feature-flags'),
              ...scriptFile('index'),
              ...scriptFile('main'),
            },
            i18n: {
              ...i18nComponent,
            },
            ui: {
              ...uiComponent,
              '*': 'uiComponent',
            },
            services: {
              ...serviceComponent,
              '*': 'serviceComponent',
            },
            controllers: {
              ...serviceComponent,
              '*': 'serviceComponent',
            },
            common: {
              assets: { type: 'dir', optional: true },
              constants: { type: 'dir', optional: true },
              graphql: { type: 'dir', optional: true },
              'mock-data': { type: 'dir', optional: true },
              mocks: { type: 'dir', optional: true },
              'test-utils': { type: 'dir', optional: true },
              types: { type: 'dir', optional: true },
              utils: { type: 'dir', optional: true },
              ui: { type: 'commonComponent', optional: true },
              ...scriptFile('constants'),
              ...scriptFile('messages'),
              ...scriptFile('mocks'),
              ...scriptFile('test-utils'),
              ...scriptFile('test-utils.test'),
              ...scriptFile('types'),
              ...scriptFile('utils'),
              ...scriptFile('utils.test'),
            },
            uiComponent: {
              ...uiComponent,
              '*': 'uiComponent',
            },
            serviceComponent: {
              ...serviceComponent,
              '*': 'serviceComponent',
            },
            commonComponent: {
              ...commonUIComponent,
              '*': 'commonComponent',
            },
            snapshots: {
              '*': { type: 'file' },
            },
          },
        },
      },
    },
    {
      type: 'eslint',
      plugin: 'import',
      rule: 'import/no-extraneous-dependencies',
      resolverPlugin: '@atlassian/tangerine',
      configuration: [
        'error',
        {
          devDependencies: [
            'src/**/examples.{js,ts,tsx}',
            'src/**/?(*.)test.{js,ts,tsx}',
          ].map(
            pattern =>
              `${path.join(
                pathToPackages,
                packageRootPath.relative,
              )}/${pattern}`,
          ),
        },
      ],
    },
  ],
};

module.exports = tangerineNext;
