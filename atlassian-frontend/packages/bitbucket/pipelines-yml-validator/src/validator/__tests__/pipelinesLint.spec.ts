import { lintVariablesUtil, Pos } from '../pipelinesLint';

// Mock codemirror
class CodeMirror {
  lines = ['hello', 'this is my <parameter>', '<foo> <bar>'];
  getLine(lineNumber: any) {
    return this.lines[lineNumber];
  }

  lineCount() {
    return this.lines.length;
  }

  markText() {
    return;
  }
}

describe('pipelinesLint test', () => {
  let cm: CodeMirror;

  beforeEach(() => {
    cm = new CodeMirror();
  });

  it('should mark warnings correctly', () => {
    const severity = 'warning';
    const message =
      'You may have variables that need to be replaced with real values.';
    const expectedWarnings = [
      { from: new Pos(1, 11), to: new Pos(1, 22), severity, message },
      { from: new Pos(2, 0), to: new Pos(2, 5), severity, message },
      { from: new Pos(2, 6), to: new Pos(2, 11), severity, message },
    ];
    expect(lintVariablesUtil('', cm)).toEqual(expectedWarnings);
  });
});
