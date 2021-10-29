import { EditorState, PluginKey } from 'prosemirror-state';
import { ReferentialityPluginState } from '../types';

export const pluginKey = new PluginKey<ReferentialityPluginState>(
  'referentialityPlugin',
);
export const getPluginState = (
  state: EditorState,
): ReferentialityPluginState | undefined | null =>
  state && pluginKey.getState(state);
