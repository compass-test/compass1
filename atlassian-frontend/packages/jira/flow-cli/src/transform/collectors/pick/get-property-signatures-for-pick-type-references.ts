import {
  SyntaxKind,
  PropertySignature,
  PropertySignatureStructure,
  StructureKind,
  // Node,
  TypeReferenceNode,
} from 'ts-morph';

import { getDefinitionNodesForIdentifiersOfNode } from '../get-definition-for-node';
import { getPropertySignatureForKey } from './get-property-signature-for-key';

import { notUndefined } from '../../../utils/type-helpers';

const hasSignature = (key: string, signatures: PropertySignature[]): boolean =>
  signatures.some((signature) => signature.getName() === key);

const createAnySignature = (name: string): PropertySignatureStructure => ({
  name: name,
  type: 'any',
  kind: StructureKind.PropertySignature,
});

const getPropertySignatureStructuresForPick = (
  typeReference: TypeReferenceNode,
): PropertySignatureStructure[] | undefined => {
  const [typeNode, toBePicked] = typeReference.getTypeArguments();

  const definitions = getDefinitionNodesForIdentifiersOfNode(typeNode);
  const keyOfOperator = toBePicked.getChildrenOfKind(SyntaxKind.TypeOperator);
  const typeReferences = toBePicked.getChildrenOfKind(SyntaxKind.TypeReference);
  if (keyOfOperator.length > 0 || typeReferences.length > 0) {
    return;
  }
  const targetPropertyKeys = toBePicked.getDescendantsOfKind(
    SyntaxKind.StringLiteral,
  );

  const lookupSet = new Set();

  const propertySignatures = targetPropertyKeys
    .flatMap((key) => {
      const keyValue = key.getLiteralValue();

      return definitions.flatMap((definition) =>
        getPropertySignatureForKey(definition, keyValue),
      );
    })
    .filter(notUndefined)
    .filter((literal) => {
      const text = literal.getText();

      if (lookupSet.has(text)) {
        return false;
      }
      lookupSet.add(text);
      return true;
    });

  const propertySignatureStructures = propertySignatures.map(
    (propertySignature) => propertySignature.getStructure(),
  );

  const anyPropertySignatures: PropertySignatureStructure[] = targetPropertyKeys
    .map((key) => {
      const keyValue = key.getLiteralValue();
      if (!hasSignature(keyValue, propertySignatures)) {
        return createAnySignature(keyValue);
      }
    })
    .filter(notUndefined);

  return [...anyPropertySignatures, ...propertySignatureStructures];
};
export const getPropertySignaturesForPickTypeReferences = (
  typeReference: TypeReferenceNode,
): PropertySignatureStructure[] | undefined => {
  const propertySignatures = getPropertySignatureStructuresForPick(
    typeReference,
  );

  return propertySignatures?.map((sig) => {
    if (sig.name.includes('-')) {
      sig.name = `'${sig.name}'`;
    }

    return sig;
  });
};
