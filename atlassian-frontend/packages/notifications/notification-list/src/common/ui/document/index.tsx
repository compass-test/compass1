import React from 'react';

import { FormattedMessage } from 'react-intl';

import { N20A } from '@atlaskit/theme/colors';

import messages from '../../utils/i18n/messages';
import { QuoteAuthor, QuoteWrapper } from '../quote-wrapper';
import { TextSkeleton } from '../text-skeleton';

import { ContentFailureMessage, ContentSkeleton } from './styled';

export const DocumentError = () => (
  <ContentSkeleton>
    <ContentFailureMessage>
      <FormattedMessage {...messages.contentLoadFailure} />
    </ContentFailureMessage>
  </ContentSkeleton>
);

interface DocumentSkeletonProps {
  showQuoteSkeleton: boolean;
  testId?: string;
}

export const DocumentSkeleton = ({
  showQuoteSkeleton,
  testId,
}: DocumentSkeletonProps) => {
  return (
    <ContentSkeleton data-testid={testId}>
      {showQuoteSkeleton && (
        <QuoteWrapper className="skeleton-quote-wrapper">
          <QuoteAuthor />
          <TextSkeleton
            width="100%"
            marginBottom="0px"
            color={N20A}
            height="20px"
          />
        </QuoteWrapper>
      )}
      <TextSkeleton
        width="100%"
        marginBottom="4px"
        color={N20A}
        height="18px"
      />
      <TextSkeleton width="60%" marginBottom="0" color={N20A} height="18px" />
    </ContentSkeleton>
  );
};

export { SkeletonBox } from './styled';
