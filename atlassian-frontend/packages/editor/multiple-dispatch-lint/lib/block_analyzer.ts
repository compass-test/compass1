import * as ts from 'typescript';
import { findAncestor } from './find_ancestor';
import { BlockContentTree, DispatchCall, DispatchBorrowed } from '../types';
import {
  emptyBlockContentTree,
  flattenBlockContent,
} from './block_content_tree';

type Props = {
  checker: ts.TypeChecker;
  isSymbolProseMirrorDispatch: (symbol: ts.Symbol) => boolean;
};
export function createBlockAnalizer({
  checker,
  isSymbolProseMirrorDispatch,
}: Props) {
  function isBlockContentTreeEmpty(block: BlockContentTree) {
    return (
      block.actions.length === 0 &&
      block.blocks.length === 0 &&
      !block.elseBlock
    );
  }
  function checkDispatchTransactionIdentifier(node: ts.Identifier) {
    const identifierType = checker.getSymbolAtLocation(node);
    return identifierType && isSymbolProseMirrorDispatch(identifierType);
  }

  function isDispatchIdentifier(node: ts.Node): node is ts.Identifier {
    return Boolean(
      ts.isIdentifier(node) && checkDispatchTransactionIdentifier(node),
    );
  }

  function isAnotherFunctionBorrowingDispatch(
    functionScope: ts.Node,
    node: ts.Node,
  ): node is ts.Identifier {
    if (!isDispatchIdentifier(node)) {
      return false;
    }

    const callExpressionParent = findAncestor(
      node,
      ts.isCallExpression,
    ) as ts.CallExpression;

    // Make sure we are not checking the original parent function
    return Boolean(
      callExpressionParent && callExpressionParent.pos >= functionScope.pos,
    );
  }

  function isDispatchCallExpression(node: ts.Node): node is ts.CallExpression {
    return Boolean(
      ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        checkDispatchTransactionIdentifier(node.expression),
    );
  }

  function shouldCheckForBorrowing(node: ts.Node) {
    if (isDispatchCallExpression(node)) {
      return false;
    }

    return (
      node.getChildCount() > 0 &&
      (ts.isBlock(node) ||
        ts.isExpressionStatement(node) ||
        ts.isReturnStatement(node) ||
        ts.isIfStatement(node) ||
        ts.isCallExpression(node))
    );
  }

  function parseNodeToBlockContent(parentNode: ts.Node): BlockContentTree {
    if (ts.isIfStatement(parentNode)) {
      const ifExpression = parseNodeToBlockContent(parentNode.expression);
      const ifThenBlock = parseNodeToBlockContent(parentNode.thenStatement);

      if (parentNode.elseStatement) {
        ifThenBlock.elseBlock = parseNodeToBlockContent(
          parentNode.elseStatement,
        );
      }

      if (!isBlockContentTreeEmpty(ifExpression)) {
        ifThenBlock.blocks = [ifExpression, ...ifThenBlock.blocks];
      }

      return ifThenBlock;
    }

    const currentBlock: BlockContentTree = emptyBlockContentTree();

    ts.forEachChild(parentNode, childNode => {
      if (ts.isReturnStatement(childNode)) {
        currentBlock.hasReturn = true;
      } else if (isAnotherFunctionBorrowingDispatch(parentNode, childNode)) {
        currentBlock.actions.push(new DispatchBorrowed(childNode));
      } else if (isDispatchCallExpression(childNode)) {
        currentBlock.actions.push(new DispatchCall(childNode));
      }

      if (shouldCheckForBorrowing(childNode)) {
        const childBlock = parseNodeToBlockContent(childNode);

        if (!isBlockContentTreeEmpty(childBlock)) {
          currentBlock.blocks.push(childBlock);
        }
      }
    });

    return currentBlock;
  }

  return function analyzerFunctionBlock(parentNode: ts.Node) {
    const blockContent = parseNodeToBlockContent(parentNode);
    blockContent.hasReturn = true;

    return flattenBlockContent(blockContent);
  };
}
