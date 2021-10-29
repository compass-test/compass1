import React, { ReactElement, ReactNode } from 'react';

import {
  AvatarWrapper,
  ContentWrapper,
  InlineAvatarContentWrapper,
  LinkWrapper,
} from './styled';

type ConditionalLinkType = {
  href?: string | null;
  children: ReactElement;
};

type InlineAvatarContentType = {
  avatar: ReactNode;
  href?: string | null;
  children: ReactNode;
};

const ConditionalLinkWrapper = ({ href, children }: ConditionalLinkType) => {
  return href != null ? (
    <LinkWrapper href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </LinkWrapper>
  ) : (
    children
  );
};

export const InlineAvatarContent = ({
  avatar,
  href,
  children,
}: InlineAvatarContentType) => {
  return (
    <InlineAvatarContentWrapper>
      <ConditionalLinkWrapper href={href}>
        <>
          <AvatarWrapper>{avatar}</AvatarWrapper>
          <ContentWrapper>{children}</ContentWrapper>
        </>
      </ConditionalLinkWrapper>
    </InlineAvatarContentWrapper>
  );
};

export default InlineAvatarContent;
