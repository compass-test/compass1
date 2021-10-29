import fs from 'fs';
import path from 'path';
import { getLogger } from '../utils/get-logger';
import prettier from 'prettier/standalone';
import parser from 'prettier/parser-babel';

import { Options } from 'prettier';

const log = getLogger('apply:custom-declarations:');
const prettierOptions: Options = {
  parser: 'babel',
  plugins: [parser],
};
export const prettify = (code: string) =>
  prettier.format(code, prettierOptions);

export function replaceWithCustomDeclaration(
  result: string,
  from: string,
  to: string,
): string {
  return prettify(result).replace(prettify(from), prettify(to));
}

export const applyCustomDeclarations = (customDeclarationsPath?: string) => (
  code: string,
) => {
  if (!customDeclarationsPath) {
    return code;
  }

  return fs
    .readdirSync(customDeclarationsPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .reduce((result, dirent, index) => {
      const from = fs
        .readFileSync(path.join(customDeclarationsPath, dirent.name, 'from.js'))
        .toString();
      const to = fs
        .readFileSync(path.join(customDeclarationsPath, dirent.name, 'to.js'))
        .toString();

      log('index:', index);
      log('from:', prettify(from));
      log('to:', prettify(to));

      return replaceWithCustomDeclaration(result, from, to);
    }, code);
};
