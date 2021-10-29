import { KeyboardEvent, useCallback } from 'react';

import { useEditorView } from '../editor/hooks/use-editor-view';

import { someProp } from './utils';

export function useEventHandlers() {
  const editorView = useEditorView();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        someProp(editorView.state, 'handleKeyDown', (f) =>
          f(
            {
              state: editorView.state,
              dispatch: editorView.dispatch,
              endOfTextblock: () => false,
            },
            event,
          ),
        )
      ) {
        event.preventDefault();
      }
    },
    [editorView],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { $from, $to } = editorView.state.selection;
      const text = event.key;
      const handled = someProp(editorView.state, 'handleTextInput', (f) =>
        f(
          {
            state: editorView.state,
            dispatch: editorView.dispatch,
            endOfTextblock: () => false,
          },
          $from.pos,
          $to.pos,
          text,
        ),
      );

      if (handled) {
        event.preventDefault();
      }
    },
    [editorView],
  );

  return {
    // TODO: Improve
    onKeyDown: handleKeyDown,
    onKeyPress: handleKeyPress,
    // TODO: Implement
    // onDragOver,
    // onDragStart,
    // onDrop,
  };
}
