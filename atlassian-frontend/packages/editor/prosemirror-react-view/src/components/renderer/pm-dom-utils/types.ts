import { Node as ProseMirrorNode } from 'prosemirror-model';

export interface DOMUtils<T> {
  readonly border: number;
  readonly size: number;
  readonly posAtStart: number;

  setParent(parent: DOMUtils<T> | undefined): void;

  getParent(): DOMUtils<T> | undefined;

  setNode(node: T): void;

  getNode(): T;

  setDOM(dom: HTMLElement): void;

  getDOM(): HTMLElement | undefined;

  setContentDOM(dom: HTMLElement): void;

  getContentDOM(): HTMLElement | undefined;

  getPos(): number;

  posBeforeChild(child: T): number;

  addChild(child: DOMUtils<T>): void;

  removeChild(child: DOMUtils<T>): void;

  domFromPos(pos: number): { element: Node; offset: number };

  localPosFromDOM(dom: Node, offset: number, bias?: number): number;

  posFromDOM(dom: Node, offset: number, bias?: number): number;
}

export type WithProseMirrorDOMUtils<T> = T & {
  proseMirrorDOMUtils?: DOMUtils<ProseMirrorNode>;
};
export type HasProseMirrorDOMUtils<T> = T & {
  proseMirrorDOMUtils: DOMUtils<ProseMirrorNode>;
};
