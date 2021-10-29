import { KeyboardEvent } from 'react';

import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

import {
  MarkComponentType,
  NodeComponentType,
} from './components/renderer/dom-serializer/types';

export type Command = (tr: Transaction) => void;

export interface PartialEditorView<S extends Schema = any> {
  state: EditorState<S>;
  dispatch: Command;
  endOfTextblock: () => boolean;
}

export type SchemaNodes<S extends Schema> = S extends Schema<infer N, any>
  ? N
  : never;
export type SchemaMarks<S extends Schema> = S extends Schema<any, infer M>
  ? M
  : never;

export interface PMEditorProps<S extends Schema = any> {
  handleKeyDown?:
    | ((view: PartialEditorView<S>, event: KeyboardEvent) => boolean)
    | null;
  /**
   * Handler for `keypress` events.
   */
  handleKeyPress?:
    | ((view: PartialEditorView<S>, event: KeyboardEvent) => boolean)
    | null;

  handleTextInput?:
    | ((
        view: PartialEditorView<S>,
        from: number,
        to: number,
        text: string,
      ) => boolean)
    | null;

  toReact?: {
    [P in SchemaNodes<S> | SchemaMarks<S>]: P extends SchemaNodes<S>
      ? NodeComponentType
      : MarkComponentType;
  };
}

export type ProseMirrorNodeWithId = ProseMirrorNode & { id?: number };
