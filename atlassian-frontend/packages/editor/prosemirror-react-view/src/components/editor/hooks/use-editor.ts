import { useEffect, useRef, useState } from 'react';

import { Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { unstable_batchedUpdates } from 'react-dom';

export type Dispatch = (tr: Transaction) => void;

export interface ReactEditorView<S extends Schema = any> {
  state: EditorState<S>;
  isFocused: boolean;
  dispatch: Dispatch;
  subscribe: (sb: StateSubscription) => StateUnsubscribe;
  setRootElement: (element: HTMLElement) => void;
  getRootElement: () => HTMLElement | undefined;
  focus: () => void;
  blur: () => void;
}

export interface ReactEditorViewNullable {
  state: EditorState | null;
  dispatch: Dispatch;
}

export type StateSubscription = <S extends Schema = any>(
  state: EditorState<S>,
) => void;
type StateUnsubscribe = () => void;

export class EditorView<S extends Schema = any> implements ReactEditorView<S> {
  private listeners = new Set<StateSubscription>();
  private rootElement: HTMLElement | undefined;
  public isFocused = false;
  public state: EditorState;

  constructor(state: EditorState) {
    this.state = state;
  }

  dispatch = (tr: Transaction) => {
    if (this.state) {
      this.state = this.state.apply(tr);

      unstable_batchedUpdates(() => {
        this.notifySubscribers();
      });
    }
  };

  private notifySubscribers() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  subscribe(cb: StateSubscription) {
    cb(this.state);
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  getRootElement() {
    return this.rootElement;
  }

  setRootElement(element: HTMLElement) {
    this.rootElement = element;
  }

  blur() {
    const el = this.getRootElement();
    if (!el) {
      return;
    }
    this.isFocused = false;

    if (window.document.activeElement === el) {
      el.blur();
    }
  }
  focus() {
    const el = this.getRootElement();
    if (!el) {
      return;
    }
    this.isFocused = true;

    if (window.document.activeElement !== el) {
      el.focus({ preventScroll: true });
    }
  }
}

export const useEditor = <S extends Schema>(
  schema: S,
  initialDoc?: ProsemirrorNode<S>,
  plugins?: Plugin<any, S>[],
): ReactEditorView | null => {
  const [editorView, setEditorView] = useState<EditorView<S>>(
    new EditorView(EditorState.create({ schema, plugins, doc: initialDoc })),
  );
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    // New props has received
    setEditorView(
      new EditorView(EditorState.create({ schema, plugins, doc: initialDoc })),
    );
  }, [schema, plugins, initialDoc]);

  return editorView;
};
