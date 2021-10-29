import { useContext } from 'react';

import { ReactEditorViewContext } from '../context';

import { ReactEditorView } from './use-editor';

export const useEditorView = (): ReactEditorView => {
  const editorView = useContext(ReactEditorViewContext);
  if (!editorView) {
    throw new Error(
      'You are trying to use the editor view without the editor instance',
    );
  }
  return editorView;
};
