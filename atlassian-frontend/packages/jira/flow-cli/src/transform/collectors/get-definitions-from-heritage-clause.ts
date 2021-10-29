import { SyntaxKind, HeritageClause, Node } from 'ts-morph';
import { getDefinitionForIdentifier } from './get-definition-for-node';
import { notUndefined } from '../../utils/type-helpers';

export const getDefinitionsFromHeritageClause = (
  heritageNodes: HeritageClause[],
): Node[] => {
  return heritageNodes.flatMap((heritageNode) =>
    heritageNode
      .getTypeNodes()
      .map((typeNode) => typeNode.getFirstChildIfKind(SyntaxKind.Identifier))
      .filter(notUndefined)
      .map((identifier) => getDefinitionForIdentifier(identifier))
      .filter(notUndefined),
  );
};
