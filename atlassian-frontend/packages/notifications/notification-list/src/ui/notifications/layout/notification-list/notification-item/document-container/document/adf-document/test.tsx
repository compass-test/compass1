import React from 'react';

import { render, RenderResult } from '@testing-library/react';

import { AdfPlainTextDocument, AdfRichTextDocument } from './index';

describe('Adf Document Components', () => {
  describe('ADF rendering', () => {
    const documentWithMention = (accountId?: string) => {
      return JSON.stringify({
        version: 1,
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'mention',
                attrs: {
                  id: accountId,
                  text: '@test-mention',
                  accessLevel: '',
                },
              },
            ],
          },
        ],
      });
    };

    it('renders ADF to a mention component', async () => {
      const result: RenderResult = render(
        <AdfRichTextDocument adf={documentWithMention('accountId')} />,
      );

      expect(result.findByText('@test-mention')).toBeDefined();
    });

    it('renders ADF to plain text', async () => {
      const accountId = 'accountId';
      const plainText = AdfPlainTextDocument(documentWithMention(accountId));

      expect(plainText).toEqual('@test-mention');
    });
  });
});
