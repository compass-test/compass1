import { SourceFile } from 'ts-morph';
import type { ImportDeclarationsMap } from '../collect';

export const writeImportsToFile = (
  file: SourceFile,
  importDeclarations: ImportDeclarationsMap,
) => {
  file.addImportDeclarations(
    Array.from(importDeclarations).map(([moduleSpecifier, declaration]) => {
      declaration.setIsTypeOnly(true);
      return { ...declaration.getStructure(), moduleSpecifier };
    }),
  );
};

export default writeImportsToFile;
