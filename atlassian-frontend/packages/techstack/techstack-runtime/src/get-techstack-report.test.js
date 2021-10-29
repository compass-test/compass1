const getTechstackReport = require('./get-techstack-report');

const createCheck = ({ type, configuration }) => ({
  configuration,
  type,
});

const mockChecks = [
  createCheck({ type: 'eslint', configuration: 'error' }),
  createCheck({ type: 'stricter', configuration: 'error' }),
];

jest.mock('./utils', () => ({
  getAllPackagesInProject: () => ['x/y/z', 'a/b/c'],
  getTechstackConfig: () => ({
    repository: {
      '@def1': {
        x: ['y'],
      },
    },
    default: {
      '@def1': {
        x: ['y'],
      },
    },
  }),
  getTechStackDefinition: () => [{ solutions: [{ checks: mockChecks }] }],
  getTechStackFromPackage: () => ({
    name: 'x/y/z',
    techstack: {
      x: ['y'],
    },
  }),
}));

describe('get techstack report', () => {
  test('returns the correct techstack report', () => {
    expect(
      getTechstackReport({
        rootPath: '.',
        pathToPackages: 'packages',
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "definitions": Object {
          "@def1": Array [
            Object {
              "solutions": Array [
                Object {
                  "checks": Array [
                    Object {
                      "configuration": "error",
                      "type": "eslint",
                    },
                    Object {
                      "configuration": "error",
                      "type": "stricter",
                    },
                  ],
                },
              ],
            },
          ],
        },
        "techstack": Object {
          "all": Object {
            "default": Object {
              "@def1": Object {
                "x": Array [
                  "y",
                ],
              },
            },
            "repository": Object {
              "@def1": Object {
                "x": Array [
                  "y",
                ],
              },
            },
          },
          "x/y/z": Object {
            "x": Array [
              "y",
            ],
          },
        },
      }
    `);
  });
});
