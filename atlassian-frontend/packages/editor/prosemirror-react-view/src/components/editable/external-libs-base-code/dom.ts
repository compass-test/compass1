/**
 * Originals:
 *  https://github.com/ianstormtaylor/slate/blob/26fbc1dc410b3c70a9274181899bffc0d361995e/packages/slate-react/src/components/editable.tsx
 *  https://github.com/ianstormtaylor/slate/blob/26fbc1dc410b3c70a9274181899bffc0d361995e/packages/slate-react/src/utils/dom.ts
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

/**
 * Types.
 */

/**
 * Check if a value is a DOM node.
 * Original: https://github.com/ianstormtaylor/slate/blob/26fbc1dc410b3c70a9274181899bffc0d361995e/packages/slate-react/src/utils/dom.ts#L47
 * Modifications by Atlassian
 */
const isDOMNode = (value: any): value is Node => {
  return value instanceof Node;
};

/**
 * Check if a DOM node is an element node.
 * Original: https://github.com/ianstormtaylor/slate/blob/26fbc1dc410b3c70a9274181899bffc0d361995e/packages/slate-react/src/utils/dom.ts#L39-L41
 * Modifications by Atlassian
 */
export const isDOMElement = (value: any): value is Element => {
  return isDOMNode(value) && value.nodeType === 1;
};
/**
 * Check if two DOM range objects are equal.
 * Original: https://github.com/ianstormtaylor/slate/blob/26fbc1dc410b3c70a9274181899bffc0d361995e/packages/slate-react/src/components/editable.tsx#L975-L986
 * Modifications by Atlassian
 */
export const isRangeEqual = (a: Range, b: Range) => {
  return (
    (a.startContainer === b.startContainer &&
      a.startOffset === b.startOffset &&
      a.endContainer === b.endContainer &&
      a.endOffset === b.endOffset) ||
    (a.startContainer === b.endContainer &&
      a.startOffset === b.endOffset &&
      a.endContainer === b.startContainer &&
      a.endOffset === b.startOffset)
  );
};
