import { SyntaxKind, Node, SetAccessorDeclaration } from 'ts-morph';

export const transformSettersToClassProperties = (statement: Node) => {
  const setAccessorDeclarations = statement.getDescendantsOfKind(
    SyntaxKind.SetAccessor,
  );

  setAccessorDeclarations.forEach(
    (setAccessorDeclaration: SetAccessorDeclaration) => {
      const parameter = setAccessorDeclaration.getDescendantsOfKind(
        SyntaxKind.Parameter,
      )[0];

      const parameterType = parameter.getTypeNode();
      const AccessorName = setAccessorDeclaration.getName();
      if (parameterType) {
        setAccessorDeclaration.replaceWithText(
          `${AccessorName}: ${parameterType.getText()}`,
        );
      }
    },
  );
};
