import {
  Node,
  SyntaxKind,
  TypeReferenceNode,
  PropertySignatureStructure,
} from 'ts-morph';

import { mapIdentiferToTypeReferenceOfType } from '../map-identifier-to-type-reference-of-type';
import { notUndefined } from '../../../utils/type-helpers';
import { getPropertySignaturesForPickTypeReferences } from './get-property-signatures-for-pick-type-references';
import { NameGenerator } from '../../../utils/name-generator';

type TransformData = {
  node: Node;
  containsAllHTMLAttributes: boolean;
  pickPropertySignatures: PropertySignatureStructure[] | undefined;
  name: string;
};

export type PickReferences = Map<string, TransformData>;

const containsAllHTMLAttributes = (typeReferenceNode: TypeReferenceNode) => {
  const [leftReference] = typeReferenceNode.getTypeArguments();
  const qualifiedName = leftReference.getDescendantsOfKind(
    SyntaxKind.QualifiedName,
  );
  return qualifiedName.some((identifier) => {
    return identifier.getText().includes('AllHTMLAttributes');
  });
};

export const getPickTypeReferences = (node: Node): PickReferences => {
  const nameGenerator = NameGenerator('GENERATED$Pick$');

  const identifiers = node.getDescendantsOfKind(SyntaxKind.Identifier);

  const pickReferenceNodes = identifiers
    .map(mapIdentiferToTypeReferenceOfType('Pick'))
    .filter(notUndefined);

  return pickReferenceNodes.reduce<PickReferences>((references, reference) => {
    references.set(reference.getText(), {
      node: reference,
      containsAllHTMLAttributes: containsAllHTMLAttributes(reference),
      pickPropertySignatures: getPropertySignaturesForPickTypeReferences(
        reference,
      ),
      name: nameGenerator.getName(),
    });

    return references;
  }, new Map());
};
