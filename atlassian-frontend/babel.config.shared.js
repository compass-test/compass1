const fs = require('fs');

/**
 * Extendable babel config
 *
 * Extracted out into a separate file to exclude non-extendable options such as `babelrcRoots`.
 */

/** IMPORTANT
 *  The typescript preset must be executed _before_ babel/env so that TS Class parameter property assignments are compiled correctly.
 *  We do this by placing the typescript preset after babel/env for each environment (presets are executed in reverse order). We cannot use the top-level presets field as they are executed _after_
 *  each env.
 *  https://github.com/babel/babel/issues/9105
 */

/* Typescript must also be executed before plugin-proposal-class-properties to fix another issue surrounding class property initialisation and inheritance.
 * https://github.com/babel/babel/issues/12066
 * We achieve this by creating our own preset which includes the plugin. This allows us to execute the plugins in the correct order as there is no other way to execute plugins _after_ presets.
 */
const classPropertiesPreset = {
  plugins: ['@babel/plugin-proposal-class-properties'],
};

const es5Browsers = [
  'last 1 chrome versions',
  // support last non-chrome-based version of edge
  'edge >= 18',
  'last 1 firefox versions',
  'last 1 safari versions',
  'last 1 and_chr versions',
  'last 1 ios_saf versions',
  // Temporarily putting this back to fix the Confluence es5-check and satisfy Jira's "limited" IE11 support
  'ie 11',
];

const { ANALYTICS_DEVELOPMENT_VERSION } = process.env;

const { name: packageName, version } = JSON.parse(
  fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8'),
);
let packageVersion = version;

if (ANALYTICS_DEVELOPMENT_VERSION === 'true') {
  packageVersion = '0.0.0-development';
}

module.exports = {
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/transform-runtime',
    '@compiled/babel-plugin',
    [
      'transform-define',
      {
        'process.env._PACKAGE_NAME_': packageName,
        'process.env._PACKAGE_VERSION_': packageVersion,
      },
    ],
  ],
  presets: ['@babel/react'],
  ignore: ['**/*.d.ts'],
  env: {
    'production:cjs': {
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        'transform-dynamic-import',
      ],
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
            targets: es5Browsers,
          },
        ],
        classPropertiesPreset,
        '@babel/preset-typescript',
      ],
      ignore: [
        'node_modules',
        '**/__mocks__',
        '**/__tests__',
        '**/__tests_external__',
        '**/__fixtures__',
        '**/*.test.*',
        '**/test.*',
      ],
    },
    'production:esm': {
      plugins: ['@babel/plugin-proposal-object-rest-spread'],
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: es5Browsers,
          },
        ],
        classPropertiesPreset,
        '@babel/preset-typescript',
      ],
      ignore: [
        'node_modules',
        '**/__mocks__',
        '**/__tests__',
        '**/__tests_external__',
        '**/__fixtures__',
        '**/*.test.*',
        '**/test.*',
      ],
    },
    'production:es2019': {
      plugins: [
        /* Transpile away these features that wouldn't otherwise with the specified browser targets below.
         * These features break webpack 4 and the workaround of resolving its transitive acorn dep causes issues
         * with async imports not being transpiled
         */
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
      ],
      presets: [
        [
          '@babel/env',
          {
            bugfixes: true,
            modules: false,
            targets: [
              'last 1 chrome versions',
              'last 1 edge versions',
              'last 1 firefox versions',
              'last 1 safari versions',
              'last 1 and_chr versions',
              'last 1 ios_saf versions',
            ],
          },
        ],
        classPropertiesPreset,
        '@babel/preset-typescript',
      ],
      ignore: [
        'node_modules',
        '**/__mocks__',
        '**/__tests__',
        '**/__tests_external__',
        '**/__fixtures__',
        '**/*.test.*',
        '**/test.*',
      ],
    },
    // This exists as its own env rather than its own top-level config because
    // extended configs don't seem to replace/override the `ignore` field
    //
    // Rather than ignoring file here, we're relying on the webpack config
    // to decide to ignore the compilation of certain files
    website: {
      presets: [
        [
          '@babel/env',
          {
            bugfixes: true,
            modules: false,
            targets: es5Browsers,
          },
        ],
        classPropertiesPreset,
        '@babel/preset-typescript',
      ],
    },
    test: {
      // There is no @babel/ scoped transform for this plugin
      plugins: ['transform-dynamic-import'],
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 'current',
              // TODO: Check if we need to transpile tests to ES5
              ie: '11',
            },
          },
        ],
        classPropertiesPreset,
        '@babel/preset-typescript',
      ],
    },
  },
  overrides: [
    /**
     * REMOVE ME: This override is needed to make sure that we only run the emotion's
     * babel plugin on components that need it. Without it every component will
     * have emotion included in their bundle.
     * Ticket: https://ecosystem.atlassian.net/browse/AK-6065
     */
    {
      test: ['./packages/design-system/navigation-next'],
      presets: ['@emotion/babel-preset-css-prop'],
    },
    /** This override runs the styled-components over legacy JS packages that were previously using the plugin */
    {
      test: [
        'build/website/docs/',
        'packages/design-system/droplist/',
        'packages/design-system/field-base/',
        'packages/design-system/field-radio-group/',
        'packages/design-system/field-range/',
        'packages/design-system/field-text/',
        'packages/design-system/field-text-area/',
        'packages/design-system/input/',
        'packages/design-system/item/',
        'packages/design-system/layer/',
        'packages/design-system/multi-select/',
        'packages/design-system/single-select/',
        'packages/design-system/table-tree/',
      ],
      plugins: [['styled-components', { minify: false }]],
    },
  ],
};
