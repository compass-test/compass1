import { isNodeSelection, safeInsert } from 'prosemirror-utils';

import { EditorActions } from '@atlaskit/editor-core';

import { processRawValue } from '../../external/processRawValue';
import { focusOnElement, selectFocusedInput } from '../helpers/focusOnElement';

export const insertExtension = (
  editorActions: EditorActions,
  extension: any,
  topLevel: boolean,
): boolean | undefined => {
  if (!editorActions) {
    // eslint-disable-next-line no-console
    console.debug('Cannot insert question because no editor is available');
    return undefined;
  }
  const editorView = editorActions._privateGetEditorView();
  if (!editorView) {
    // eslint-disable-next-line no-console
    console.debug('Cannot insert question because no editor view is available');
    return undefined;
  }

  const { selection, schema, tr } = editorView.state;

  const isQuestionExtension = extension.attrs?.extensionKey === 'question';
  const isSectionExtension = extension.attrs?.extensionKey === 'section';

  // By default we insert new extensions below the current selection
  let insertPosition: number = selection.$from.pos + 1;
  let tryToReplaceCurrentSelection = false;

  if (isSectionExtension) {
    // If we're at the right depth and on an empty line insert it at the current position
    if (
      !isNodeSelection(selection) &&
      selection.$anchor.depth === 1 &&
      selection.$anchor.parentOffset === 0
    ) {
      insertPosition = selection.$from.pos;
      tryToReplaceCurrentSelection = true;
    } else {
      // otherwise insert it below
      insertPosition = selection.$to.after(1);
    }
  }

  if (isQuestionExtension) {
    if (!isNodeSelection(selection)) {
      insertPosition = selection.$from.pos;
      tryToReplaceCurrentSelection = true; // safeInsert() will handle replacing the paragraph node if it is empty or inserting below it if it has text.
    }
  }

  const newNode = processRawValue(schema, extension);
  if (!newNode) {
    // eslint-disable-next-line no-console
    console.debug('Unable to create a new node for the extension: ', extension);
    return undefined;
  }

  // Insert the new node into the document
  editorView.dispatch(
    safeInsert(
      newNode,
      insertPosition,
      tryToReplaceCurrentSelection,
    )(tr).scrollIntoView(),
  );

  // Focus on label field if inserted extension is question
  if (isQuestionExtension) {
    focusOnElement('question-sidebar-label').then(selectFocusedInput);
  }

  return true;
};
