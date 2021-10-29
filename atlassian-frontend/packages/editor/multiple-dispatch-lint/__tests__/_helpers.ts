import * as ts from 'typescript';

export function generateProgramFileFromString({
  sourceCode,
  fileName = 'test.ts',
}: {
  sourceCode: string;
  fileName?: string;
}) {
  const options = {};
  type File = {
    fileName: string;
    content: string;
    sourceFile?: any;
  };
  const file: File = { fileName, content: sourceCode };

  const compilerHost = ts.createCompilerHost(options);
  compilerHost.getSourceFile = (fileName: string) => {
    file.sourceFile =
      file.sourceFile ||
      ts.createSourceFile(fileName, file.content, ts.ScriptTarget.ES2015, true);
    return file.sourceFile;
  };
  const program = ts.createProgram([file.fileName], options, compilerHost);

  return {
    program,
    fileName,
  };
}
