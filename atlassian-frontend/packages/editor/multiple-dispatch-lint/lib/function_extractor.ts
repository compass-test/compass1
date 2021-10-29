import * as ts from 'typescript';
import { findAncestor } from './find_ancestor';

const PROSEMIRROR_STATE_MODULE = 'prosemirror-state';
type Props = {
  checker: ts.TypeChecker;
};
export function createFunctionExtractor({ checker }: Props) {
  function resolveTypeNode(nodeType: ts.Node): ts.TypeNode | null {
    if (ts.isTypeReferenceNode(nodeType)) {
      const typeReferenceSymbol = checker.getSymbolAtLocation(
        nodeType.typeName,
      );
      if (!typeReferenceSymbol || !typeReferenceSymbol.declarations) {
        return null;
      }
      const typeAliasNode = typeReferenceSymbol.declarations[0];

      if (ts.isTypeAliasDeclaration(typeAliasNode)) {
        return typeAliasNode.type;
      } else if (ts.isImportSpecifier(typeAliasNode)) {
        const typeAt = checker.getTypeAtLocation(nodeType);

        if (!typeAt || !typeAt.symbol) {
          return null;
        }
        return resolveTypeNode(typeAt.symbol.declarations[0]);
      }
    } else if (ts.isFunctionTypeNode(nodeType)) {
      return nodeType;
    }

    return null;
  }

  function resolveTransactionType(
    nodeType: ts.TypeNode,
  ): ts.ImportDeclaration | null {
    if (
      !ts.isTypeReferenceNode(nodeType) ||
      nodeType.getText() !== 'Transaction'
    ) {
      return null;
    }

    const transactionTypeSymbol = checker.getSymbolAtLocation(
      nodeType.typeName,
    );
    if (!transactionTypeSymbol) {
      return null;
    }
    const declaration = transactionTypeSymbol.declarations[0];

    if (!declaration || !ts.isImportSpecifier(declaration)) {
      return null;
    }

    return (
      (findAncestor(
        declaration,
        ts.isImportDeclaration,
      ) as ts.ImportDeclaration) || null
    );
  }

  function isProseMirrorDispatchCallbackType(
    nodeType: ts.TypeNode | null | undefined,
  ): boolean {
    if (!nodeType) {
      return false;
    }

    if (ts.isFunctionTypeNode(nodeType)) {
      const returnType = nodeType.type;
      const isReturningVoid = ts.SyntaxKind.VoidKeyword === returnType.kind;
      if (!nodeType || nodeType.parameters.length !== 1) {
        return false;
      }
      const firstParameter = nodeType.parameters[0];

      if (!firstParameter || !firstParameter.type) {
        return false;
      }
      const transactionImportClause = resolveTransactionType(
        firstParameter.type,
      );
      if (!transactionImportClause) {
        return false;
      }

      return (
        isReturningVoid &&
        transactionImportClause.moduleSpecifier
          .getText()
          .includes(PROSEMIRROR_STATE_MODULE)
      );
    } else if (ts.isUnionTypeNode(nodeType)) {
      return nodeType.types.some(isProseMirrorDispatchCallbackType);
    } else if (ts.isTypeReferenceNode(nodeType)) {
      const resolvedType = resolveTypeNode(nodeType);

      if (resolvedType) {
        return isProseMirrorDispatchCallbackType(resolvedType);
      }
    }

    return false;
  }

  function findDispatchParameterFromArrowFunction(
    node: ts.ArrowFunction,
  ): ts.Symbol | null {
    const variableDeclarationNode = findAncestor(
      node,
      ts.isVariableDeclaration,
    ) as ts.VariableDeclaration;
    if (!variableDeclarationNode || !variableDeclarationNode.type) {
      return checkParameters(node.parameters);
    }

    const type = resolveTypeNode(variableDeclarationNode.type);

    if (!type || !ts.isFunctionTypeNode(type)) {
      return null;
    }

    const dispatchParameterIndex = type.parameters.findIndex(parameter =>
      isProseMirrorDispatchCallbackType(parameter.type),
    );

    if (
      dispatchParameterIndex < 0 ||
      !node.parameters ||
      !node.parameters[dispatchParameterIndex]
    ) {
      return null;
    }

    return (
      checker.getSymbolAtLocation(
        node.parameters[dispatchParameterIndex].name,
      ) || null
    );
  }

  function checkParameters(
    parameters: ts.NodeArray<ts.ParameterDeclaration>,
  ): ts.Symbol | null {
    for (let i = 0; i < parameters.length; i++) {
      const p = parameters[i];

      if (!p.type && ts.isIdentifier(p.name)) {
        const typeLocation = checker.getTypeAtLocation(p.name);
        if (!typeLocation.symbol) {
          continue;
        }

        const declaration = typeLocation.symbol.declarations[0];
        if (
          ts.isFunctionTypeNode(declaration) &&
          isProseMirrorDispatchCallbackType(declaration)
        ) {
          return checker.getSymbolAtLocation(p.name) || null;
        }

        continue;
      }

      if (!p.type) {
        continue;
      }

      let typeToCheck: ts.Node | null = resolveTypeNode(p.type);

      if (
        typeToCheck &&
        ts.isFunctionTypeNode(typeToCheck) &&
        isProseMirrorDispatchCallbackType(typeToCheck)
      ) {
        return checker.getSymbolAtLocation(p.name) || null;
      }
    }

    return null;
  }

  function findDispatchParameterFromFunction(
    node: ts.FunctionDeclaration | ts.FunctionExpression,
  ) {
    return checkParameters(node.parameters);
  }

  return function extractDispatchFromFunctionParameters(
    node: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression,
  ): ts.Symbol | null {
    if (!node || !node.parameters || node.parameters.length === 0) {
      return null;
    }

    if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node)) {
      return findDispatchParameterFromFunction(node);
    } else if (ts.isArrowFunction(node)) {
      return findDispatchParameterFromArrowFunction(node);
    }

    return null;
  };
}
