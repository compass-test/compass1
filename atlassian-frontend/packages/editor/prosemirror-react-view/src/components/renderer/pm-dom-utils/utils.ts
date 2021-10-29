import { Node as ProseMirrorNode } from 'prosemirror-model';

import { DOMUtils, WithProseMirrorDOMUtils } from './types';

function isNodeWithProseMirrorDOMUtils<T extends Node>(
  node: T,
): node is WithProseMirrorDOMUtils<T> {
  return Boolean(node) && Boolean((node as any).proseMirrorDOMUtils);
}

function isHTMLElement(node: Node): node is HTMLElement {
  return Boolean(node) && node.nodeType === 1;
}

export function getRootDOM(desc: DOMUtils<ProseMirrorNode>) {
  let rootDom: HTMLElement = desc.getDOM()!;
  const node = desc.getNode();

  for (const _ of node.marks) {
    rootDom = rootDom.closest('[data-prosemirror-mark]')! as HTMLElement;
  }

  return rootDom;
}

export function getProseMirrorUtils(
  node: Node,
): DOMUtils<ProseMirrorNode> | null {
  if (isNodeWithProseMirrorDOMUtils(node) && node.proseMirrorDOMUtils) {
    return node.proseMirrorDOMUtils;
  }

  // Is mark, need to find the closest node
  if (isHTMLElement(node) && node.dataset.prosemirrorMark) {
    const nodeElement = node.querySelector(
      '[data-prosemirror-node]',
    ) as WithProseMirrorDOMUtils<HTMLElement>;
    if (
      isNodeWithProseMirrorDOMUtils(nodeElement) &&
      nodeElement.proseMirrorDOMUtils
    ) {
      return nodeElement.proseMirrorDOMUtils;
    }
  }
  return null;
}

export const domIndex = function (_node: Node) {
  let node: Node | null = _node;
  for (let index = 0; ; index++) {
    node = node.previousSibling;
    if (!node) {
      return index;
    }
  }
};

// Current text lives in a Span, this helper allows to easy change getting text from node text if I remove the span
export function getTextNode(dom: Node): Node {
  return dom as Node;
}
