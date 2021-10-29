import React, { useContext, useMemo } from 'react';

import { ProviderFactory, Providers } from '@atlaskit/editor-common';
import { MentionDescription, MentionProvider } from '@atlaskit/mention';
import { ReactRenderer } from '@atlaskit/renderer';
import { Provider } from '@atlaskit/smart-card';

import {
  AdfDocument,
  ContentBodyItem,
} from '../../../../../../../../common/types';
import { NotificationsStoreContext } from '../../../../../../../../common/ui/notifications-context';
import {
  DocumentWrapper,
  QuoteAuthor,
  QuoteWrapper,
} from '../../../../../../../../common/ui/quote-wrapper';
import { TruncatedText } from '../../../../../../../../common/ui/truncated-text';
import {
  parseADF,
  renderTextDocument,
} from '../../../../../../../../services/utils/adf-util';

type RichDocumentProps = {
  adf: string;
};

export const AdfRichTextDocument = ({ adf }: RichDocumentProps) => {
  const { state } = useContext(NotificationsStoreContext);
  const userId = state.userId;
  const adfMemo = useMemo(() => {
    const mentionProvider = () => {
      return Promise.resolve({
        shouldHighlightMention(mention: MentionDescription) {
          return mention.id === userId;
        },
      } as MentionProvider);
    };

    let dataProviders: Providers & {
      [key: string]: Promise<any> | undefined;
    } = {};

    if (userId) {
      dataProviders.mentionProvider = mentionProvider();
    }

    const adfDocument = parseADF(adf);

    return (
      <Provider>
        <ReactRenderer
          document={adfDocument}
          eventHandlers={{
            // This prevents content links from opening within the iFrame
            link: {
              onClick(evt, url) {
                evt.preventDefault();
                window.open(url, '_top');
              },
            },
            smartCard: {
              onClick(evt, url) {
                evt.preventDefault();
                window.open(url, '_top');
              },
            },
          }}
          dataProviders={ProviderFactory.create(dataProviders)}
        />
      </Provider>
    );
  }, [adf, userId]);

  return <Provider>{adfMemo}</Provider>;
};

type ExpandableAdfDocumentProps = {
  document: AdfDocument;
  author?: ContentBodyItem['author'];
  isExpanded: boolean;
  isQuoted: boolean;
};

export const AdfPlainTextDocument = (adf: string): string => {
  return renderTextDocument(parseADF(adf)) ?? '';
};

export const ExpandableAdfDocument = ({
  isExpanded,
  document,
  author,
  isQuoted,
}: ExpandableAdfDocumentProps) => {
  const Wrapper = isQuoted ? QuoteWrapper : DocumentWrapper;
  if (isExpanded) {
    return (
      <Wrapper>
        {isQuoted && <QuoteAuthor noFloat author={author} />}
        <AdfRichTextDocument adf={document.data} />
      </Wrapper>
    );
  }
  const truncateProps = isQuoted ? { clamp: 1 } : {};
  return (
    <Wrapper>
      {isQuoted && <QuoteAuthor tall author={author} />}
      <TruncatedText
        {...truncateProps}
        text={AdfPlainTextDocument(document.data)}
      />
    </Wrapper>
  );
};
