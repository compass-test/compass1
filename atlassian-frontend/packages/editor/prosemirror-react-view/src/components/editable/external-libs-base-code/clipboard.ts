/**
 * Original: https://github.com/ProseMirror/prosemirror-view/blob/af9b9be021eddb317196a1dc5ff9c2c1ee8720b5/src/clipboard.js
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
 */
import {
  DOMParser,
  Fragment,
  NodeType,
  Node as ProseMirrorNode,
  ResolvedPos,
  Slice,
} from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';

function sliceSingleNode(slice: Slice) {
  return slice.openStart === 0 &&
    slice.openEnd === 0 &&
    slice.content.childCount === 1
    ? slice.content.firstChild
    : null;
}

export const insertData = (
  data: DataTransfer,
  tr: Transaction,
  state: EditorState,
) => {
  const html = data.getData('text/html');
  const text = data.getData('text/plain');
  if (data && (html || text || data.files.length)) {
    const slice = parseFromClipboard(
      state,
      text,
      html,
      false,
      tr.selection.$from,
    );

    const singleNode = sliceSingleNode(slice!);
    if (singleNode) {
      tr.replaceSelectionWith(singleNode, false);
    } else {
      tr.replaceSelection(slice!);
    }

    return tr.scrollIntoView().setMeta('paste', true);
  }
};

//
// Trick from jQuery -- some elements must be wrapped in other
// elements for innerHTML to work. I.e. if you do `div.innerHTML =
// "<td>..</td>"` the table cells are ignored.
const wrapMap = {
  thead: ['table'],
  tbody: ['table'],
  tfoot: ['table'],
  caption: ['table'],
  colgroup: ['table'],
  col: ['table', 'colgroup'],
  tr: ['table', 'tbody'],
  td: ['table', 'tbody', 'tr'],
  th: ['table', 'tbody', 'tr'],
};

let _detachedDoc: Document | null = null;
function detachedDoc() {
  return (
    _detachedDoc ||
    (_detachedDoc = document.implementation.createHTMLDocument('title'))
  );
}

function readHTML(html: string): HTMLElement {
  const metas = /(\s*<meta [^>]*>)*/.exec(html);
  if (metas) {
    html = html.slice(metas[0].length);
  }
  let elt: HTMLElement = detachedDoc().createElement('div');
  const firstTag = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(html) as string[];
  let wrap: string[];
  let depth = 0;
  // @ts-ignore
  // TODO: Check type
  if ((wrap = firstTag && wrapMap[firstTag[1].toLowerCase()])) {
    html =
      wrap.map((n) => '<' + n + '>').join('') +
      html +
      wrap
        .map((n) => '</' + n + '>')
        .reverse()
        .join('');
    depth = wrap.length;
  }
  elt.innerHTML = html;
  for (let i = 0; i < depth; i++) {
    elt = elt.firstChild as HTMLElement;
  }
  return elt;
}

function addContext(slice: Slice, context: any) {
  if (!slice.size) {
    return slice;
  }
  let schema = slice.content.firstChild!.type.schema,
    array;
  try {
    array = JSON.parse(context);
  } catch (e) {
    return slice;
  }
  let { content, openStart, openEnd } = slice;
  for (let i = array.length - 2; i >= 0; i -= 2) {
    const type = schema.nodes[array[i]];
    if (!type || type.hasRequiredAttrs()) {
      break;
    }
    content = Fragment.from(type.create(array[i + 1], content));
    openStart++;
    openEnd++;
  }
  return new Slice(content, openStart, openEnd);
}

function withWrappers(node: ProseMirrorNode, wrap: NodeType[], from = 0) {
  for (let i = wrap.length - 1; i >= from; i--) {
    node = wrap[i].create(null, Fragment.from(node));
  }
  return node;
}

// // Used to group adjacent nodes wrapped in similar parents by
// // normalizeSiblings into the same parent node
function addToSibling(
  wrap: NodeType[],
  lastWrap: NodeType[],
  node: ProseMirrorNode,
  sibling: ProseMirrorNode,
  depth: number,
): ProseMirrorNode | undefined {
  if (
    depth < wrap.length &&
    depth < lastWrap.length &&
    wrap[depth] === lastWrap[depth]
  ) {
    const inner = addToSibling(
      wrap,
      lastWrap,
      node,
      sibling.lastChild!,
      depth + 1,
    );
    if (inner) {
      return sibling.copy(
        sibling.content.replaceChild(sibling.childCount - 1, inner),
      );
    }
    const match = sibling.contentMatchAt(sibling.childCount);
    if (
      match.matchType(depth === wrap.length - 1 ? node.type : wrap[depth + 1])
    ) {
      return sibling.copy(
        sibling.content.append(
          Fragment.from(withWrappers(node, wrap, depth + 1)),
        ),
      );
    }
  }
}

//
function closeRight(node: ProseMirrorNode, depth: number): ProseMirrorNode {
  if (depth === 0) {
    return node;
  }
  const fragment = node.content.replaceChild(
    node.childCount - 1,
    closeRight(node.lastChild!, depth - 1),
  );
  const fill = node
    .contentMatchAt(node.childCount)
    .fillBefore(Fragment.empty, true);
  return node.copy(fragment.append(fill!));
}

// Takes a slice parsed with parseSlice, which means there hasn't been
// any content-expression checking done on the top nodes, tries to
// find a parent node in the current context that might fit the nodes,
// and if successful, rebuilds the slice so that it fits into that parent.
//
// This addresses the problem that Transform.replace expects a
// coherent slice, and will fail to place a set of siblings that don't
// fit anywhere in the schema.
function normalizeSiblings(fragment: Fragment, $context: ResolvedPos) {
  if (fragment.childCount < 2) {
    return fragment;
  }
  for (let d = $context.depth; d >= 0; d--) {
    const parent = $context.node(d);
    let match = parent.contentMatchAt($context.index(d));
    let lastWrap: NodeType[] = [];
    let result: ProseMirrorNode[] | null = [];
    fragment.forEach((node) => {
      if (!result) {
        return;
      }
      const wrap = match.findWrapping(node.type);
      if (!wrap) {
        return (result = null);
      }
      const inLast: ProseMirrorNode | undefined =
        result.length && lastWrap!.length
          ? addToSibling(wrap, lastWrap!, node, result[result.length - 1], 0)
          : undefined;
      if (inLast) {
        result[result.length - 1] = inLast;
      } else {
        if (result.length) {
          result[result.length - 1] = closeRight(
            result[result.length - 1],
            lastWrap.length,
          );
        }
        const wrapped = withWrappers(node, wrap);
        result.push(wrapped);
        // @ts-ignore
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });
    if (result) {
      return Fragment.from(result);
    }
  }
  return fragment;
}
//

function closeRange(
  fragment: Fragment,
  side: number,
  from: number,
  to: number,
  depth: number,
  openEnd: number,
) {
  const node = (side < 0
    ? fragment.firstChild
    : fragment.lastChild) as ProseMirrorNode;
  let inner = node!.content;
  if (depth < to - 1) {
    inner = closeRange(inner, side, from, to, depth + 1, openEnd);
  }
  if (depth >= from) {
    if (side < 0) {
      inner = node
        .contentMatchAt(0)
        .fillBefore(inner, fragment.childCount > 1 || openEnd <= depth)!
        .append(inner);
    } else {
      inner = inner.append(
        node.contentMatchAt(node.childCount).fillBefore(Fragment.empty, true)!,
      );
    }
  }
  return fragment.replaceChild(
    side < 0 ? 0 : fragment.childCount - 1,
    node.copy(inner),
  );
}

function closeSlice(slice: Slice, openStart: number, openEnd: number) {
  if (openStart < slice.openStart) {
    slice = new Slice(
      closeRange(
        slice.content,
        -1,
        openStart,
        slice.openStart,
        0,
        slice.openEnd,
      ),
      openStart,
      slice.openEnd,
    );
  }
  if (openEnd < slice.openEnd) {
    slice = new Slice(
      closeRange(slice.content, 1, openEnd, slice.openEnd, 0, 0),
      slice.openStart,
      openEnd,
    );
  }
  return slice;
}

// : (EditorView, string, string, ?bool, ResolvedPos) → ?Slice
// Read a slice of content from the clipboard (or drop data).
export function parseFromClipboard(
  editorState: EditorState,
  text: string,
  html: string,
  plainText: boolean,
  $context: ResolvedPos,
) {
  let dom: HTMLElement, slice: Slice;
  const inCode = $context.parent.type.spec.code;
  if (!html && !text) {
    return null;
  }
  const asText = text && (plainText || inCode || !html);
  if (asText) {
    if (inCode) {
      return new Slice(Fragment.from(editorState.schema.text(text)), 0, 0);
    }
    dom = document.createElement('div');
    text
      .trim()
      .split(/(?:\r\n?|\n)+/)
      .forEach((block) => {
        dom.appendChild(document.createElement('p')).textContent = block;
      });
  } else {
    dom = readHTML(html);
  }

  const contextNode = dom && dom.querySelector('[data-pm-slice]');
  const sliceData =
    contextNode &&
    /^(\d+) (\d+) (.*)/.exec(contextNode.getAttribute('data-pm-slice')!);

  // @ts-ignore
  if (!slice) {
    const parser = DOMParser.fromSchema(editorState.schema);
    slice = parser.parseSlice(dom, {
      preserveWhitespace: !!(asText || sliceData),
      context: $context,
    });
  }
  if (sliceData) {
    slice = addContext(
      closeSlice(slice, +sliceData[1], +sliceData[2]),
      sliceData[3],
    );
  }
  // HTML wasn't created by ProseMirror. Make sure top-level siblings are coherent
  else {
    slice = Slice.maxOpen(normalizeSiblings(slice.content, $context), false);
  }

  return slice;
}
