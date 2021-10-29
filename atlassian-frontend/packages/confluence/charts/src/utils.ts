import { ADFNode, ParseNumber } from './types';

export const defaultParseNumber: ParseNumber = (num) => {
  const n = Number(num);
  if (Number.isNaN(n)) {
    return null;
  }

  return n;
};

const rowHasNumber = (parseNumber: ParseNumber) => (
  entity: ADFNode | undefined,
) => {
  if (entity === undefined) {
    return false;
  }

  const cols = entity.content;
  if (!cols) {
    return false;
  }

  return cols.some((col) => {
    const colText = getText(col).trim();
    if (!colText.length) {
      return false;
    }

    const colNumber = parseNumber(colText);
    // console.log('col', colText, colNumber);
    return colNumber !== null;
  });
};

/**
 * Parses a ADF table, which may contain merged cells, into a rectangular array of
 * arrays containing the text of each cell.
 *
 * Merged cells will be set to empty text, unless `copyMerged` is true.
 *
 * Assumes a rectangular input shape.
 */
export const parseTable = (table: ADFNode, copyMerged = false) => {
  const parsedRows: string[][] = [];
  if (table.content) {
    const rows = table.content;
    if (!rows[0].content) {
      return parsedRows;
    }

    /* get n dimension by following first row */
    let dim = 0;
    rows[0].content.forEach((col) => {
      dim += col.attrs?.colspan || 1;
    });

    /* construct our mxn array */
    for (let i = 0; i < rows.length; i++) {
      parsedRows.push(new Array(dim));
    }

    /* copy the values from the table into the array
     * keeping in mind spans */
    rows.forEach((row, i) => {
      const cols = row.content;

      if (!cols) {
        return;
      }

      cols.forEach((col, j) => {
        const text = getText(col).trim();
        const colspan = col.attrs?.colspan || 1;
        const rowspan = col.attrs?.rowspan || 1;

        let isSpan = false;
        for (let ii = 0; ii < rowspan; ii++) {
          for (let jj = 0; jj < colspan; jj++) {
            /* this block might've been allocated from a previous
             * rowspan */
            let next = 0;
            while (parsedRows[i + ii][j + jj + next] !== undefined) {
              next++;
            }

            /* only place the text in the first cell, and treat
             * other cells as split (unless copy is true) */
            if (!isSpan || copyMerged) {
              parsedRows[i + ii][j + jj + next] = text;
              isSpan = true;
            } else {
              parsedRows[i + ii][j + jj + next] = '';
            }
          }
        }
      });
    });
  }

  return parsedRows;
};

const rowHasNumberAtCol = (parseNumber: ParseNumber, colIdx: number) => (
  row: string[],
) => {
  const col = row[colIdx];
  if (col === undefined) {
    return false;
  }

  const colNumber = parseNumber(col);
  return colNumber !== null;
};

export const columnHasNumbers = (
  table: string[][],
  parseNumber: ParseNumber,
  colIdx: number,
): boolean => {
  /* slice out the table heading row */
  return table.slice(1).every(rowHasNumberAtCol(parseNumber, colIdx));
};

/**
 * Returns false if some cells do not contain a value that is numeric. Empty cells are ignored.
 */
export const tableHasNumbers = (
  table: ADFNode,
  parseNumber: ParseNumber,
): boolean => {
  if (table.content) {
    const rows = table.content;
    return rows.some(rowHasNumber(parseNumber));
  }

  return false;
};

export const getText = (child: ADFNode | undefined): string => {
  if (!child) {
    return '';
  }

  if (child.content) {
    return child.content.map(getText).join('\n');
  }

  return child.text || '';
};
