/**
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/components/editable.tsx
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

import { useCallback, useLayoutEffect, useMemo } from 'react';

import throttle from 'lodash/throttle';

import { ReactEditorView } from '../../../editor/hooks/use-editor';
import { useEditorState } from '../../../editor/hooks/use-editor-state';
import { hasEditableTarget } from '../../utils';
import { isRangeEqual } from '../dom';
import { toDOMRange } from '../helpers/to-dom-range';
import { toProseMirrorSelection } from '../helpers/to-prosemirror-selection';

export const useSelectionChange = (editorView: ReactEditorView) => {
  const state = useMemo(
    () => ({
      isUpdatingSelection: false,
    }),
    [],
  );

  // this will cause a render on new selection
  const selection = useEditorState((state) => state.selection);

  // Whenever the editor updates, make sure the DOM selection state is in sync.
  /**
   * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/components/editable.tsx#L133-L179
   * Modifications by Atlassian
   */
  useLayoutEffect(() => {
    if (!selection) {
      return;
    }

    const domSelection = window.getSelection();

    if (!domSelection || !editorView.isFocused) {
      return;
    }

    const hasDomSelection = domSelection.type !== 'None';

    // If the DOM selection is properly unset, we're done.
    if (!selection && !hasDomSelection) {
      return;
    }

    const newDomRange = selection && toDOMRange(editorView, selection);

    // If the DOM selection is already correct, we're done.
    if (
      hasDomSelection &&
      newDomRange &&
      isRangeEqual(domSelection.getRangeAt(0), newDomRange)
    ) {
      return;
    }

    // Otherwise the DOM selection is out of sync, so update it.
    const el = editorView.getRootElement();
    state.isUpdatingSelection = true;
    domSelection.removeAllRanges();

    if (newDomRange) {
      domSelection.addRange(newDomRange);
      // scrollIntoView(leafEl, { scrollMode: 'if-needed' });
    }

    setTimeout(() => {
      // COMPAT: In Firefox, it's not enough to create a range, you also need
      // to focus the contenteditable element too. (2016/11/16)
      if (newDomRange && true) {
        if (el !== undefined) {
          el!.focus();
        }
      }
      state.isUpdatingSelection = false;
    });
  }, [editorView, selection, state]);

  /**
   * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/components/editable.tsx#L353-L400
   * Modifications by Atlassian
   */
  // Listen on the native `selectionchange` event to be able to update any time
  // the selection changes. This is required because React's `onSelect` is leaky
  // and non-standard so it doesn't fire until after a selection has been
  // released. This causes issues in situations where another change happens
  // while a selection is being dragged.

  // AFP-2511 TODO: Fix automatic suppressions below
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDOMSelectionChange = useCallback(
    throttle(() => {
      if (state.isUpdatingSelection) {
        return;
      }

      const domSelection = window.getSelection();
      const domRange =
        domSelection &&
        domSelection.rangeCount > 0 &&
        domSelection.getRangeAt(0);

      if (
        domRange &&
        hasEditableTarget(editorView, domRange.startContainer) &&
        hasEditableTarget(editorView, domRange.endContainer)
      ) {
        const selection = toProseMirrorSelection(editorView, domRange);
        editorView.dispatch(editorView.state.tr.setSelection(selection));
      }
    }, 100),
    [],
  );

  useLayoutEffect(() => {
    window.document.addEventListener('selectionchange', onDOMSelectionChange);

    return () => {
      window.document.removeEventListener(
        'selectionchange',
        onDOMSelectionChange,
      );
    };
  }, [onDOMSelectionChange]);
};
