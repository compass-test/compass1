import { ReactEditorView } from '../../editor/hooks/use-editor';
import { HasProseMirrorDOMUtils } from '../../renderer/pm-dom-utils/types';

export function getRenderer(
  editorView: ReactEditorView,
): HasProseMirrorDOMUtils<HTMLElement> {
  const rootElement = editorView.getRootElement();
  if (!rootElement) {
    throw new Error('Editor is not mounted');
  }

  const renderer: HasProseMirrorDOMUtils<
    HTMLElement
  > | null = rootElement.querySelector('[data-prosemirror-renderer]');

  if (!renderer) {
    throw new Error('The editor has to contain a renderer');
  }

  if (!renderer.proseMirrorDOMUtils) {
    throw new Error('The renderer has not been initialized');
  }

  return renderer;
}
