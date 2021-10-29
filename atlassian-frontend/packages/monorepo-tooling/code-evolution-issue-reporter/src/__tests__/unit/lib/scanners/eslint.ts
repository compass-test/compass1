import { loadFileAsJson } from '../../../../lib/util/io';
import { scanWithEslint } from '../../../../lib/scanners/eslint';
import type { EslintFileReport, EslintRule } from '../../../../types';

describe('scanner/eslint', () => {
  let eslintOutput: EslintFileReport[];
  beforeAll(async () => {
    eslintOutput = await loadFileAsJson<EslintFileReport[]>(
      require.resolve('../__fixtures__/eslint-output.json'),
    );
  });

  it('should find offending files matching specified rule', async () => {
    const result = scanWithEslint(eslintOutput, [
      {
        ruleName: 'some eslint rule',
      } as EslintRule,
    ]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "files": Array [
            Object {
              "lines": Array [
                Object {
                  "from": 18,
                  "to": 56,
                },
              ],
              "name": "some/path/file-3.tsx",
            },
          ],
          "rule": Object {
            "reportedMessage": "Some other message",
            "ruleName": "some eslint rule",
          },
        },
      ]
    `);
  });

  it('should find offending files matching specified rules', async () => {
    const result = scanWithEslint(eslintOutput, [
      {
        ruleName: 'some eslint rule',
      },
      {
        ruleName: 'react/prefer-stateless-function',
      },
    ] as EslintRule[]);

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "files": Array [
            Object {
              "lines": Array [
                Object {
                  "from": 18,
                  "to": 56,
                },
              ],
              "name": "some/path/file-1.tsx",
            },
            Object {
              "lines": Array [
                Object {
                  "from": 22,
                  "to": 58,
                },
              ],
              "name": "some/path/file-2.tsx",
            },
          ],
          "rule": Object {
            "reportedMessage": "Component should be written as a pure function",
            "ruleName": "react/prefer-stateless-function",
          },
        },
        Object {
          "files": Array [
            Object {
              "lines": Array [
                Object {
                  "from": 18,
                  "to": 56,
                },
              ],
              "name": "some/path/file-3.tsx",
            },
          ],
          "rule": Object {
            "reportedMessage": "Some other message",
            "ruleName": "some eslint rule",
          },
        },
      ]
    `);
  });
});
