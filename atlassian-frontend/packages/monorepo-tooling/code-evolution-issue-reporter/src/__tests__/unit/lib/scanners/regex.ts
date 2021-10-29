import { RegexScanner } from '../../../../lib/scanners/regex';
import { executeCommand } from '../../../../lib/util/shell';

jest.mock('../../../../lib/util/shell', () => {
  return {
    __esModule: true,
    executeCommand: jest.fn(() =>
      `
foo/bar/foo.ts:123:  some pseudo code
foo/bar/bar.ts:456:  some pseudo code
foo/bar/baz.ts:789:  some pseudo code`.trim(),
    ),
  };
});

describe('scanner/regex', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should join matchers and file globs correctly', async () => {
    new RegexScanner()
      .forFilesMatchingGlob('foo')
      .withMatchingRules(['bar', 'baz'])
      .build()
      .search();
    expect((executeCommand as jest.Mock).mock.calls[0][0]).toEqual(
      'git grep -n -e "bar" --or -e "baz" -- "foo"',
    );
  });

  it('should correctly report matches', async () => {
    const result = new RegexScanner()
      .forFilesMatchingGlob('foo')
      .withMatchingRules(['bar', 'baz'])
      .build()
      .search();
    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "lines": Array [
            Object {
              "from": 123,
              "to": 123,
            },
          ],
          "name": "../../../../../foo.ts",
        },
        Object {
          "lines": Array [
            Object {
              "from": 456,
              "to": 456,
            },
          ],
          "name": "../../../../../bar.ts",
        },
        Object {
          "lines": Array [
            Object {
              "from": 789,
              "to": 789,
            },
          ],
          "name": "../../../../../baz.ts",
        },
      ]
    `);
  });
});
