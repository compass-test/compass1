export { default as getBytesSize } from './get-bytes-size';
export { default as getEstimatedTimeRange } from './get-estimated-time';

// from https://stackoverflow.com/questions/27194359/javascript-pluralize-a-string
// also ignore empty string
export const pluralize = (
  count: number,
  noun: string,
  suffixOrReplacement = 's',
  replace?: boolean,
) => {
  if (noun.length > 0 && count > 1) {
    return replace ? suffixOrReplacement : `${noun}${suffixOrReplacement}`;
  }
  return noun;
};

export const toTitleCase = (text: string) => {
  return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`;
};
