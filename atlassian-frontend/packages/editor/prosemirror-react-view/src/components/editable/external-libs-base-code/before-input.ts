/**
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/components/editable.tsx#L193-L328
 * Modifications by Atlassian
 */

/**
 * The MIT License
 * Copyright © 2016–2017, Ian Storm Taylor
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

import { RefObject, useCallback, useLayoutEffect } from 'react';

import {
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  splitBlock,
} from 'prosemirror-commands';
import { Selection as ProseMirrorSelection } from 'prosemirror-state';

import { useEditorView } from '../../editor/hooks/use-editor-view';
import { hasEditableTarget } from '../utils';

import { insertData } from './clipboard';
import { backspace, del } from './commands';
import { toProseMirrorSelection } from './helpers/to-prosemirror-selection';

function selectionIsExpanded(selection: ProseMirrorSelection): boolean {
  return selection.from !== selection.to;
}

export const useBeforeInput = (ref: RefObject<HTMLElement | null>) => {
  const editorView = useEditorView();
  // Listen on the native `beforeinput` event to get real "Level 2" events. This
  // is required because React's `beforeinput` is fake and never really attaches
  // to the real event sadly. (2019/11/01)
  // https://github.com/facebook/react/issues/11211
  const onDOMBeforeInput = useCallback(
    (
      event: Event & {
        data: string | null;
        dataTransfer: DataTransfer | null;
        getTargetRanges(): StaticRange[];
        inputType: string;
        isComposing: boolean;
      },
    ) => {
      if (hasEditableTarget(editorView, event.target as Node)) {
        const { selection } = editorView.state;
        const { inputType: type } = event;
        const data = event.dataTransfer || event.data || undefined;

        // These two types occur while a user is composing text and can't be
        // cancelled. Let them through and wait for the composition to end.
        if (
          type === 'insertCompositionText' ||
          type === 'deleteCompositionText'
        ) {
          return;
        }

        event.preventDefault();
        const tr = editorView.state.tr;
        // COMPAT: For the deleting forward/backward input types we don't want
        // to change the selection because it is the range that will be deleted,
        // and those commands determine that for themselves.
        if (!type.startsWith('delete') || type.startsWith('deleteBy')) {
          const [targetRange] = event.getTargetRanges();

          if (targetRange) {
            const mappedSelection = toProseMirrorSelection(
              editorView,
              targetRange,
            );

            if (!selection || !selection.eq(mappedSelection)) {
              tr.setSelection(mappedSelection);
            }
          }
        }

        // COMPAT: If the selection is expanded, even if the command seems like
        // a delete forward/backward command it should delete the selection.
        if (
          selection &&
          selectionIsExpanded(selection) &&
          type.startsWith('delete')
        ) {
          tr.deleteSelection();
          editorView.dispatch(tr);
          return;
        }

        switch (type) {
          case 'deleteByComposition':
          case 'deleteByCut':
          case 'deleteByDrag': {
            tr.deleteSelection();
            editorView.dispatch(tr);
            break;
          }

          case 'deleteContent':
          case 'deleteContentForward': {
            del(editorView.state, editorView.dispatch);
            break;
          }

          case 'deleteContentBackward': {
            backspace(editorView.state, editorView.dispatch);
            break;
          }

          case 'deleteEntireSoftLine': {
            // TODO
            // Editor.deleteBackward(editor, { unit: 'line' });
            // Editor.deleteForward(editor, { unit: 'line' });
            break;
          }

          case 'deleteHardLineBackward': {
            // TODO
            // Editor.deleteBackward(editor, { unit: 'block' });
            break;
          }

          case 'deleteSoftLineBackward': {
            // TODO
            // Editor.deleteBackward(editor, { unit: 'line' });
            break;
          }

          case 'deleteHardLineForward': {
            // TODO
            // Editor.deleteForward(editor, { unit: 'block' });
            break;
          }

          case 'deleteSoftLineForward': {
            // TODO
            // Editor.deleteForward(editor, { unit: 'line' });
            break;
          }

          case 'deleteWordBackward': {
            // TODO
            // Editor.deleteBackward(editor, { unit: 'word' });
            break;
          }

          case 'deleteWordForward': {
            // TODO
            // Editor.deleteForward(editor, { unit: 'word' });
            break;
          }

          case 'insertLineBreak':
          case 'insertParagraph': {
            chainCommands(
              newlineInCode,
              createParagraphNear,
              liftEmptyBlock,
              splitBlock,
            )(editorView.state, editorView.dispatch);
            break;
          }

          case 'insertFromComposition':
          case 'insertFromDrop':
          case 'insertFromPaste':
          case 'insertFromYank':
          case 'insertReplacementText':
          case 'insertText': {
            if (data instanceof DataTransfer) {
              insertData(data, tr, editorView.state);
            } else if (typeof data === 'string') {
              tr.insertText(data);
            }
            editorView.dispatch(tr);

            break;
          }
        }
      }
    },
    [editorView],
  );

  // Attach a native DOM event handler for `beforeinput` events, because React's
  // built-in `onBeforeInput` is actually a leaky polyfill that doesn't expose
  // real `beforeinput` events sadly... (2019/11/04)
  // https://github.com/facebook/react/issues/11211
  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      // @ts-ignore The `beforeinput` event isn't recognized.
      // TODO: Wait for typescript types support this new event
      currentRef.addEventListener('beforeinput', onDOMBeforeInput);
    }

    return () => {
      if (currentRef) {
        // @ts-ignore The `beforeinput` event isn't recognized.
        // TODO: Wait for typescript types support this new event
        currentRef.removeEventListener('beforeinput', onDOMBeforeInput);
      }
    };
  }, [onDOMBeforeInput, ref]);
};
