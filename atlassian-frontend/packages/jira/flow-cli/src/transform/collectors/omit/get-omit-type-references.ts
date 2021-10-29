import {
  Node,
  SyntaxKind,
  TypeReferenceNode,
  PropertySignatureStructure,
} from 'ts-morph';

import { mapIdentiferToTypeReferenceOfType } from '../map-identifier-to-type-reference-of-type';
import { notUndefined } from '../../../utils/type-helpers';
import { getPropertySignaturesForOmitTypeReferences } from './get-property-signatures-for-omit-type-references';
import { NameGenerator } from '../../../utils/name-generator';

type TransformData = {
  containsAllHTMLAttributes: boolean;
  node: Node;
  omitPropertySignatures?: PropertySignatureStructure[];
  name: string;
};

export type OmitReferences = Map<string, TransformData>;

const containsAllHTMLAttributes = (typeReferenceNode: TypeReferenceNode) => {
  const [leftReference] = typeReferenceNode.getTypeArguments();
  const qualifiedName = leftReference.getDescendantsOfKind(
    SyntaxKind.QualifiedName,
  );
  return qualifiedName.some((identifier) => {
    return identifier.getText().includes('AllHTMLAttributes');
  });
};

export const getOmitTypeReferences = (node: Node): OmitReferences => {
  const nameGenerator = NameGenerator('GENERATED$Omit$');

  const identifiers = node.getDescendantsOfKind(SyntaxKind.Identifier);

  const omitReferenceNodes = identifiers
    .map(mapIdentiferToTypeReferenceOfType('Omit'))
    .filter(notUndefined);

  return omitReferenceNodes.reduce<OmitReferences>((references, reference) => {
    references.set(reference.getText(), {
      node: reference,
      containsAllHTMLAttributes: containsAllHTMLAttributes(reference),
      omitPropertySignatures: getPropertySignaturesForOmitTypeReferences(
        reference,
      ),
      name: nameGenerator.getName(),
    });

    return references;
  }, new Map());
};
