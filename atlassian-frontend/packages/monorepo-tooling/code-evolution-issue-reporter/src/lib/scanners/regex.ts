import { EOL } from 'os';

import { executeCommand } from '../util/shell';
import { relativeToRepositoryRoot } from '../util/repository';

import type { FileResult } from '../../types';

class Scanner {
  constructor(private command: string) {}

  search(): FileResult[] {
    const command = `git grep -n ${this.command}`;
    const result = executeCommand(command, `No matches for ${command}`);

    if (!result) {
      return [];
    }

    const filesToLines = new Map<string, number[]>();
    for (const searchMatch of result.split(EOL)) {
      const [file, line] = searchMatch.split(':');
      const relativeFile = relativeToRepositoryRoot(file);
      if (!filesToLines.has(relativeFile)) {
        filesToLines.set(relativeFile, []);
      }
      filesToLines.get(relativeFile)?.push(parseInt(line, 10));
    }

    return [...filesToLines.entries()].map(([file, lines]) => {
      return {
        name: file,
        lines: lines.map((line) => ({ from: line, to: line })),
      };
    });
  }
}

export class RegexScanner {
  private fileGlob: string = '';
  private matchers: string[] = [];

  forFilesMatchingGlob(fileGlob: string) {
    this.fileGlob = fileGlob;
    return this;
  }

  withMatchingRules(matchers: string[]) {
    this.matchers = matchers;
    return this;
  }

  private joinMatchersForGrep() {
    return this.matchers
      .map((match) => `-e ${JSON.stringify(match)}`)
      .join(' --or ');
  }

  private getFileFilter() {
    if (!this.fileGlob) {
      return '';
    }

    return ` -- ${JSON.stringify(this.fileGlob)}`;
  }

  build() {
    if (this.matchers.length === 0) {
      throw new Error(
        'Missing matchers. At least one matcher must be specified, otherwise there is nothing to look out for.',
      );
    }

    const command = this.joinMatchersForGrep() + this.getFileFilter();
    return new Scanner(command);
  }
}
