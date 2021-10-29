import React from 'react';

import { ContentBodyItem } from '../../../../../../../../common/types';
import {
  DocumentWrapper,
  QuoteAuthor,
  QuoteWrapper,
} from '../../../../../../../../common/ui/quote-wrapper';
import { TruncatedText } from '../../../../../../../../common/ui/truncated-text';
import { BodyText } from '../../../../../../../../common/ui/truncated-text/styled';

export type ExpandablePlainTextProps = {
  isExpanded: boolean;
  documentData: string;
  author?: ContentBodyItem['author'];
  isQuoted: boolean;
};

export const ExpandablePlainText = ({
  isExpanded,
  isQuoted,
  author,
  documentData,
}: ExpandablePlainTextProps) => {
  const Wrapper = isQuoted ? QuoteWrapper : DocumentWrapper;
  if (isExpanded) {
    return (
      <Wrapper>
        {isQuoted && <QuoteAuthor tall author={author} />}
        <BodyText>{documentData}</BodyText>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {isQuoted && <QuoteAuthor tall author={author} />}
      <TruncatedText text={documentData} />
    </Wrapper>
  );
};
