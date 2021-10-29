import { SyntaxKind, Node, HeritageClause } from 'ts-morph';

export const getHeritageNodesIfValid = (
  definition: Node,
): HeritageClause[] | void => {
  const heritageNodes = definition.getDescendantsOfKind(
    SyntaxKind.HeritageClause,
  );

  const hasInvalidNode = heritageNodes.some(
    (heritageNode) =>
      heritageNode.getDescendantsOfKind(SyntaxKind.TypeReference).length > 0,
  );

  if (hasInvalidNode) {
    return;
  }

  return heritageNodes;
};
