const {
  getUpdatedTechstack,
  writeToTechstackRC,
  removeSolutionFromPackages,
} = require('./remove-utils');

const mockWriteToFileFn = jest.fn();
jest.mock('fs', () => ({
  writeFileSync: (...args) => mockWriteToFileFn(...args),
}));

const mockPathResolve = jest.fn(() => 'mockpath');
jest.mock('path', () => ({
  resolve: () => mockPathResolve(),
}));

jest.mock('../src/utils', () => ({
  getAllPackagesInProject: () => ['x/y/z'],
  getTechStackFromPackage: () => ({
    name: 'x/y/z',
    techstack: {
      '@def1': {
        foo: ['baz'],
      },
    },
    content: {
      techstack: {
        '@def1': {
          foo: ['baz'],
        },
      },
    },
  }),
}));

describe('remove utils', () => {
  beforeEach(() => {
    mockWriteToFileFn.mockClear();
  });
  const techstackrc = {
    config: {
      rootPath: '.',
      pathToPackages: 'packages',
      exclusions: ['__fixtures__'],
    },
    repository: {
      '@def1': {
        typing: ['typescript'],
      },
    },
    default: {
      '@def1': {
        typing: ['typescript'],
      },
    },
  };

  const updateParams = {
    type: 'repository',
    useCase: 'typing',
    solution: 'typescript',
    definition: '@def1',
  };
  test('get updated techstack function', () => {
    expect(getUpdatedTechstack({ updateParams, techstackrc }))
      .toMatchInlineSnapshot(`
      Object {
        "config": Object {
          "exclusions": Array [
            "__fixtures__",
          ],
          "pathToPackages": "packages",
          "rootPath": ".",
        },
        "default": Object {
          "@def1": Object {
            "typing": Array [
              "typescript",
            ],
          },
        },
        "repository": Object {
          "@def1": Object {},
        },
      }
    `);
  });

  test('writeToTechstackRC function', () => {
    writeToTechstackRC(techstackrc);
    expect(mockWriteToFileFn).toHaveBeenCalledWith(
      'mockpath',
      `module.exports=${JSON.stringify(techstackrc, null, 4)}`,
    );
  });

  test('removeSolutionFromPackages function', () => {
    removeSolutionFromPackages({
      config: {},
      updateParams: {
        useCase: 'foo',
        definition: '@def1',
        solution: 'baz',
      },
    });
    expect(mockWriteToFileFn).toHaveBeenCalledWith(
      'x/y/z',
      JSON.stringify(
        {
          techstack: {
            '@def1': {},
          },
        },
        null,
        4,
      ),
    );
  });
});
