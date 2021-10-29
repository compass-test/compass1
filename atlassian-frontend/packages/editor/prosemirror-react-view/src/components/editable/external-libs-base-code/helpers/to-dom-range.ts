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
 */
import { ResolvedPos } from 'prosemirror-model';
import { Selection as ProseMirrorSelection } from 'prosemirror-state';

import { ReactEditorView } from '../../../editor/hooks/use-editor';
import { getRenderer } from '../../helpers/renderer';

/**
 * Find a native DOM selection point from a Slate point.
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/plugin/react-editor.ts#L207-L257
 * Modifications by Atlassian
 */

function toDOMPoint(
  editorView: ReactEditorView,
  $pos: ResolvedPos,
): [Node, number] {
  const renderer = getRenderer(editorView);
  const { element, offset } = renderer.proseMirrorDOMUtils.domFromPos($pos.pos);
  return [element, offset];
}

/**
 * Find a native DOM range from a Slate `range`.
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/plugin/react-editor.ts#L259-L276
 * Modifications by Atlassian
 */

export function toDOMRange(
  editorView: ReactEditorView,
  selection: ProseMirrorSelection,
): Range {
  const { $anchor, $head } = selection;
  const domAnchor = toDOMPoint(editorView, $anchor);
  const domFocus = !$head ? domAnchor : toDOMPoint(editorView, $head);

  const domRange = window.document.createRange();
  const start = domAnchor;
  const end = domFocus;
  domRange.setStart(start[0], start[1]);
  domRange.setEnd(end[0], end[1]);
  return domRange;
}
