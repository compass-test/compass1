/**
 * Original: https://github.com/ProseMirror/prosemirror-commands/blob/c8c567fae0afa1dd6a0642365555786cad4de284/src/commands.js
 * Modifications by Atlassian
 */

/**
 * Copyright (C) 2015-2017 by Marijn Haverbeke <marijnh@gmail.com> and others
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
import {
  chainCommands,
  deleteSelection,
  joinBackward,
  joinForward,
  selectNodeBackward,
  selectNodeForward,
} from 'prosemirror-commands';

export const backspace = chainCommands(
  deleteSelection,
  joinBackward,
  selectNodeBackward,
);
export const del = chainCommands(
  deleteSelection,
  joinForward,
  selectNodeForward,
);
