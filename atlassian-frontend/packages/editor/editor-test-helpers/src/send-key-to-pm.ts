import { browser } from '@atlaskit/editor-common';
import { EditorView } from 'prosemirror-view';
import { TestingEditorView } from './types/prosemirror';
import keyCodes from './key-codes';
import { DocBuilder } from './doc-builder';
import { EditorFactory } from './selection';

export function buildKeyEvent(keys: string): KeyboardEvent {
  const event = new CustomEvent('keydown', {
    bubbles: true,
    cancelable: true,
  });
  (event as any).DOM_KEY_LOCATION_LEFT = 1;
  (event as any).DOM_KEY_LOCATION_RIGHT = 2;

  let parts = keys.split(/-(?!'?$)/);

  // set location property of event if Left or Right version of key specified
  let location = 0;
  const locationKeyRegex = /^(Left|Right)(Ctrl|Alt|Mod|Shift|Cmd)$/;
  parts = parts.map((part) => {
    if (part.search(locationKeyRegex) === -1) {
      return part;
    }
    const match = part.match(locationKeyRegex);
    if (!match) {
      throw new Error(
        'Impossible error whilst parsing key event (regex found but not matched)',
      );
    }
    const [, pLocation, pKey] = match;
    location =
      pLocation === 'Left'
        ? (event as any).DOM_KEY_LOCATION_LEFT
        : (event as any).DOM_KEY_LOCATION_RIGHT;
    return pKey;
  });

  const modKey = parts.indexOf('Mod') !== -1;
  const cmdKey = parts.indexOf('Cmd') !== -1;
  const ctrlKey = parts.indexOf('Ctrl') !== -1;
  const shiftKey = parts.indexOf('Shift') !== -1;
  const altKey = parts.indexOf('Alt') !== -1;
  const key = parts[parts.length - 1];

  // all of the browsers are using the same keyCode for alphabetical keys
  // and it's the uppercased character code in real world
  const code = keyCodes[key] ? keyCodes[key] : key.toUpperCase().charCodeAt(0);

  (event as any).key = key.replace(/Space/g, ' ');
  (event as any).shiftKey = shiftKey;
  (event as any).altKey = altKey;
  (event as any).ctrlKey = ctrlKey || (!browser.mac && modKey);
  (event as any).metaKey = cmdKey || (browser.mac && modKey);
  (event as any).keyCode = code;
  (event as any).which = code;
  (event as any).view = window;
  (event as any).location = location;

  return (event as any) as KeyboardEvent;
}

/**
 * Sends a key to ProseMirror content area, simulating user key press.
 * Accepts key descriptions similar to Keymap, i.e. 'Shift-Ctrl-L'
 */
export function sendKeyToPm(editorView: EditorView, keys: string) {
  // try {
  (editorView as TestingEditorView).dispatchEvent(buildKeyEvent(keys));
  // } catch (error) {
  // throw new Error(error.message || error.name);
  // }
}

export default sendKeyToPm;

export const testKeymap = (
  editorFactory: EditorFactory,
  before: DocBuilder,
  after: DocBuilder,
  keys: string[],
) => {
  const { editorView } = editorFactory(before);
  keys.forEach((key) => sendKeyToPm(editorView, key));
  expect(editorView.state).toEqualDocumentAndSelection(after);
};
