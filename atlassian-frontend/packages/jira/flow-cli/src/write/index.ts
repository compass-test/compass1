import { writeImportsToFile } from './write-imports-to-file';
import { writeDefinitionsToFile } from './write-definitions-to-file';
import { SourceFile } from 'ts-morph';
import type { DefinitionsMap, ImportDeclarationsMap } from '../collect';

const write = (
  target: SourceFile,
  importDeclarations: ImportDeclarationsMap,
  definitions: DefinitionsMap,
) => {
  writeImportsToFile(target, importDeclarations);

  const namedImports = Array.from(
    importDeclarations,
  ).flatMap(([specifier, declaration]) =>
    declaration.getNamedImports().map((namedImport) => namedImport.getName()),
  );

  writeDefinitionsToFile(target, definitions, namedImports);
};

export default write;
