import { SourceFile, Node, SyntaxKind } from 'ts-morph';

type TransformData = {
  type: string;
};

export type ImportTypes = Map<Node, TransformData>;

export const getImportTypes = (target: SourceFile) => {
  const importTypes = target.getDescendantsOfKind(SyntaxKind.ImportType);
  const declarations = target.getExportedDeclarations();
  const importTypesMap: ImportTypes = new Map();
  importTypes.forEach((importType) => {
    const identifier = importType.getFirstChildByKind(SyntaxKind.Identifier);
    const type =
      identifier && declarations.has(identifier.getText())
        ? identifier.getText()
        : 'any';

    importTypesMap.set(importType, { type });
  });

  return importTypesMap;
};
