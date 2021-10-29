/**
 * Original: https://github.com/ProseMirror/prosemirror-view/blob/af9b9be021eddb317196a1dc5ff9c2c1ee8720b5/src/viewdesc.js
 * Modifications by Atlassian
 */

/**
 * Copyright (C) 2015-2017 by Marijn Haverbeke <marijnh@gmail.com> and others
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

import { Node as ProseMirrorNode } from 'prosemirror-model';

import { DOMUtils, WithProseMirrorDOMUtils } from './types';
import {
  domIndex,
  getProseMirrorUtils,
  getRootDOM,
  getTextNode,
} from './utils';

/**
 * Class that implement the same methods from ProseMirror ViewDesc.
 * Most of the code is just adaptation of the original implementation to the React Architecture.
 * Original: https://github.com/ProseMirror/prosemirror-view/blob/884d98deadacd5531bff2e84286e08a4b16e52d4/src/viewdesc.js#L91
 * Modifications by Atlassian
 */
export class ProseMirrorDOMUtils implements DOMUtils<ProseMirrorNode> {
  private node: ProseMirrorNode;
  private parent?: DOMUtils<ProseMirrorNode>;
  private readonly children: WeakMap<
    ProseMirrorNode,
    DOMUtils<ProseMirrorNode>
  > = new WeakMap<ProseMirrorNode, DOMUtils<ProseMirrorNode>>();

  private dom: WithProseMirrorDOMUtils<HTMLElement> | undefined;
  private contentDOM: HTMLElement | undefined;

  constructor(node: ProseMirrorNode, parent?: DOMUtils<ProseMirrorNode>) {
    this.node = node;
    this.parent = parent;
  }

  get border() {
    return this.node.isBlock ? 1 : 0;
  }

  get size() {
    return this.node.nodeSize;
  }

  get posBefore() {
    return this.parent!.posBeforeChild(this.getNode());
  }

  get posAtStart() {
    return this.parent
      ? this.parent.posBeforeChild(this.getNode()) + this.border
      : 0;
  }

  get posAfter() {
    return this.posBefore + this.size;
  }

  get posAtEnd() {
    return this.posAtStart + this.size - 2 * this.border;
  }

  setNode(node: ProseMirrorNode): void {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.node = node;

    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  getNode(): ProseMirrorNode {
    return this.node;
  }

  getDOM() {
    return this.dom;
  }

  setDOM(dom: WithProseMirrorDOMUtils<HTMLElement>) {
    if (dom !== this.dom) {
      this.dom = dom;
      this.dom.proseMirrorDOMUtils = this;
    }
  }

  getParent(): DOMUtils<ProseMirrorNode> | undefined {
    return this.parent;
  }

  setParent(parent: DOMUtils<ProseMirrorNode> | undefined): void {
    this.parent = parent;
  }

  getPos(): number {
    if (this.parent !== undefined) {
      return this.parent.posBeforeChild(this.node) + this.border;
    }
    // If is root return
    return 0;
  }

  posBeforeChild(child: ProseMirrorNode<any>): number {
    const posAtStart: number = this.parent
      ? this.parent.posBeforeChild(this.node) + this.border
      : 0;

    const length = this.node.childCount;
    for (let i = 0, pos = posAtStart; i < length; i++) {
      const cur = this.node.child(i);
      if (cur === child) {
        return pos;
      }
      pos += cur.nodeSize;
    }
    throw new Error('Cannot find child from the given node');
  }

  addChild(child: DOMUtils<ProseMirrorNode>): void {
    this.children.set(child.getNode(), child);
  }

  removeChild(child: DOMUtils<ProseMirrorNode>): void {
    this.children.delete(child.getNode());
  }

  private childrenAt(index: number): DOMUtils<ProseMirrorNode> {
    return this.children.get(this.node.child(index))!;
  }
  // Based on prosemirror view implementation, adapted to our arch.
  domFromPos(pos: number): { element: Node; offset: number } {
    if (!this.dom) {
      throw new Error(
        'You are trying to get the DOM before React has rendered it.',
      );
    }

    if (this.node.isText) {
      return {
        element: getTextNode(this.dom),
        offset: pos,
      };
    }

    if (this.node.isInline) {
      return {
        element: this.dom,
        offset: 0,
      };
    }

    for (let offset = 0, i = 0; ; i++) {
      if (offset === pos) {
        let rootDom: HTMLElement;
        while (
          i < this.node.childCount &&
          (rootDom = getRootDOM(this.childrenAt(i))) &&
          rootDom.parentNode !== this.contentDOM
        ) {
          i++;
        }
        return {
          element: this.contentDOM!,
          offset:
            i === this.node.childCount
              ? this.contentDOM!.childNodes.length
              : domIndex(rootDom!),
        };
      }

      if (i === this.node.childCount) {
        throw new Error('Invalid position ' + pos);
      }
      const child = this.node.child(i);
      const end = offset + child.nodeSize;
      if (pos < end) {
        const childUtils = this.children.get(child)!; // TODO: handle errors
        return childUtils.domFromPos(pos - offset - childUtils.border);
      }
      offset = end;
    }
  }

  getContentDOM(): HTMLElement | undefined {
    return this.contentDOM;
  }

  setContentDOM(contentDOM: HTMLElement): void {
    this.contentDOM = contentDOM;
  }

  // Based on prosemirror view implementation, adapted to our arch.
  localPosFromDOM(_dom: Node, offset: number, bias?: number): number {
    let dom = _dom;

    let textNode;
    if (
      this.node.isText &&
      (textNode = getTextNode(this.contentDOM!)) &&
      textNode.nodeType === 3
    ) {
      return this.posAtStart + offset;
    }

    //Check if

    // If the DOM position is in the content, use the child desc after
    // it to figure out a position.
    if (
      this.contentDOM &&
      this.contentDOM.contains(dom.nodeType === 1 ? dom : dom.parentNode)
    ) {
      if (bias! < 0) {
        let domBefore: Node | null;
        let desc: DOMUtils<ProseMirrorNode>;
        if (dom === this.contentDOM) {
          domBefore = dom.childNodes[offset - 1];
        } else {
          while (dom.parentNode !== this.contentDOM) {
            dom = dom.parentNode!;
          }
          domBefore = dom.previousSibling!;
        }
        while (
          domBefore &&
          !(
            (desc = getProseMirrorUtils(domBefore)!) &&
            desc.getParent() === this
          )
        ) {
          domBefore = domBefore.previousSibling;
        }
        return domBefore
          ? this.posBeforeChild(desc!.getNode()) + desc!.size
          : this.posAtStart;
      } else {
        let domAfter: Node | null;
        let desc: DOMUtils<ProseMirrorNode>;
        if (dom === this.contentDOM) {
          domAfter = dom.childNodes[offset];
        } else {
          while (dom.parentNode !== this.contentDOM) {
            dom = dom.parentNode!;
          }
          domAfter = dom.nextSibling;
        }
        while (
          domAfter &&
          !(
            (desc = getProseMirrorUtils(domAfter)!) && desc.getParent() === this
          )
        ) {
          domAfter = domAfter.nextSibling;
        }
        return domAfter ? this.posBeforeChild(desc!.getNode()) : this.posAtEnd;
      }
    }
    return 0;
  }

  posFromDOM(dom: Node, offset: number, bias?: number): number {
    for (let scan: Node | null = dom; ; scan = scan!.parentNode) {
      if (!scan) {
        break;
      }
      const desc = getProseMirrorUtils(scan);
      if (desc) {
        return desc.localPosFromDOM(dom, offset, bias);
      }
    }
    throw new Error('DOM is not inside a Renderer.');
  }
}
