import { EditorActions } from '@atlaskit/editor-core';
import { NodeSelection } from 'prosemirror-state';
import { getPluginState } from './plugins/plugin-key';

export const dataSourceResolver = (editorActions?: EditorActions) => {
  const state = editorActions?._privateGetEditorView()?.state;

  if (!state) {
    return null;
  }

  const selection = state.selection;
  if (selection instanceof NodeSelection) {
    const dataSourceId = selection.node.marks?.find(
      (mark) => mark.type === state.schema?.marks?.dataConsumer,
    )?.attrs?.sources[0];

    if (!dataSourceId) {
      return null;
    }

    const dataSourceProvider = getPluginState(state)?.dataSourceProvider;
    return dataSourceProvider?.get(dataSourceId);
  }
};
