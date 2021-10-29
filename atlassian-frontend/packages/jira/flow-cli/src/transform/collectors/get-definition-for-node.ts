import { Identifier, SyntaxKind, Node } from 'ts-morph';
import { getLogger } from '../../utils/get-logger';

const log = getLogger('get-definition-for-node');

export const isValidPath = (definitionPath: string) =>
  !definitionPath.includes('node_modules/typescript');

export const getDefinitionForIdentifier = (
  identifier: Identifier,
): Node | undefined => {
  const definitions = identifier.getDefinitionNodes();

  if (definitions.length > 1) {
    log('more than one definitions found');
  }

  const definition = definitions[0];
  if (!definition) {
    return;
  }

  const definitionsFilePath = definition.getSourceFile().getFilePath();

  if (!isValidPath(definitionsFilePath)) {
    return;
  }
  return definition;
};
export const getDefinitionNodesForIdentifiersOfNode = (node: Node): Node[] => {
  const identifiers = node.getDescendantsOfKind(SyntaxKind.Identifier);

  return identifiers
    .map(getDefinitionForIdentifier)
    .filter((node): node is Node => node !== undefined);
};
