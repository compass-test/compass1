import markdown from 'markdown-it';
import iterator from 'markdown-it-for-inline';

import type { SupportedLanguages } from '@atlaskit/code';

import { PipeReadmeSyntax, SyntaxType } from '../types';

export class Syntax implements PipeReadmeSyntax {
  public type?: SyntaxType;
  public html?: string;
  public innerText?: string;
  public language?: SupportedLanguages;

  constructor(props: PipeReadmeSyntax) {
    this.type = props.type;
    this.html = props.html;
    this.innerText = props.innerText;
    this.language = props.language;
  }
}

function parseCodeSnippet(element: Element): Syntax {
  // Whitelisted languages
  let language: any = null;
  if (element.matches('.language-yaml')) {
    language = 'yaml';
  } else if (element.matches('.language-json')) {
    language = 'json';
  }

  const codeFragment = document.createElement('div');
  codeFragment.appendChild(element);

  return new Syntax({
    html: codeFragment.innerHTML,
    innerText: codeFragment.innerText,
    type: SyntaxType.CodeBlock,
    language,
  });
}

function dropOne(children: HTMLCollection) {
  if (!!children[0]) {
    children[0].remove();
  }
}

function takeAndParseUntil(children: HTMLCollection, heading: string) {
  const parts: any[] = [];
  let fragment = document.createElement('div');

  while (children.length > 0) {
    const currentChild = children[0];
    if (currentChild.matches('h2') && currentChild.innerHTML === heading) {
      break;
    } else if (
      // <code> elements are wrapped in <pre>
      currentChild.matches(`pre`) &&
      currentChild.children.length > 0 &&
      currentChild.children[0].matches('code')
    ) {
      // add on the fragment so far and reset cumulative text fragment
      parts.push(
        new Syntax({ type: SyntaxType.Text, html: fragment.innerHTML }),
      );
      fragment = document.createElement('div');
      // add the code snippet
      parts.push(new Syntax(parseCodeSnippet(currentChild.children[0])));
    } else {
      fragment.appendChild(currentChild);
    }
  }
  parts.push(new Syntax({ type: SyntaxType.Text, html: fragment.innerHTML }));
  return parts;
}

function parseAnchorTags(tokens: any, tokenIndex: any) {
  // Add and override anchors' targets to open in new window.
  const anchorIndex = tokens[tokenIndex].attrIndex('target');
  if (anchorIndex < 0) {
    tokens[tokenIndex].attrPush(['target', '_blank']);
  } else {
    tokens[tokenIndex].attrs[anchorIndex][1] = '_blank';
  }
}

/**
 * We convert the raw markdown to html ourselves instead of using Bitbucket's rendered html
 * so we are not coupled to their element ids and classes.
 * @param raw raw markdown
 */
function convertRawToHtml(raw: string) {
  const md = new markdown({
    breaks: false,
  }).use(iterator, 'url_new_win', 'link_open', parseAnchorTags);

  const root = document.createElement('div');
  root.innerHTML = md.render(raw);
  return root;
}

export function parsePipeReadmeRaw(raw: string) {
  const data = { intro: null, details: null, examples: null, support: null };

  if (!raw) {
    return data;
  }

  const node = convertRawToHtml(raw);

  // Remove pipe header
  dropOne(node.children);

  let intro: any = [];
  let details: any = [];
  if (raw.includes('## Details')) {
    intro = takeAndParseUntil(node.children, 'Details');
    dropOne(node.children);
    details = takeAndParseUntil(node.children, 'Examples');
  } else {
    intro = takeAndParseUntil(node.children, 'Examples');
  }

  dropOne(node.children);
  const examples = takeAndParseUntil(node.children, 'Support');
  dropOne(node.children);
  const support = takeAndParseUntil(node.children, 'License');

  return { intro, details, examples, support };
}
