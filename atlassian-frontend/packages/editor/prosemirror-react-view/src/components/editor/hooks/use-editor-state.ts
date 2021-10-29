import { useEffect, useState } from 'react';

import { EditorState } from 'prosemirror-state';

import { useEditorView } from './use-editor-view';

export function useEditorState<T>(
  mapState: (state: EditorState) => T,
): T | null {
  const editorView = useEditorView();
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    const unsubscribe = editorView.subscribe((editorState: EditorState) => {
      const newMappedState = mapState(editorState);
      if (newMappedState !== state) {
        setState(newMappedState);
      }
    });

    return () => unsubscribe();
  }, [editorView, mapState, state]);

  return state;
}
