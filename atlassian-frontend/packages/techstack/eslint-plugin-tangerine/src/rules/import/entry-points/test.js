const { ruleTester } = require('@atlassian/eslint-utils');

const rule = require('./index');

jest.mock('pkg-up', () => ({
  sync: () => '/a/b/c/package.json',
}));

jest.mock('../../../utils/get-from-cache', () => ({
  getFromCache: (cache, key) => {
    const mockEmptyPackageJson = {};

    const mockExportsPackageJson = {
      exports: {
        './a/b': './something',
      },
    };

    const mockEmptyExportsPackageJson = {
      'af:exports': {},
    };

    const mockDepthPackageJson = {
      allowedImportDepth: 2,
    };
    const mockCache = {
      '@foo/foo-no-declaration': mockEmptyPackageJson,
      'foo-no-declaration': mockEmptyPackageJson,
      '@bar/bar-exports-declaration': mockExportsPackageJson,
      'bar-exports-declaration': mockExportsPackageJson,
      '@baz/baz-depth-declaration': mockDepthPackageJson,
      'baz-depth-declaration': mockDepthPackageJson,
      '@foo/foo-empty-exports-declaration': mockEmptyExportsPackageJson,
    };
    return mockCache[key];
  },
}));

const fixTest = ({ code, options, settings, errors }) => ({
  code,
  filename: '/a/b/c/d/file.js',
  options: options ? [options] : [],
  settings: settings ? { 'entry-points': settings } : undefined,
  errors: errors || undefined,
});

const generateValidTestCasesForPackage = pkg =>
  [
    {
      code: `
        // should be valid when imported acc. to default depth (0) from defaults
        import X from '${pkg}';
      `,
    },
    {
      code: `
        // should be valid when imported acc. to default depth (0) from rule config
        import X from '${pkg}';
      `,
      options: { default: 0 },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (1) from rule config
        import X from '${pkg}/a';
      `,
      options: { default: 1 },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (2) from rule config
        import X from '${pkg}/a/b';
      `,
      options: { default: 2 },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (0) from settings
        import X from '${pkg}';
      `,
      settings: { default: 0 },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (1) from settings
        import X from '${pkg}/a';
      `,
      settings: { default: 1 },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (2) from settings
        import X from '${pkg}/a/b';
      `,
      settings: { default: 2 },
    },
    {
      code: `
        // should be valid when imported from excluded dependencies from rule config
        import X from '${pkg}/a/b';
      `,
      options: {
        default: 1,
        excluded: [pkg],
      },
    },
    {
      code: `
        // should be valid when imported from excluded dependencies from settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 1 },
      settings: { excluded: [pkg] },
    },
    {
      code: `
        // should be valid when imported acc. to custom depth from rule config
        import X from '${pkg}/a/b';
      `,
      options: {
        default: 1,
        custom: { [pkg]: 2 },
      },
    },
    {
      code: `
        // should be valid when imported acc. to custom glob (a/*) from rule config
        import X from '${pkg}/a/b';
      `,
      options: {
        default: 1,
        custom: { [pkg]: 'a/*' },
      },
    },
    {
      code: `
        // should be valid when imported acc. to custom glob (a/b) from rule config
        import X from '${pkg}/a/b';
      `,
      options: {
        default: 1,
        custom: { [pkg]: 'a/b' },
      },
    },
    {
      code: `
        // should be valid when imported acc. to custom globs from rule config
        import X from '${pkg}/a/b';
      `,
      options: {
        default: 1,
        custom: { [pkg]: ['a/b', 'c'] },
      },
    },
    {
      code: `
        // should be valid when imported acc. to custom depth from settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 1 },
      settings: { custom: { [pkg]: 2 } },
    },
    {
      code: `
        // should be valid when imported acc. to custom glob (a/*) from settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 1 },
      settings: { custom: { [pkg]: 'a/*' } },
    },
    {
      code: `
        // should be valid when imported acc. to custom glob (a/b) from settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 1 },
      settings: { custom: { [pkg]: 'a/b' } },
    },
    {
      code: `
        // should be valid when imported acc. to custom globs from settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 1 },
      settings: { custom: { [pkg]: ['a/b', 'c'] } },
    },
    {
      code: `
        // should be valid when imported acc. to default depth (2) because options are merged with settings
        import X from '${pkg}/a/b';
      `,
      options: { default: 2 },
      settings: { default: 1 },
    },
    {
      code: `
        // should be valid when imported acc. to excluded dependencies because options are merged with settings
        import X from '${pkg}/a/b';
      `,
      options: { excluded: ['@some/other-dep', 'some-other-dep'] },
      settings: { excluded: [pkg] },
    },
    {
      code: `
        // should be valid when imported acc. to custom configs because options are merged with settings
        import X from '${pkg}/a/b';
      `,
      options: { custom: { '@some/other-dep': 1, 'some-other-dep': 1 } },
      settings: { custom: { [pkg]: 2 } },
    },
  ].map(fixTest);

const generateValidTestCasesForPackageAccToDeclaration = pkg =>
  [
    {
      code: `
        // should be valid when imported acc. to declaration
        import X from '${pkg}/a/b';
      `,
    },
  ].map(fixTest);

const createInvalidImportError = from => ({
  errors: [
    {
      messageId: 'invalidImport',
      data: { from },
    },
  ],
});

const generateInvalidTestCasesForPackage = pkg =>
  [
    {
      code: `
        // should be invalid when not imported acc. to default depth (0) from defaults
        import X from '${pkg}/a';
      `,
      options: {
        custom: { '@some/other-dep': 3 },
        excluded: ['some-other-dep'],
      },
      ...createInvalidImportError(`${pkg}/a`),
    },
    {
      code: `
        // should be invalid when not imported acc. to default depth (1) from options
        import X from '${pkg}/a/b/c';
      `,
      options: {
        default: 1,
        custom: { '@some/other-dep': 3 },
        excluded: ['some-other-dep'],
      },
      ...createInvalidImportError(`${pkg}/a/b/c`),
    },
    {
      code: `
        // should be invalid when not imported acc. to default depth (1) from settings
        import X from '${pkg}/a/b/c';
      `,
      settings: {
        default: 1,
        custom: { '@some/other-dep': 3 },
        excluded: ['some-other-dep'],
      },
      ...createInvalidImportError(`${pkg}/a/b/c`),
    },
    {
      code: `
        // should be invalid when not imported acc. to custom depth (2) from options
        import X from '${pkg}/a/b/c';
      `,
      options: {
        default: 3,
        custom: { [pkg]: 2 },
        excluded: ['some-other-dep'],
      },
      ...createInvalidImportError(`${pkg}/a/b/c`),
    },
    {
      code: `
        // should be invalid when not imported acc. to custom depth (2) from settings
        import X from '${pkg}/a/b/c';
      `,
      settings: {
        default: 3,
        custom: { [pkg]: 2 },
        excluded: ['some-other-dep'],
      },
      ...createInvalidImportError(`${pkg}/a/b/c`),
    },
  ].map(fixTest);

const generateInvalidTestCasesForPackageAccToDeclaration = pkg =>
  [
    {
      code: `
        // should be invalid when not imported acc. to declaration
        import X from '${pkg}/a/b/c';
      `,
      ...createInvalidImportError(`${pkg}/a/b/c`),
    },
  ].map(fixTest);

ruleTester.run('import/entry-points', rule, {
  valid: [
    ...generateValidTestCasesForPackage('@foo/foo-no-declaration'),
    ...generateValidTestCasesForPackage('foo-no-declaration'),
    ...generateValidTestCasesForPackageAccToDeclaration(
      '@bar/bar-exports-declaration',
    ),
    ...generateValidTestCasesForPackageAccToDeclaration(
      'bar-exports-declaration',
    ),
    ...generateValidTestCasesForPackageAccToDeclaration(
      '@baz/baz-depth-declaration',
    ),
    ...generateValidTestCasesForPackageAccToDeclaration(
      'baz-depth-declaration',
    ),
    ...generateValidTestCasesForPackage('@foo/foo-empty-exports-declaration'),
    fixTest({
      code: `
        // should be valid for relative imports
        import X from './x/z/y';
      `,
    }),
  ],
  invalid: [
    ...generateInvalidTestCasesForPackage('@foo/foo-no-declaration'),
    ...generateInvalidTestCasesForPackage('foo-no-declaration'),
    ...generateInvalidTestCasesForPackageAccToDeclaration(
      '@bar/bar-exports-declaration',
    ),
    ...generateInvalidTestCasesForPackageAccToDeclaration(
      'bar-exports-declaration',
    ),
    ...generateInvalidTestCasesForPackageAccToDeclaration(
      '@baz/baz-depth-declaration',
    ),
    ...generateInvalidTestCasesForPackageAccToDeclaration(
      'baz-depth-declaration',
    ),
  ],
});
