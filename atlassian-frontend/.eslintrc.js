const path = require('path');
const techstackRuntime = require('./packages/techstack/techstack-runtime/src/index.js');

const resolverPath = path.resolve(
  `${__dirname}/build/monorepo-utils/resolvers/eslint-resolver.js`,
);

const config = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:compat/recommended',
  ],
  settings: {
    'import/extensions': ['.js', '.ts', '.tsx'],
    // Required to resolve atlaskit deps to src and remove webpack loader prefixes
    'import/resolver': {
      // node needs to be declared first. see https://github.com/benmosher/eslint-plugin-import/issues/1396
      node: {},
      [resolverPath]: {
        debug: false,
      },
    },
    'import/external-module-folders': ['node_modules', 'packages'],
    // Required to allow specific imports from nested deps for improved tree shaking
    'entry-points': {
      default: 99,
      custom: {
        lodash: ['*', 'fp/*'],
        '@atlaskit/icon': [
          '',
          'glyph/**',
          'glyph/**/**',
          'metadata',
          'types',
          'svg',
        ],
        '@atlaskit/icon-object': [
          'glyph/**',
          'glyph/**/**',
          'metadata',
          'types',
        ],
        '@atlaskit/icon-priority': [
          'glyph/**',
          'glyph/**/**',
          'metadata',
          'types',
        ],
        '@atlaskit/icon-file-type': [
          'glyph/**',
          'glyph/**/**',
          'metadata',
          'types',
        ],
      },
    },
    // Required so that the correct parser is used when resolving .js files from .ts
    // E.g. a TS package that imports from @atlaskit/docs (js) in an example
    'import/parsers': {
      'babel-eslint': ['.js'],
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    // List of polyfills for `eslint-plugin-compat` check
    // To know how to add in case you have a new one to add, please check
    // https://github.com/amilajack/eslint-plugin-compat/wiki/Adding-polyfills-(v2)
    polyfills: [
      // Shared polyfills across different packages
      'fetch',
      'Object.entries',
      'URL',
      'URLSearchParams',
      'AbortController',
      'Headers',
      'TouchEvent',
      'history.scrollRestoration',
      'Reflect',
      'Object.values',
      'window.scrollY',
      'Response',
      'Symbol.toStringTag',
      'Symbol.iterator',
      'Request',
      'Proxy',
      'String.raw',
      'PerformanceObserver',
      'IntersectionObserver',
      'Object.assign',
      'Array.prototype.includes',
      'Array.prototype.find',
      'String.prototype.includes',
      // List based on polyfill.io polyfill added in website examples
      'Array.from',
      'Array.prototype.fill',
      'Array.prototype.find',
      'Array.prototype.findIndex',
      'Array.prototype.keys',
      'Array.prototype.values',
      'Map',
      'Math.fround',
      'Math.min',
      'Math.max',
      'Math.cos',
      'Math.floor',
      'Math.pow',
      'Math.random',
      'Math.ceil',
      'Math.floor',
      'Math.abs',
      'Math.round',
      'Math.pow',
      'Math.PI',
      'Number',
      'Number.isInteger',
      'Number.isNaN',
      'Number.parseFloat',
      'Number.parseInt',
      'Set',
      'String.prototype.endsWith',
      'String.prototype.repeat',
      'String.prototype.startsWith',
      'Symbol.iterator',
      'Symbol.toStringTag',
      'WeakMap',
      'WeakSet',
      'Promise',
    ],
  },
  parser: 'babel-eslint',
  plugins: [
    'jest',
    'jsdoc',
    'react',
    'react-hooks',
    'json',
    '@atlassian/tangerine',
  ],
  rules: {
    // Rule was added because babel-plugin-add-react-displayname fails to parse on default exports of unnamed classes
    // This only occurs when using es2019 modern bundles, since they are otherwise transpiled down in cjs/esm.
    // https://github.com/opbeat/babel-plugin-add-react-displayname/issues/10
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowArrowFunction: true,
        allowAnonymousClass: false, // False here to only disallow unnamed classes
        allowAnonymousFunction: true,
        allowCallExpression: true, // True here for backward compatibility
        allowLiteral: true,
        allowObject: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          // Top level dirs that aren't src - can't have ** either side
          'packages/*/*/!(src)/**/*.{js,ts,tsx}',
          'services/*/*/!(src)/**/*.{js,ts,tsx}',
          // Docs
          '**/docs/**/*.{js,ts,tsx}',
          // __tests__ dirs inside src
          '**/__tests__/**/*.{js,ts,tsx}',
          // tests placed alongside corresponding files in accordance with Tangerine project structure
          `**/*.test.+(js|ts|tsx)`,
          `**/test.+(js|ts|tsx)`,
          // Examples and storybooks
          '**/examples.{ts,tsx}',
          '**/examples/*.{ts,tsx}',
          '**/examples/*/*.{ts,tsx}',
          '**/storybook/**/*',
          // Any build dirs
          '**/build/**/*.{js,ts,tsx}',
          // Service integration tests
          'services/*/service-integration/**/*.ts',
          // Storybook
          '.storybook/*',
          // types
          'packages/**/src/**/types.{js,ts,tsx}',
          'services/**/src/**/types.{js,ts,tsx}',
          // Tests that exist next to the code files
          'packages/*/*/src/**/*.test.{js,ts,tsx}',
          'services/**/src/**/*.test.{js,ts,tsx}',
          // Webpack config
          '**/webpack.*.js',
          // codemods
          'packages/monorepo-tooling/codemod-utils/**/*',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          'rxjs',
          'rxjs/operators',
          'rxjs/Rx',
          {
            name: 'date-fns',
            message:
              "Please import e.g. import addDays from 'date-fns/add_days' instead.",
          },
          {
            name: 'react',
            importNames: ['*'],
            message: "Please import React from 'react' instead.",
          },
          {
            name: 'react-dom',
            importNames: ['*'],
            message: "Please import ReactDOM from 'react-dom' instead.",
          },
          {
            name: 'prop-types',
            importNames: ['*'],
            message: "Please import PropTypes from 'prop-types' instead.",
          },
          {
            name: 'lodash',
            message:
              "Please import functions by entrypoint instead: e.g. `import groupBy from 'lodash/groupBy';`",
          },
        ],
        patterns: [
          // Prevent deprecated individual lodash single-function packages from
          // being used. This can't be communicated via an eslint message as
          // patterns cannot provide a message at the moment:
          // https://github.com/eslint/eslint/issues/11843
          'lodash.*',
        ],
      },
    ],

    '@atlassian/tangerine/import/no-relative-package-imports': 'error',
    // TODO: Might be worth re-enabling it at some stage (or using stricter instead)
    'import/no-cycle': 'off',

    'import/dynamic-import-chunkname': [
      'warn',
      {
        webpackChunknameFormat: '@atlaskit-internal_.+',
      },
    ],

    'max-classes-per-file': 'off', // ~2159

    'no-labels': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',

    'arrow-body-style': 'off',

    'spaced-comment': 'off',

    'no-async-promise-executor': 'off', // ~11
    'no-await-in-loop': 'off',

    'no-mixed-operators': 'off',
    'no-plusplus': 'off',

    'prefer-object-spread': 'off', // ~20

    'react/button-has-type': 'off', // ~111
    'react/sort-comp': 'off',
    'react/jsx-curly-brace-presence': 'off', // ~91
    'react/jsx-curly-newline': 'off', // ~104
    'react/jsx-filename-extension': 'off',
    'react/jsx-fragments': 'off', // ~128
    'react/jsx-props-no-spreading': 'off', // ~904
    'react/require-default-props': 'off',
    // TODO: https://ecosystem.atlassian.net/browse/AK-6060
    // enable rules after fixing linting issue after upgrade
    'react/destructuring-assignment': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unused-state': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-this-in-sfc': 'off', // ~3
    'react/prefer-stateless-function': 'off',
    'react/require-render-return': 'off', // ~2
    'react/static-property-placement': 'off', // ~395
    'react/state-in-constructor': 'off', // ~591
    'jsx-a11y/control-has-associated-label': 'off', // ~13
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',

    // Remove me after removing the usage of a legacy React lifecycle methods
    // Rule was extended based on the AirBnB rule from:
    // https://github.com/airbnb/javascript/blob/282ef9ea9051dce725f382ac83cb5c3f2d4da0c2/packages/eslint-config-airbnb-base/rules/style.js#L24
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: false,
        allow: [
          'UNSAFE_componentWillMount',
          'UNSAFE_componentWillReceiveProps',
          'UNSAFE_componentWillUpdate',
        ],
      },
    ],

    'react/no-multi-comp': ['off', { ignoreStateless: true }], // ~36 / ~469
    'react/forbid-prop-types': [
      'error',
      {
        forbid: ['any', 'array'],
        checkContextTypes: true,
        checkChildContextTypes: true,
      },
    ],
    'react/prop-types': ['error', { ignore: ['children'] }],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: '(useStateFromPromise|useAbortableEffect)' },
    ],

    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'no-console': 'error',
    'no-restricted-globals': ['error', 'event', 'fdescribe'],

    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/valid-expect': 'error',

    'json/duplicate-key': 'error',
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration[const=true]',
            message:
              'Babel does not allow const enum, use a normal enum instead without the const',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-empty-function': 'off', // ~108
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/no-triple-slash-reference': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/prefer-interface': 'off',

        'no-useless-constructor': 'off',

        // This is handled by import/no-duplicates which takes into account TS 3.8 type imports
        'no-duplicate-imports': 'off',
        // Turn off import/no-duplicates as well since there are too many violations, they are autofixable though ~ 400
        'import/no-duplicates': 'off',
        // TODO: Set to `error` when https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/565
        //       is fixed.
        'jsx-a11y/aria-proptypes': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',

        // Typechecking should cover this and there are issues with this rule for TS
        // https://github.com/benmosher/eslint-plugin-import/issues/1282
        'import/named': 'off',

        // disabled temporarily during tslint -> eslint transition
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off', // ~395 as of 09/2020
        camelcase: 'off', // ~161 as of 09/2020
        '@typescript-eslint/consistent-type-assertions': 'off', // ~20
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-useless-constructor': 'off',
        'array-callback-return': 'off',
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        curly: [1, 'all'],
        'default-case': 'off',
        'dot-notation': 'off',
        'func-names': 'off',
        'global-require': 'off',
        'guard-for-in': 'off',
        'lines-around-directive': 'off',
        'import/export': 'off',
        'import/first': 'off',
        'import/newline-after-import': 'off',
        'import/no-commonjs': 'off',
        'import/no-dynamic-require': 'off',
        'import/no-mutable-exports': 'off',
        'import/no-named-default': 'off',
        'import/no-useless-path-segments': 'off',
        'import/no-webpack-loader-syntax': 'off',
        'import/order': 'off',
        'jest/no-identical-title': 'off',
        'jest/valid-expect': 'off',
        'jsx-a11y/accessible-emoji': 'off',
        'jsx-a11y/alt-text': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/iframe-has-title': 'off',
        'jsx-a11y/no-autofocus': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'lines-between-class-members': 'off',
        'new-cap': 'off',
        'no-alert': 'off',
        'no-bitwise': 'off',
        'no-buffer-constructor': 'off',
        'no-case-declarations': 'off',
        'no-cond-assign': 'off',
        'no-continue': 'off',
        'no-control-regex': 'off',
        'no-dupe-class-members': 'off',
        'no-else-return': 'off',
        'no-empty': 'off',
        'no-empty-function': 'off',
        'no-empty-pattern': 'off',
        'no-extra-boolean-cast': 'off',
        'no-lonely-if': 'off',
        'no-loop-func': 'off',
        'no-irregular-whitespace': 'off',
        'no-multi-assign': 'off',
        'no-named-default': 'off',
        'no-nested-ternary': 'off',
        'no-new': 'off',
        'no-param-reassign': 'off',
        'no-prototype-builtins': 'off',
        'no-var': 'off',
        'no-void': 'off',
        'no-restricted-properties': 'off',
        'no-return-assign': 'off',
        'no-return-await': 'off',
        'no-script-url': 'off',
        'no-self-assign': 'off',
        'no-sequences': 'off',
        'no-shadow': 'off',
        'no-sparse-arrays': 'off',
        'no-unneeded-ternary': 'off',
        'no-unused-expressions': 'off',
        'no-useless-concat': 'off',
        'no-useless-computed-key': 'off',
        'no-useless-escape': 'off',
        'no-useless-rename': 'off',
        'no-useless-return': 'off',
        'object-shorthand': 'off',
        'one-var': 'off',
        'operator-assignment': 'off',
        'prefer-const': 'off',
        'prefer-destructuring': 'off',
        'prefer-promise-reject-errors': 'off',
        'prefer-rest-params': 'off',
        'prefer-spread': 'off',
        'prefer-template': 'off',
        radix: 'off',
        'react/jsx-boolean-value': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-no-target-blank': 'off',
        'react/no-array-index-key': 'off',
        'react/no-children-prop': 'off',
        'react/no-danger': 'off',
        'react/no-did-update-set-state': 'off', // ~12
        'react/no-will-update-set-state': 'off',
        'react/no-find-dom-node': 'off',
        'react/no-string-refs': 'off',
        'react/no-typos': 'off',
        'react/prop-types': 'off',
        'react/style-prop-object': 'off',
        strict: 'off',
        'valid-typeof': 'off',
        'vars-on-top': 'off',
        yoda: 'off',
      },
    },
    {
      files: [
        'packages/*/*/examples/**',
        'packages/*/*/__perf__/**',
        'packages/**/example-helpers/**',
        'packages/**/examples-helpers/**',
        'packages/monorepo-tooling/**',
      ],
      rules: {
        'no-console': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['packages/*/*/docs/**'],
      rules: {
        'global-require': 'off',
        'import/no-webpack-loader-syntax': 'off',
      },
    },
    {
      files: ['packages/design-system/navigation-next/**'],
      rules: {
        'react/prop-types': 'off',
      },
    },
    {
      files: [
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/*.test.{js,ts,tsx}',
        '**/test.{js,ts,tsx}',
        '**/*-test-helpers/**',
        'services/*/service-integration/**/*.ts',
      ],
      env: {
        jest: true,
      },
      globals: {
        SYNCHRONY_URL: 'readonly',
        fail: 'readonly',
        jasmine: 'readonly',
        spyOn: 'readonly',
      },
      rules: {
        'global-require': 'off',
        'max-classes-per-file': 'off',
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['**/build/**', '**/services/**', '**/packages/jira/flow-cli/**'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [
        'services/website-constellation/**',
        'services/gatsby-theme-brisk/**',
        'packages/design-system/**',
      ],
      extends: [
        'plugin:jsx-a11y/strict',
        'plugin:eslint-plugin-styled-components-a11y/strict',
      ],
      rules: {
        // Rule was removed because it's deprecated. Need to use label-has-associated-control instead.
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md#deprecated-label-has-for
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            assert: 'either',
          },
        ],
      },
    },
  ],
};

module.exports = techstackRuntime.eslintAdapter(config, {
  workingDirectory: __dirname,
});
