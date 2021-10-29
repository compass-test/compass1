import { SyntheticEvent } from 'react';

import { EditorState } from 'prosemirror-state';

import { PMEditorProps } from '../../types';
import { ReactEditorView } from '../editor/hooks/use-editor';

export const preventDefault = (e: SyntheticEvent) => {
  e.preventDefault();
};

export function someProp<T extends keyof PMEditorProps>(
  editorState: EditorState,
  propName: T,
  cb: (prop: Exclude<PMEditorProps[T], null | undefined>) => any,
) {
  const plugins = editorState.plugins;
  if (plugins) {
    for (let i = 0; i < plugins.length; i++) {
      const plugin = plugins[i];
      const prop = (plugin.props as PMEditorProps)[propName];
      if (prop !== null && prop !== undefined) {
        const value = cb ? cb(prop!) : prop;
        if (value) {
          return value;
        }
      }
    }
  }
}

export function hasEditableTarget(
  editorView: ReactEditorView,
  target: Node,
): boolean {
  const rootElement = editorView.getRootElement();
  if (!rootElement) {
    return false;
  }

  return rootElement.contains(target);
}
