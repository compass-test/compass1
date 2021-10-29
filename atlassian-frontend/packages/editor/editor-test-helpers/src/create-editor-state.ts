import { EditorState, Plugin } from 'prosemirror-state';
import { DocBuilder } from './doc-builder';
import sampleSchema from './schema';
import { setSelectionTransform } from './utils/set-selection';

export function createEditorState(
  documentNode: DocBuilder,
  ...plugins: Plugin[]
) {
  const doc = documentNode(sampleSchema);
  const editorState = EditorState.create({
    doc,
    plugins,
  });
  const { tr } = editorState;
  setSelectionTransform(doc, tr);
  return editorState.apply(tr);
}
