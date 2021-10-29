import {
  columnHasNumbers,
  defaultParseNumber,
  parseTable,
  tableHasNumbers,
} from '../../utils';

import docWithEmptyTable from './__fixtures__/doc-with-empty-table.json';
import docWithNumericLastColumn from './__fixtures__/doc-with-numeric-last-column.json';

describe('utils', () => {
  describe('tableHasNumbers', () => {
    it('returns false for an empty table', () => {
      expect(
        tableHasNumbers(docWithEmptyTable.content[0], defaultParseNumber),
      ).toBe(false);
    });

    it('returns true for a table with numbers in the last column', () => {
      expect(
        tableHasNumbers(
          docWithNumericLastColumn.content[0],
          defaultParseNumber,
        ),
      ).toBe(true);
    });
  });

  describe('parseTable', () => {
    it('returns empty table in the right shape for an empty input', () => {
      expect(parseTable(docWithEmptyTable.content[0])).toEqual([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ]);
    });

    it('parses a merged cell and column table', () => {
      expect(
        parseTable({
          type: 'table',
          attrs: {
            isNumberColumnEnabled: false,
            layout: 'default',
            localId: 'e2953ed0-4703-4a55-91de-a9872fc18a2d',
          },
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {
                    colspan: 2,
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'hello world',
                          marks: [
                            {
                              type: 'strong',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    colspan: 2,
                    rowspan: 2,
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'asd',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
              ],
            },
          ],
        } as any),
      ).toEqual([
        ['hello world', '', ''],
        ['', 'asd', ''],
        ['', '', ''],
      ]);
    });

    it('parses the middle column merged vertically', () => {
      expect(
        parseTable({
          type: 'table',
          attrs: {
            isNumberColumnEnabled: false,
            layout: 'default',
            localId: '8959aa53-a0c0-4d39-8206-a7cf230ee670',
          },
          content: [
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableHeader',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
                {
                  type: 'tableHeader',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '4',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {
                    rowspan: 2,
                  },
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: 'merged',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '5',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              content: [
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '6',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  attrs: {},
                  content: [
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: '7',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        } as any),
      ).toEqual([
        ['', '', ''],
        ['4', 'merged', '5'],
        ['6', '', '7'],
      ]);
    });

    it('returns the correct content for a mixed table', () => {
      expect(parseTable(docWithNumericLastColumn.content[0])).toEqual([
        ['Column A', 'Column B', 'Column C'],
        ['Title', '', '1'],
        ['' /* status will get munged */, '', '2'],
      ]);
    });
  });

  describe('columnHasNumbers', () => {
    it('returns true for the last column', () => {
      expect(
        columnHasNumbers(
          parseTable(docWithNumericLastColumn.content[0]),
          defaultParseNumber,
          2,
        ),
      ).toBe(true);
    });

    it('returns false for the first column', () => {
      expect(
        columnHasNumbers(
          parseTable(docWithNumericLastColumn.content[0]),
          defaultParseNumber,
          0,
        ),
      ).toBe(false);
    });
  });
});
