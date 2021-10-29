import {
  computeGutterWidth,
  getMaxLineNumber,
  groupChanges,
} from '../diffparser';

const mockChanges = [
  {
    oldLine: 1,
    newLine: 1,
    type: 'loaded',
    content: ' 1st line',
  },
  {
    oldLne: 2,
    newLine: 2,
    type: 'loaded',
    content: ' 2nd line',
  },
  {
    oldLine: 3,
    newLine: 3,
    type: 'normal',
    content: ' 3rd line',
  },
  {
    oldLine: 4,
    newLine: 4,
    type: 'normal',
    content: ' 4th line',
  },
  {
    oldLine: 5,
    newLine: 5,
    type: 'loaded',
    content: ' 5th line',
  },
  {
    oldLine: 6,
    newLine: 6,
    type: 'loaded',
    content: '6th line',
  },
];

describe('diffparser util', () => {
  it('returns empty arrays if empty array is specified', () => {
    const { loadedBefore, loadedAfter, rest } = groupChanges([]);

    expect(loadedBefore).toHaveLength(0);
    expect(loadedAfter).toHaveLength(0);
    expect(rest).toHaveLength(0);
  });

  it('groups changes', () => {
    const result = groupChanges(mockChanges as any);

    expect(result).toMatchSnapshot();
  });

  const composeGutterWidth = (isSideBySide: any) => (maxLineNumber: any) =>
    computeGutterWidth({
      isSideBySide,
      maxLineNumber,
    } as any);

  describe('returns correct gutter width for unified diff', () => {
    const computeGutterWidthUnified = composeGutterWidth(false);

    it('Max line number is less than 10', () => {
      const maxLineNumber = 9;
      const gutterWidth = computeGutterWidthUnified(maxLineNumber);
      const correctGutterWidth = 40;

      expect(gutterWidth).toBe(correctGutterWidth);
    });

    it('Max line number is less than 100', () => {
      const maxLineNumber = 99;
      const gutterWidth = computeGutterWidthUnified(maxLineNumber);
      const correctGutterWidth = 56;

      expect(gutterWidth).toBe(correctGutterWidth);
    });

    it('Max line number is less than 1000', () => {
      const maxLineNumber = 999;
      const gutterWidth = computeGutterWidthUnified(maxLineNumber);
      const correctGutterWidth = 72;

      expect(gutterWidth).toBe(correctGutterWidth);
    });
  });

  describe('returns calculated max line number', () => {
    it('Returns 0 for empty chunk', () => {
      const diff = { chunks: [] };
      expect(getMaxLineNumber(diff as any)).toBe(0);
    });
  });
});
