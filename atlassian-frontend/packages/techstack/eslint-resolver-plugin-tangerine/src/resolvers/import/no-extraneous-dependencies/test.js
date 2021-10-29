const resolver = require('./index');

describe('import/no-extraneous-dependencies resolver', () => {
  test('should return the correct config', () => {
    const existingConfig = [
      'error',
      {
        devDependencies: ['glob-a'],
      },
    ];
    const newConfig = [
      'error',
      {
        devDependencies: ['glob-b'],
      },
    ];

    expect(resolver(existingConfig, newConfig)).toMatchInlineSnapshot(`
      Array [
        "error",
        Object {
          "devDependencies": Array [
            "glob-a",
            "glob-b",
          ],
        },
      ]
    `);
  });
});
