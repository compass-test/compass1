/**
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/plugin/react-editor.ts
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

import {
  Selection as ProseMirrorSelection,
  TextSelection,
} from 'prosemirror-state';

import { ReactEditorView } from '../../../editor/hooks/use-editor';

import { toProseMirrorPosition } from './to-prosemirror-position';

/**
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/plugin/react-editor.ts#L441-L493
 * Modifications by Atlassian
 */
export function getProseMirrorRange(
  editor: ReactEditorView,
  domRange: Range | StaticRange | Selection,
): { anchor: number; head: number } {
  const el =
    domRange instanceof Selection
      ? domRange.anchorNode
      : domRange.startContainer;
  let anchorNode;
  let anchorOffset;
  let focusNode;
  let focusOffset;
  let isCollapsed;

  if (el) {
    if (domRange instanceof Selection) {
      anchorNode = domRange.anchorNode;
      anchorOffset = domRange.anchorOffset;
      focusNode = domRange.focusNode;
      focusOffset = domRange.focusOffset;
      isCollapsed = domRange.isCollapsed;
    } else {
      anchorNode = domRange.startContainer;
      anchorOffset = domRange.startOffset;
      focusNode = domRange.endContainer;
      focusOffset = domRange.endOffset;
      isCollapsed = domRange.collapsed;
    }
  }

  if (
    anchorNode == null ||
    focusNode == null ||
    anchorOffset == null ||
    focusOffset == null
  ) {
    throw new Error(`Cannot resolve a Slate range from DOM range: ${domRange}`);
  }

  const anchor = toProseMirrorPosition(editor, [anchorNode, anchorOffset]);
  const focus = isCollapsed
    ? anchor
    : toProseMirrorPosition(editor, [focusNode, focusOffset]);

  return { anchor, head: focus };
}

export function toProseMirrorSelection(
  editorView: ReactEditorView,
  range: Range | StaticRange | Selection,
): ProseMirrorSelection {
  const { head, anchor } = getProseMirrorRange(editorView, range);
  const selection = TextSelection.create(editorView.state.doc, anchor, head);
  return selection;
}
