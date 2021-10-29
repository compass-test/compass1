import * as ts from 'typescript';

export function findAncestor(
  node: ts.Node,
  callback: (element: ts.Node) => boolean | 'quit',
): ts.Node | undefined {
  while (node) {
    const result = callback(node);
    if (result === 'quit') {
      return undefined;
    } else if (result) {
      return node;
    }
    node = node.parent;
  }
  return undefined;
}
