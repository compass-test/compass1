// import React from 'react';
import { InjectedIntl } from 'react-intl';

import { i18n } from '../../messages';
import { ParseNumber } from '../../types';

export function normaliseYSeriesNames(
  yAxisIdxField: string | string[] | undefined,
) {
  let ySeriesNames: string[];

  if (!yAxisIdxField) {
    ySeriesNames = [];
  } else if (!Array.isArray(yAxisIdxField)) {
    // when using pie chart we drop isMultiple
    // so the field itself only takes on a single value
    ySeriesNames = [yAxisIdxField];
  } else {
    ySeriesNames = yAxisIdxField;
  }
  return ySeriesNames;
}

export const createColumnNames = (
  inputData: string[][],
  intl: InjectedIntl,
) => {
  const firstRow = inputData[0];

  if (!firstRow) {
    return [];
  }

  return firstRow.map((col, idx) => {
    if (col.length) {
      // if there was some text in the column heading, use
      // that as the column name
      return { label: col, value: String(idx) };
    }

    return {
      label: intl.formatMessage(i18n.defaultColumnName, { 0: idx + 1 }),
      value: String(idx),
    };
  });
};

/**
 * Reads the column data, skipping the header row.
 */
export const getColData = (table: string[][], userSelectedColumn: number) => {
  /* slice header row */
  return table.slice(1).map((row) => row[userSelectedColumn]);
};

// x-axis picker from column
// y-value is that column value
export const extractTableData = (
  inputData: string[][],
  parseNumber: ParseNumber,
): { [seriesName: string]: number | string | undefined }[] => {
  /* slice out heading row */
  const tableData = inputData.slice(1);

  // convert ['2012', '8', 'text', '121'] into
  // { 0: 2012, 1: 8, 2: 'text', 3: 121 }
  const namedTableData = tableData.map((dataRow, rowIdx) =>
    dataRow.reduce((namedData, colData, colIdx) => {
      if (colData.trim() === '') {
        namedData[colIdx] = undefined;
      } else {
        /* has content; try to parse as number, leaving as text otherwise */
        const val = parseNumber(colData);
        if (colData.length && val !== null) {
          namedData[colIdx] = val;
        } else {
          /* couldn't parse as number */
          namedData[colIdx] = colData;
        }
      }

      return namedData;
    }, {} as { [seriesName: string]: number | string | undefined }),
  );

  return namedTableData;
};

export const formatTableData = (
  tableData: { [seriesName: string]: number | string | undefined }[],
  xAxisSeriesKey: string,
  aggregateData?: boolean,
): { [seriesName: string]: number | string | undefined }[] => {
  let finalTableData = [...tableData];
  if (!aggregateData) {
    const uniqueSet = new Set();
    tableData.forEach((row) => {
      let uniqueValue = row[xAxisSeriesKey];
      let count = 2;
      while (uniqueSet.has(uniqueValue)) {
        uniqueValue = `${row[xAxisSeriesKey]} (${count})`;
        count = count + 1;
      }
      uniqueSet.add(uniqueValue);
      row[xAxisSeriesKey] = uniqueValue;
    });
    finalTableData = [...tableData];
  } else {
    const uniqueSet = new Set();
    tableData.forEach((row, idx) => {
      let uniqueValue = row[xAxisSeriesKey];
      if (uniqueSet.has(uniqueValue)) {
        const singleRow = finalTableData.find(
          (uniqueRow) => uniqueRow[xAxisSeriesKey] === row[xAxisSeriesKey],
        );
        for (const seriesName in singleRow) {
          if (seriesName !== xAxisSeriesKey) {
            singleRow[seriesName] =
              Number(singleRow[seriesName]) + Number(row[seriesName]);
          }
        }
        finalTableData.splice(idx, 1);
      } else {
        uniqueSet.add(uniqueValue);
      }
    });
  }
  return finalTableData;
};
