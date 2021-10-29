import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useEditorView } from '../editor/hooks/use-editor-view';

import { useBeforeInput } from './external-libs-base-code/before-input';
import { useSelectionChange } from './external-libs-base-code/selection/use-selection-change';
import { useEventHandlers } from './use-event-handlers';

const Editable: FunctionComponent = ({ children }) => {
  const editorView = useEditorView();
  const ref = useRef<HTMLDivElement>(null);

  const eventHandlersProps = useEventHandlers();

  useEffect(() => {
    if (ref.current) {
      editorView.setRootElement(ref.current);
    }
  }, [editorView]);

  useBeforeInput(ref);
  useSelectionChange(editorView);

  return (
    <div
      className="ProseMirror"
      data-testid="prosemirror-react-view"
      contentEditable={true}
      suppressContentEditableWarning
      {...eventHandlersProps}
      onFocus={useCallback(() => {
        editorView.focus();
      }, [editorView])}
      onBlur={useCallback(() => {
        editorView.blur();
      }, [editorView])}
      ref={ref}
    >
      {children}
    </div>
  );
};

const EditableMemoized = memo(Editable) as FunctionComponent; // Memo create a weird component type that causes som types issues

export { EditableMemoized as Editable };
