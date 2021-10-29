// Ported from src/packages/portfolio-3/portfolio/src/app-simple-plans/query/scope/index.js

import compose from 'lodash/fp/compose';
import escapeRegExp from 'lodash/fp/escapeRegExp';
import filter from 'lodash/fp/filter';
import split from 'lodash/fp/split';

export const splitRegExp = (searchQuery: string) =>
  new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi');

export const splitString = (searchQuery: string, summary: string): string[] =>
  compose(
    filter((string) => !!string),
    split(splitRegExp(searchQuery)),
  )(summary);

export default splitString;
