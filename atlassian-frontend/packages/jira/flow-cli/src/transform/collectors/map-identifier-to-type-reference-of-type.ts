import { Identifier, SyntaxKind, TypeReferenceNode } from 'ts-morph';

export const mapIdentiferToTypeReferenceOfType = (type: 'Pick' | 'Omit') => (
  identifier: Identifier,
): TypeReferenceNode | undefined => {
  if (identifier.wasForgotten()) {
    return;
  }

  const identifierText = identifier.getText();

  if (identifierText !== type) {
    return;
  }

  const typeReference = identifier.getFirstAncestorByKind(
    SyntaxKind.TypeReference,
  );

  return typeReference;
};
