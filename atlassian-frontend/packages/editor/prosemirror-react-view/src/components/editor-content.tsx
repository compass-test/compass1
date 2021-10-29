import React, { ComponentType, FunctionComponent, memo } from 'react';

import { Node as ProseMirrorNode } from 'prosemirror-model';

import { Editable } from './editable/editable';
import { useEditorState } from './editor/hooks/use-editor-state';
import { Renderer } from './renderer/renderer';

function withStateDoc(
  WrapperComponent: ComponentType<{ doc: ProseMirrorNode }>,
) {
  const WithStateDoc: FunctionComponent = memo(() => {
    const doc = useEditorState((state) => state.doc);
    if (!doc) {
      return null;
    }

    return <WrapperComponent doc={doc} />;
  });

  WithStateDoc.displayName = `withStateDoc(${WrapperComponent.displayName})`;

  return WithStateDoc;
}

const RendererWithDoc: FunctionComponent = withStateDoc(Renderer);

export const EditorContent: FunctionComponent = () => (
  <Editable>
    <RendererWithDoc />
  </Editable>
);
