import { Node, SyntaxKind, QualifiedName, Identifier } from 'ts-morph';

type TransformData = {
  type: Node;
  ref?: string;
};

export type ReactComponents = Map<Node, TransformData>;

const isQualifiedNameReactComponent = (qualifiedName: QualifiedName) =>
  ['React.MemoExoticComponent', 'React.ForwardRefExoticComponent'].some(
    (componentType) => componentType === qualifiedName?.getText(),
  );

const isIdentifierReactComponent = (identifier: Identifier) =>
  ['MemoExoticComponent', 'ForwardRefExoticComponent', 'SFC'].some(
    (componentType) => componentType === identifier?.getText(),
  );

export const getReactComponents = (target: Node): ReactComponents => {
  const typeReferences = target.getDescendantsOfKind(SyntaxKind.TypeReference);

  return typeReferences.reduce((result, typeReference) => {
    const qualifiedName = typeReference.getFirstChildByKind(
      SyntaxKind.QualifiedName,
    );
    const identifier = typeReference.getFirstChildByKind(SyntaxKind.Identifier);

    const isReactComponent =
      (qualifiedName && isQualifiedNameReactComponent(qualifiedName)) ||
      (identifier && isIdentifierReactComponent(identifier));

    if (isReactComponent) {
      result.set(typeReference, {
        type: typeReference.getTypeArguments()[0],
      });
    }

    return result;
  }, new Map());
};
