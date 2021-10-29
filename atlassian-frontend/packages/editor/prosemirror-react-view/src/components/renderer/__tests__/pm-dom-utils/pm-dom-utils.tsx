import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { Node as ProseMirrorNode, Schema } from 'prosemirror-model';

import {
  a,
  blockquote,
  br,
  doc,
  p,
  RefsNode,
} from '@atlaskit/editor-test-helpers/doc-builder';
import defaultSchema from '@atlaskit/editor-test-helpers/schema';

import { DefaultDOMSerializer } from '../../dom-serializer/default-dom-serializer';
import {
  HasProseMirrorDOMUtils,
  WithProseMirrorDOMUtils,
} from '../../pm-dom-utils/types';
import { Renderer } from '../../renderer';

function setup<S extends Schema>(doc: ProseMirrorNode<S>) {
  return render(
    <DefaultDOMSerializer schema={defaultSchema}>
      <Renderer doc={doc} />
    </DefaultDOMSerializer>,
  );
}

// TODO: Check this tests, after last month refactor and using old version of react testing lib causes some issues.
describe.skip('ProseMirror DOM Utils', () => {
  describe('getPos()', () => {
    type GetHTMLElement = (
      renderResult: RenderResult,
    ) => Promise<WithProseMirrorDOMUtils<HTMLElement>>;

    const baseDocument = doc(
      p('{foo}', 'foo', '{hr}', br(), '{bar}', 'bar'),
      p('{baz}', 'baz'),
    )(defaultSchema);

    const findTextFactory = (text: string): GetHTMLElement => (renderResult) =>
      renderResult.findByText(text);
    const querySelectorFactory = (query: string): GetHTMLElement => async (
      renderResult,
    ) => {
      const element = renderResult.container.querySelector(
        query,
      ) as HTMLElement;
      if (!element) {
        throw new Error(`"${query}" does not exist in the rendered container`);
      }
      return element;
    };

    it.each`
      description                                                               | nodeWithTags    | getHTMLElement                | tagName
      ${'get the position of the text at the beginning of the first paragraph'} | ${baseDocument} | ${findTextFactory('foo')}     | ${'foo'}
      ${'get the position of the hard break'}                                   | ${baseDocument} | ${querySelectorFactory('br')} | ${'hr'}
      ${'get the position of the text next to the hard break'}                  | ${baseDocument} | ${findTextFactory('bar')}     | ${'bar'}
      ${'get the position of the last paragraph'}                               | ${baseDocument} | ${findTextFactory('baz')}     | ${'baz'}
    `(
      'should $description',
      async ({ nodeWithTags, getHTMLElement, tagName }) => {
        const node = nodeWithTags as RefsNode;
        const renderResult = setup(node);

        const element = await (getHTMLElement as GetHTMLElement)(renderResult);

        const tag = node.refs[tagName];

        if (!tag) {
          throw new Error(`Tag "${tagName}" does not exist in the document.`);
        }

        if (!element.proseMirrorDOMUtils) {
          throw new Error('HTMLElement does not has ProseMirror DOM Utils.');
        }

        expect(element.proseMirrorDOMUtils.getPos()).toBe(tag);
      },
    );
  });
  describe('getDOMFromPos()', () => {
    const baseDoc = doc(p('foo'))(defaultSchema);

    it.each`
      description                        | nodeWithTags | pos  | html                                         | text     | expectedOffset
      ${'return document at position 0'} | ${baseDoc}   | ${0} | ${'<p data-prosemirror-node="true">foo</p>'} | ${null}  | ${0}
      ${'return document at position 1'} | ${baseDoc}   | ${1} | ${'<p data-prosemirror-node="true">foo</p>'} | ${null}  | ${0}
      ${'return document at position 2'} | ${baseDoc}   | ${2} | ${null}                                      | ${'foo'} | ${1}
      ${'return document at position 3'} | ${baseDoc}   | ${3} | ${null}                                      | ${'foo'} | ${2}
      ${'return document at position 4'} | ${baseDoc}   | ${4} | ${'<p data-prosemirror-node="true">foo</p>'} | ${null}  | ${1}
    `(
      'should $description',
      async ({ nodeWithTags, pos, html, text, expectedOffset }) => {
        const node = nodeWithTags as RefsNode;
        const { container } = setup(node);

        const renderer = container.querySelector(
          '[data-prosemirror-renderer]',
        ) as WithProseMirrorDOMUtils<HTMLElement>;

        if (!renderer.proseMirrorDOMUtils) {
          throw new Error('HTMLElement does not has ProseMirror DOM Utils.');
        }

        const { element, offset } = renderer.proseMirrorDOMUtils.domFromPos(
          pos,
        );

        if (element.nodeType === 3) {
          expect(element.textContent).toEqual(text);
        } else {
          expect((element as HTMLElement).innerHTML).toEqual(html);
        }

        expect(offset).toBe(expectedOffset);
      },
    );
  });

  describe('getDOMFromPos() equal to getPos()', () => {
    const baseDoc = doc(
      p('foo', br(), 'bar', a({ href: 'http://google.com' })('google')),
      blockquote(p('blockquote')),
      p('foo', br(), 'bar'),
    )(defaultSchema);
    let renderer: HasProseMirrorDOMUtils<HTMLElement>;

    beforeEach(() => {
      const { container } = setup(baseDoc);

      renderer = container.querySelector(
        '[data-prosemirror-renderer]',
      ) as HasProseMirrorDOMUtils<HTMLElement>;

      if (!renderer.proseMirrorDOMUtils) {
        throw new Error('HTMLElement does not has ProseMirror DOM Utils.');
      }
    });

    for (let i = 0; i < baseDoc.nodeSize - 1; i++) {
      it(`should be valid at position ${i}`, () => {
        const { element, offset } = renderer.proseMirrorDOMUtils.domFromPos(i);
        const calculatedPos = renderer.proseMirrorDOMUtils.posFromDOM(
          element,
          offset,
          -1,
        );
        expect(calculatedPos).toEqual(i);
      });
    }
  });
});
