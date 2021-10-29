import React, {
  Children,
  FunctionComponent,
  memo,
  PropsWithChildren,
} from 'react';

import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import { EditorContent } from '../editor-content';
import { DefaultDOMSerializer } from '../renderer/dom-serializer/default-dom-serializer';

import { ReactEditorViewContext } from './context';
import { useEditor } from './hooks/use-editor';

export interface EditorProps {
  schema: Schema;
  initialDoc?: ProseMirrorNode;
  plugins?: Plugin[];
}

const Editor: FunctionComponent<PropsWithChildren<EditorProps>> = ({
  schema,
  initialDoc,
  plugins,
  children,
}) => {
  const editorView = useEditor(schema, initialDoc, plugins);

  return (
    <ReactEditorViewContext.Provider value={editorView}>
      <DefaultDOMSerializer schema={schema} plugins={plugins}>
        {Children.count(children) > 0 ? children : <EditorContent />}
      </DefaultDOMSerializer>
    </ReactEditorViewContext.Provider>
  );
};
const EditorMemoized = memo(Editor);

export { EditorMemoized as Editor };
