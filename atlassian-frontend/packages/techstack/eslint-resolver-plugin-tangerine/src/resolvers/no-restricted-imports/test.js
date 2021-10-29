const resolver = require('.');

describe('no restricted imports resolver', () => {
  test('it should return the correct config', () => {
    const existingConfig = [
      'error',
      {
        paths: [
          {
            name: 'import-foo',
            message: 'Please use import-baz instead.',
          },
        ],
      },
    ];
    const newConfig = [
      'error',
      {
        paths: [
          {
            name: 'import-baz',
            message: 'Please use import-foo instead.',
          },
        ],
      },
    ];

    expect(resolver(existingConfig, newConfig)).toMatchInlineSnapshot(`
      Array [
        "error",
        Object {
          "paths": Array [
            Object {
              "message": "Please use import-baz instead.",
              "name": "import-foo",
            },
            Object {
              "message": "Please use import-foo instead.",
              "name": "import-baz",
            },
          ],
        },
      ]
    `);
  });
});
