import {
  ComponentType,
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithChildren,
  Ref,
} from 'react';

import { Mark, Node as ProsemirrorNode, Schema } from 'prosemirror-model';

export interface NodeComponentAttrs {
  'data-prosemirror-node'?: boolean;
  // 'data-prosemirror-block'?: boolean;
  // 'data-prosemirror-inline'?: boolean;
  // 'data-prosemirror-text'?: boolean;
  // 'data-prosemirror-leaf'?: boolean;
}

export interface NodeRefs {
  root: Ref<HTMLElement>;
  content: Ref<HTMLElement>;
}

export interface NodeComponentProps<S extends Schema = any> {
  node: ProsemirrorNode<S>;
  ref: Ref<HTMLElement>;
  refs: NodeRefs;
  attrs: NodeComponentAttrs;
  getPos: () => number;
}

export interface MarkComponentProps<S extends Schema = any> {
  mark: Mark<S>;
  inline: boolean;
  attrs: {
    'data-prosemirror-mark': boolean;
  };
}

export interface DOMSerializer<S extends Schema = any> {
  getNodeComponent(
    node: ProsemirrorNode<S>,
  ): ForwardRefExoticComponent<PropsWithChildren<NodeComponentProps<S>>>;

  getMarkComponent(mark: Mark<S>): FunctionComponent<MarkComponentProps<S>>;
}

export type ToReact<T extends Mark | ProsemirrorNode> = T extends Mark
  ? MarkComponentType
  : NodeComponentType;
export type PropsWithNode<P> = P & NodeComponentProps;
export type PropsWithMark<P> = P & MarkComponentProps;
export type NodeComponentType = ForwardRefExoticComponent<NodeComponentProps>;
export type MarkComponentType<P = {}> = ComponentType<PropsWithMark<P>>;
