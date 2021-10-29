import { Node, SourceFile, Structure, VariableDeclarationKind } from 'ts-morph';
import { DefinitionsMap } from '../collect';

export const writeDefinitionsToFile = (
  file: SourceFile,
  definitions: DefinitionsMap,
  namedImports: string[],
) => {
  for (const [name, { node, isDefaultExport, isExported }] of definitions) {
    if (Node.isExportableNode(node)) {
      if (isDefaultExport) {
        node.setIsDefaultExport(isDefaultExport);
      } else {
        node.setIsExported(isExported);
      }
    }

    if (Node.isRenameableNode(node) && name !== 'default') {
      node.rename(name);
    }

    if (node.wasForgotten()) {
      continue;
    }

    if (
      Node.isInterfaceDeclaration(node) ||
      Node.isTypeAliasDeclaration(node)
    ) {
      if (namedImports.includes(node.getName())) {
        continue;
      }
    }

    if (Node.isInterfaceDeclaration(node)) {
      file.addInterface(node.getStructure());
    }

    if (Node.isTypeAliasDeclaration(node)) {
      file.addTypeAlias(node.getStructure());
    }

    if (Node.isClassDeclaration(node)) {
      if (isDefaultExport && !node.getStructure().name) {
        file.addClass({ ...node.getStructure(), name: 'DEFAULT' });
        continue;
      }

      file.addClass(node.getStructure());
    }

    if (Node.isEnumDeclaration(node)) {
      file.addEnum(node.getStructure());
    }

    if (Node.isFunctionDeclaration(node)) {
      const structure = node.getStructure();
      if (Structure.isFunction(structure)) {
        file.addFunction(structure);
      }
    }

    if (Node.isVariableDeclaration(node)) {
      const structure = node.getStructure();

      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Var,
        declarations: [structure],
        isExported: !isDefaultExport && isExported,
      });

      if (isDefaultExport) {
        file.addExportAssignment({
          isExportEquals: false,
          expression: node.getName(),
        });
      }
    }
    file.addStatements((writer) => writer.newLine());
  }
};

export default writeDefinitionsToFile;
