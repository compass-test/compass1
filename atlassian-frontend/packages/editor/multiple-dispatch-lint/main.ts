import * as ts from 'typescript';
import * as glob from 'glob';
import * as path from 'path';
import { LintFlags } from './types';
import { checkSourceFile } from './lib/file_analyzer';
import { print } from './lib/printer';

function lintFiles(filesPath: string[]): void {
  let program = ts.createProgram(filesPath, {
    allowJs: true,
    jsx: ts.JsxEmit.React,
  });
  const flags =
    LintFlags.ONLY_ONE_BORROWING_ALLOWED |
    LintFlags.NO_CALL_AFTER_DISPATCH_LENT |
    LintFlags.NO_MULTIPLE_CALLS |
    LintFlags.NO_BORROW_AFTER_DISPATCH_WAS_USED;

  filesPath.forEach((fileName, index) => {
    const issues = checkSourceFile({
      program,
      fileName,
      flags,
    });
    print({
      issues,
      fileName,
      flags,
    });
  });
}

const paths = process.argv.slice(2);

const resolvedFilePaths = paths
  .map(p => {
    if (path.isAbsolute(p)) {
      return path.relative(__dirname, paths[0]);
    }

    return path.resolve('../../../', p);
  })
  .reduce<string[]>((acc, value) => {
    if (path.extname(value) !== '') {
      acc.push(value);
    } else {
      const files = glob.sync(path.join(value, '**/*.{ts,tsx}'));
      acc.push(...files);
    }

    return acc;
  }, []);

lintFiles(resolvedFilePaths);
