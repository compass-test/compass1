import React, { useMemo } from 'react';

import styled from '@emotion/styled';

import Avatar from '@atlaskit/avatar';
import { ProfileCardTrigger } from '@atlaskit/profilecard';
import { N200, N40A } from '@atlaskit/theme/colors';

import { ContentBodyItem } from '../../types';
import { getUserAvatarFromARI } from '../../utils/avatar';
import { useProfileClient } from '../profile-client-context';

interface QuoteAuthorProps {
  author?: ContentBodyItem['author'];
  tall?: boolean;
  noFloat?: boolean;
}

const QuoteAuthorWrapper = styled.span<{
  tall?: boolean;
  noFloat?: boolean;
}>`
  position: relative;
  width: 20px;
  height: ${(p) => (p.tall ? '1.65em' : '1.428em')};
  ${(p) =>
    p.noFloat
      ? ``
      : `
    float: left;
    margin-right: 4px;
    & > span.quote-avatar-positioner {
      display: inline-flex;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  `}
`;

export const QuoteAuthor = ({
  author,
  tall,
  noFloat,
}: QuoteAuthorProps): React.ReactElement | null => {
  const avatarUrl =
    author && (author.avatarUrl ?? getUserAvatarFromARI(author.ari));
  const userId = useMemo(() => author?.ari?.split('/')[1], [author]);
  const profileClient = useProfileClient();

  return (
    <QuoteAuthorWrapper noFloat={noFloat} tall={tall} className="quote-avatar">
      <span className="quote-avatar-positioner">
        <ProfileCardTrigger
          trigger="hover"
          userId={userId}
          resourceClient={profileClient}
        >
          <Avatar
            name={author?.displayName ?? ''}
            appearance="circle"
            borderColor="transparent"
            src={avatarUrl ?? undefined}
            size="xsmall"
          />
        </ProfileCardTrigger>
      </span>
    </QuoteAuthorWrapper>
  );
};

/**
 * Hard reliance on .ak-renderer-document to make quoted ADF grey.
 * This might break if AK renderer removes this className in the future
 */
export const QuoteWrapper = styled.div`
  border-left: 2px solid ${N40A};
  color: ${N200};
  padding-left: 6px;
  margin-bottom: 8px;
  .ak-renderer-document {
    color: ${N200};
  }
  &::after {
    content: ' ';
    clear: both;
  }
`;

/**
 * Line height comes from ADF renderer line height,
 * fixes a shift in text between expanded and collapsed.
 */
export const DocumentWrapper = styled.div`
  line-height: 1.714em;
`;
