import {
  SyntaxKind,
  PropertySignatureStructure,
  Node,
  TypeReferenceNode,
} from 'ts-morph';

import { getDefinitionForIdentifier } from '../get-definition-for-node';
import { getHeritageNodesIfValid } from '../get-heritage-nodes-if-valid';
import { getDefinitionsFromHeritageClause } from '../get-definitions-from-heritage-clause';

const getPropertySignatureStructuresForOmit = (
  typeReference: TypeReferenceNode,
): PropertySignatureStructure[] | undefined => {
  const [typeNode, toBeOmitted] = typeReference.getTypeArguments();
  const identifier = typeNode.getFirstChildByKind(SyntaxKind.Identifier);

  const keyOfOperator = toBeOmitted.getDescendantsOfKind(
    SyntaxKind.TypeOperator,
  );
  const typeReferences = toBeOmitted.getDescendantsOfKind(
    SyntaxKind.TypeReference,
  );

  if (
    keyOfOperator.length > 0 ||
    typeReferences.length > 0 ||
    Node.isTypeReferenceNode(toBeOmitted)
  ) {
    return;
  }

  if (!identifier) {
    return;
  }

  const definition = getDefinitionForIdentifier(identifier);

  if (!definition) {
    return;
  }

  const heritageClause = getHeritageNodesIfValid(definition);

  if (!heritageClause) {
    return;
  }

  const inheritdefinitions = getDefinitionsFromHeritageClause(heritageClause);
  const definitions = [...inheritdefinitions, definition];

  const LiteralTypesToOmit = toBeOmitted.getDescendantsOfKind(
    SyntaxKind.StringLiteral,
  );

  const stringLiteralsToOmit = toBeOmitted.getChildrenOfKind(
    SyntaxKind.StringLiteral,
  );

  return definitions.flatMap((definition) => {
    if (!Node.isInterfaceDeclaration(definition)) {
      return [];
    }
    const properties = definition.getProperties();

    return properties
      .filter((property) => {
        const isOmitted = [...stringLiteralsToOmit, ...LiteralTypesToOmit].some(
          (stringLiteralToOmit) =>
            stringLiteralToOmit.getLiteralValue() === property.getName(),
        );

        return !isOmitted;
      })
      .map((property) => property.getStructure());
  });
};

export const getPropertySignaturesForOmitTypeReferences = (
  node: TypeReferenceNode,
) => {
  const propertySignatures = getPropertySignatureStructuresForOmit(node);

  return propertySignatures?.map((sig) => {
    if (sig.name.includes('-')) {
      sig.name = `'${sig.name}'`;
    }

    return sig;
  });
};
