import { SourceFile, SyntaxKind } from 'ts-morph';

export const getLastImportPosition = (file: SourceFile) => {
  const lastImport = file.getLastChildByKind(SyntaxKind.ImportDeclaration);

  if (lastImport) {
    return lastImport.getChildIndex() + 1;
  }

  return 0;
};
