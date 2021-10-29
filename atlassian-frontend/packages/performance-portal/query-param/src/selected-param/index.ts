import {
  decodeDelimitedArray,
  encodeDelimitedArray,
} from 'serialize-query-params';

const DELIMITER = '+';
export const SelectedParam = {
  encode: (
    selected: { [key: string]: boolean } | null | undefined,
  ): string | null | undefined => {
    if (selected) {
      const array = Object.keys(selected).filter((key) => selected[key]);
      return encodeDelimitedArray(array, DELIMITER);
    }
    return undefined;
  },
  decode: (
    arrayStr: string | (string | null)[] | null | undefined,
  ): { [key: string]: boolean } | undefined => {
    const decoded = decodeDelimitedArray(arrayStr, DELIMITER);
    const selected: { [key: string]: boolean } = {};
    decoded?.forEach((item) => {
      if (item) {
        selected[item] = true;
      }
    });
    return Object.keys(selected).length === 0 ? undefined : selected;
  },
};
