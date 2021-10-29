import { ILintError, Options } from '../types';

import { EntityError, EntityWarning, YamlSyntaxError } from './entities';
import { default as validator } from './validator';

export class Pos {
  line: number;
  ch: number;

  constructor(line: number, ch: number) {
    this.line = line;
    this.ch = ch;
  }
}

export default function PipelinesLint(
  text: string,
  annotationsHelper: any,
  cm: any,
  options?: Options,
) {
  const found: ILintError[] = [];
  if (!text) {
    return found;
  }

  const errors = lintValidation(text, options);
  const warnings = lintVariables(text, cm);

  return found.concat(errors, warnings);
}

function lintValidation(text: string, options?: Options) {
  const errors = validator(text, options);
  const found: ILintError[] = [];
  for (const error of errors) {
    try {
      if (error instanceof EntityWarning) {
        const { start, end } = error.range;
        found.push({
          from: new Pos(start.line, start.ch),
          to: new Pos(end.line, end.ch),
          message: error.message,
          severity: 'warning',
        });
      } else if (error instanceof EntityError) {
        const { start, end } = error.range;
        found.push({
          from: new Pos(start.line, start.ch),
          to: new Pos(end.line, end.ch),
          message: error.message,
          severity: 'error',
        });
      } else if (error instanceof YamlSyntaxError) {
        found.push({
          from: new Pos(error.location.line, error.location.ch),
          message: error.message,
          severity: 'error',
        });
      }
    } catch (ignore) {} // tslint:disable-line
  }
  return found;
}

export function lintVariablesUtil(text: string, cm: any) {
  const found: ILintError[] = [];
  for (let line = 0, end = cm.lineCount(); line <= end; line++) {
    // Find variables that match <foo> syntax for each line in the editor
    const re = /<[^>]*>/g;
    const lineText = cm.getLine(line);
    let match = re.exec(lineText);
    while (match !== null) {
      const from = match.index;
      const to = match.index + match[0].length;

      // Mark warning
      found.push({
        from: new Pos(line, from),
        to: new Pos(line, to),
        message:
          'You may have variables that need to be replaced with real values.',
        severity: 'warning',
      });

      // Style variable
      cm.markText(
        { line, ch: from },
        { line, ch: to },
        { className: 'warning-style' },
      );

      match = re.exec(lineText);
    }
  }
  return found;
}

export function lintTasksUtil(text: string, cm: any) {
  const found: ILintError[] = [];
  for (let line = 0, end = cm.lineCount(); line <= end; line++) {
    const re = /- task:/g;
    const lineText = cm.getLine(line);
    let match = re.exec(lineText);
    while (match !== null) {
      const from = match.index;
      const to = match.index + match[0].length;

      // Mark warning
      found.push({
        from: new Pos(line, from),
        to: new Pos(line, to),
        message: `The 'task' keyword is deprecated. Use 'pipe' instead.`,
        severity: 'warning',
      });

      // Style variable
      cm.markText(
        { line, ch: from },
        { line, ch: to },
        { className: 'warning-style' },
      );

      match = re.exec(lineText);
    }
  }
  return found;
}

function lintVariables(text: string, cm: any) {
  let found: ILintError[] = [];
  cm.operation(() => {
    found = found
      .concat(lintVariablesUtil(text, cm))
      .concat(lintTasksUtil(text, cm));
  });
  return found;
}
