import { Schema, NodeSpec, MarkSpec, Node } from 'prosemirror-model';

const pDOM = ['p', 0],
  blockquoteDOM = ['blockquote', 0],
  hrDOM = ['hr'],
  preDOM = ['pre', ['code', 0]],
  brDOM = ['br'];

const cellAttrs = {
  colspan: { default: 1 },
  rowspan: { default: 1 },
  colwidth: { default: null },
  background: { default: null },
};

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes: NodeSpec = {
  // :: NodeSpec The top level document node.
  doc: {
    content: 'block+',
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return pDOM;
    },
  },

  // :: NodeSpec An expand.
  expand: {
    content: 'block+',
    group: 'block',
    parseDOM: [{ tag: 'expand' }],
    toDOM(node: any) {
      const attrs = {
        'data-node-type': 'expand',
        'data-title': node.attrs.title,
        'data-expanded': node.attrs.__expanded,
      };
      return ['div', attrs, 0];
    },
  },

  panel: {
    attrs: {
      panelType: { default: 'info' },
    },
    content: '(paragraph)+',
    toDOM(node: Node) {
      const { panelType } = node.attrs;
      return [
        'div',
        {
          'data-panel-type': panelType,
        },
        ['div', {}, 0],
      ];
    },
  },

  table: {
    content: 'tableRow+',
    attrs: {
      isNumberColumnEnabled: { default: false },
      layout: { default: 'default' },
      __autoSize: { default: false },
    },
    tableRole: 'table',
    toDOM(node: Node) {
      const attrs = {
        'data-number-column': node.attrs.isNumberColumnEnabled,
        'data-layout': node.attrs.layout,
        'data-autosize': node.attrs.__autoSize,
      };
      return ['table', attrs, ['tbody', 0]];
    },
  },

  tableRow: {
    content: '(tableCell | tableHeader)+',
    tableRole: 'row',
    toDOM() {
      return ['tr', 0];
    },
  },

  tableCell: {
    content: '(paragraph | panel)+',
    attrs: cellAttrs,
    toDOM: (node: Node) => ['td', getCellDomAttrs(node), 0],
  },

  tableHeader: {
    content: '(paragraph | panel)+',
    attrs: cellAttrs,
    tableRole: 'header_cell',
    toDOM: (node: Node) => ['th', getCellDomAttrs(node), 0],
  },

  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM() {
      return blockquoteDOM;
    },
  },

  // :: NodeSpec A horizontal rule (`<hr>`).
  horizontal_rule: {
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM() {
      return hrDOM;
    },
  },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  heading: {
    attrs: { level: { default: 1 } },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node: Node) {
      return ['h' + node.attrs.level, 0];
    },
  },

  // :: NodeSpec A code listing. Disallows marks or non-text inline
  // nodes by default. Represented as a `<pre>` element with a
  // `<code>` element inside of it.
  code_block: {
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    toDOM() {
      return preDOM;
    },
  },

  // :: NodeSpec The text node.
  text: {
    group: 'inline',
  },

  // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
  // `alt`, and `href` attributes. The latter two default to the empty
  // string.
  image: {
    inline: true,
    attrs: {
      src: {},
      alt: { default: null },
      title: { default: null },
    },
    group: 'inline',
    draggable: true,
    parseDOM: [
      {
        tag: 'img[src]',
        getAttrs(dom: HTMLImageElement) {
          return {
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
          };
        },
      },
    ],
    toDOM(node: Node) {
      let { src, alt, title } = node.attrs;
      return ['img', { src, alt, title }];
    },
  },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return brDOM;
    },
  },
};

const emDOM = ['em', 0],
  strongDOM = ['strong', 0],
  codeDOM = ['code', 0];

// :: Object [Specs](#model.MarkSpec) for the marks in the schema.
export const marks: MarkSpec = {
  // :: MarkSpec A link. Has `href` and `title` attributes. `title`
  // defaults to the empty string. Rendered and parsed as an `<a>`
  // element.
  link: {
    attrs: {
      href: {},
      title: { default: null },
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(dom: HTMLAnchorElement) {
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title'),
          };
        },
      },
    ],
    toDOM(node: Node) {
      let { href, title } = node.attrs;
      return ['a', { href, title }, 0];
    },
  },

  // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
  // Has parse rules that also match `<i>` and `font-style: italic`.
  em: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return emDOM;
    },
  },

  // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
  // also match `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: 'b',
        getAttrs: (node: HTMLElement) =>
          node.style.fontWeight !== 'normal' && null,
      },
      {
        style: 'font-weight',
        getAttrs: (value: string) =>
          /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      },
    ],
    toDOM() {
      return strongDOM;
    },
  },

  // :: MarkSpec Code font mark. Represented as a `<code>` element.
  code: {
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return codeDOM;
    },
  },
};

type CellDomAttrs = {
  colspan?: string;
  rowspan?: string;
  style?: string;
  colorname?: string;
  'data-colwidth'?: string;
  class?: string;
};

const tableBackgroundColorNames = new Map<string, string>();
const tableBackgroundColorPalette = new Map<string, string>();
const tablePrefixSelector = 'pm-table';
const tableHeaderSelector = `${tablePrefixSelector}-header-content-wrap`;
const tableCellSelector = `${tablePrefixSelector}-cell-content-wrap`;

const getCellDomAttrs = (node: Node, cell?: HTMLElement) => {
  const attrs: CellDomAttrs = {};
  const nodeType = node.type.name;
  const colspan = cell ? parseInt(cell.getAttribute('colspan') || '1', 10) : 1;
  const rowspan = cell ? parseInt(cell.getAttribute('rowspan') || '1', 10) : 1;

  if (node.attrs.colspan !== colspan) {
    attrs.colspan = node.attrs.colspan;
  }
  if (node.attrs.rowspan !== rowspan) {
    attrs.rowspan = node.attrs.rowspan;
  }

  if (node.attrs.colwidth) {
    attrs['data-colwidth'] = node.attrs.colwidth.join(',');
  }
  if (node.attrs.background) {
    const { background } = node.attrs;

    // to ensure that we don't overwrite product's style:
    // - it clears background color for <th> if its set to gray
    // - it clears background color for <td> if its set to white
    const ignored =
      (nodeType === 'tableHeader' &&
        background === tableBackgroundColorNames.get('light gray')) ||
      (nodeType === 'tableCell' &&
        background === tableBackgroundColorNames.get('white'));

    if (ignored) {
      attrs.style = '';
    } else {
      const color = isRgb(background) ? rgbToHex(background) : background;

      attrs.style = `${attrs.style || ''}background-color: ${color};`;
      attrs.colorname = tableBackgroundColorPalette.get(color);
    }
  }

  if (nodeType === 'tableHeader') {
    attrs.class = tableHeaderSelector;
  } else {
    attrs.class = tableCellSelector;
  }

  return attrs;
};

function isRgb(color: string): boolean {
  return /rgba?\(/.test(color);
}

function rgbToHex(value: string): string | null {
  const matches = value.match(/(0?\.?\d{1,3})%?\b/g);

  if (matches && matches.length >= 3) {
    const [red, green, blue] = matches.map(Number);
    return (
      '#' +
      (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) // eslint-disable-line no-bitwise
    );
  }

  return null;
}

// :: Schema
// This schema roughly corresponds to the document schema used by
// [CommonMark](http://commonmark.org/), minus the list elements,
// which are defined in the [`prosemirror-schema-list`](#schema-list)
// module.
//
// To reuse elements from this schema, extend or read from its
// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({ nodes, marks });
