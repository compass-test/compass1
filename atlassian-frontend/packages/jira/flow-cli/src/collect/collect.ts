import {
  SyntaxKind,
  Node,
  ExportedDeclarations,
  ImportDeclaration,
  Identifier,
  ImportSpecifier,
} from 'ts-morph';
import { PathLike } from 'fs';
import { NameGenerator } from '../utils/name-generator';
import { getLogger } from '../utils/get-logger';

const log = getLogger('collect:');

export type DefinitionMeta = {
  node: Node;
  type: string;
  generatedName?: string;
  isDefaultExport: boolean;
  isExported: boolean;
  referencePath?: string;
};

export type DefinitionsMap = Map<string, DefinitionMeta>;
export type ImportDeclarationsMap = Map<string, ImportDeclaration>;

const nameGenerator = NameGenerator('RENAMED$');

interface ImportDeclarationData {
  moduleSpecifier: string;
  node: ImportSpecifier;
}

const isAtlassianFrontend = (moduleSpecifier: string) =>
  moduleSpecifier.startsWith('@atlaskit') ||
  moduleSpecifier.startsWith('@atlassian') ||
  moduleSpecifier.startsWith('@atlassiansox');

const lookupTypeImport = (moduleSpecifier: string, node: ImportSpecifier) => {
  if (moduleSpecifier.startsWith('.') || moduleSpecifier.startsWith('..')) {
    return;
  }

  if (isAtlassianFrontend(moduleSpecifier)) {
    const moduleSpecifierParts = moduleSpecifier.split('/');

    const scope = moduleSpecifierParts[0];
    const packageName = moduleSpecifierParts[1];

    return {
      moduleSpecifier: `${scope}/${packageName}`,
      node,
    };
  }

  return { moduleSpecifier, node };
};

const getImportDeclaration = (
  identifier: Identifier,
): ImportDeclarationData | void => {
  let importDeclarationData;
  identifier
    .getSymbol()
    ?.getDeclarations()
    ?.forEach((node) => {
      if (Node.isImportSpecifier(node)) {
        const moduleSpecifier = node
          .getImportDeclaration()
          .getModuleSpecifier()
          .getLiteralValue();

        // check if type exists for general packages
        importDeclarationData = lookupTypeImport(moduleSpecifier, node);
      }
    });
  return importDeclarationData;
};

const addImportDeclaration = (
  declaration: ImportDeclarationData,
  importDeclarations: ImportDeclarationsMap,
) => {
  const { moduleSpecifier, node } = declaration;
  const importDeclaration = importDeclarations.get(declaration.moduleSpecifier);
  if (importDeclaration) {
    const namedImportExists = importDeclaration
      ?.getNamedImports()
      .some((namedImport) => namedImport.getText() === node.getText());

    if (!namedImportExists) {
      importDeclaration?.addNamedImport(node.getStructure());
    }
    return;
  }

  importDeclarations.set(moduleSpecifier, node.getImportDeclaration());
};

const collectChildDefinitions = (
  exportedDeclarations: Node,
  definitionMap: DefinitionsMap,
  importDeclarations: ImportDeclarationsMap,
  scope: PathLike,
) => {
  const identifiers = exportedDeclarations.getDescendantsOfKind(
    SyntaxKind.Identifier,
  );

  identifiers.forEach((identifier) => {
    const definitions = identifier.getDefinitionNodes();

    definitions.forEach((node) => {
      const referencePath = node.getSourceFile().getDirectoryPath();
      if (
        referencePath.includes('@types/react') ||
        referencePath.includes('typescript/lib')
      ) {
        return;
      }
      const identifierName = identifier.getText();
      // @ts-ignore
      const nodeName = node.getName ? node.getName() : undefined;

      if (!nodeName) {
        return;
      }

      if (!referencePath.includes(scope.toString())) {
        const declaration = getImportDeclaration(identifier);

        if (declaration) {
          addImportDeclaration(declaration, importDeclarations);
        }
        return;
      }

      if (
        Node.isTypeAliasDeclaration(node) ||
        Node.isInterfaceDeclaration(node) ||
        Node.isVariableDeclaration(node) ||
        Node.isClassDeclaration(node) ||
        Node.isEnumDeclaration(node) ||
        Node.isFunctionDeclaration(node) ||
        Node.isVariableStatement(node)
      ) {
        const exisitingType = Array.from(definitionMap).find(
          ([, data]) => data.node.getText() === node.getText(),
        );
        const definitionForNode = definitionMap.get(nodeName);
        const typeAndIdentifierExist = exisitingType && definitionForNode;
        const nodeKindName = node.getKindName();

        if (typeAndIdentifierExist) {
          return;
        }

        // rename identifier if type already exists.
        if (exisitingType) {
          const existingNode = exisitingType[1].node;
          const existingNodeName =
            Node.isNameableNode(existingNode) && existingNode.getName();
          if (existingNodeName) {
            identifier.rename(existingNodeName);
          }
          return;
        }

        // if identifier name is already taken but type is different.
        let generatedName;
        if (!exisitingType && definitionForNode) {
          generatedName = `${identifierName}$${nameGenerator.getName()}`;
        }

        const finalName = generatedName || nodeName;

        identifier.rename(finalName);
        definitionMap.set(finalName, {
          node,
          type: nodeKindName,
          isDefaultExport: false,
          isExported: false,
          referencePath: referencePath,
        });

        collectChildDefinitions(node, definitionMap, importDeclarations, scope);
      }
    });
  });
};

export const collect = (
  declarations: ReadonlyMap<string, ExportedDeclarations[]>,
  definitions: DefinitionsMap,
  importDeclarations: ImportDeclarationsMap,
  scope: PathLike,
) => {
  for (const [definitionName, exportedDeclarations] of declarations) {
    const node = exportedDeclarations[0];
    if (!node) {
      continue;
    }
    const isDefaultExport = definitionName === 'default';
    definitions.set(definitionName, {
      node,
      type: node.getKindName(),
      isDefaultExport,
      isExported: true,
    });

    collectChildDefinitions(node, definitions, importDeclarations, scope);
  }
  log(`Definition names: ${Array.from(definitions.keys())}`);
};

export default collect;
