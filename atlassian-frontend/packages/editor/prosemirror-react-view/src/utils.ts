import { Node as ProsemirrorNode } from 'prosemirror-model';

import { ProseMirrorNodeWithId } from './types';

export function map<T>(
  node: ProsemirrorNode,
  fn: (node: ProseMirrorNodeWithId, offset: number, index: number) => T,
): T[] {
  const mappedContent: T[] = [];
  node.forEach((child, offset, index) =>
    mappedContent.push(fn(child, offset, index)),
  );
  return mappedContent;
}

let nodeKey = 0;
const nodeMap = new WeakMap<ProsemirrorNode<any>, number>();

export function getNodeKey(node: ProsemirrorNode<any>): number {
  const savedKey = nodeMap.get(node);

  if (typeof savedKey !== 'undefined') {
    return savedKey;
  }

  nodeMap.set(node, nodeKey++);
  return nodeKey;
}
