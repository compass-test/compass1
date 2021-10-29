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
import { ReactEditorView } from '../../../editor/hooks/use-editor';
import { getRenderer } from '../../helpers/renderer';

/**
 * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
 * Original: https://github.com/ianstormtaylor/slate/blob/16ff44d0566889a843a346215d3fb7621fc0ed8c/packages/slate-react/src/plugin/react-editor.ts#L364-L439
 * Modifications by Atlassian
 */

export function toProseMirrorPosition(
  editorView: ReactEditorView,
  domPoint: [Node, number],
): number {
  const renderer = getRenderer(editorView);
  const [node, offset] = domPoint;
  return renderer.proseMirrorDOMUtils.posFromDOM(node, offset);
}
