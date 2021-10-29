import { SyntaxKind, Node, GetAccessorDeclaration } from 'ts-morph';

export const transformGettersToReadOnly = (statement: Node) => {
  const getAccessorDeclarations = statement.getDescendantsOfKind(
    SyntaxKind.GetAccessor,
  );

  getAccessorDeclarations.forEach(
    (getAccessorDeclaration: GetAccessorDeclaration) => {
      const AccessorType = getAccessorDeclaration.getReturnTypeNode();
      const AccessorName = getAccessorDeclaration.getName();

      if (AccessorType) {
        getAccessorDeclaration.replaceWithText(
          `readonly ${AccessorName}: ${AccessorType.getText()}`,
        );
      }
    },
  );
};
