import React, { ReactNode, useState } from 'react';

import {
  ActionContainer,
  AvatarContainer,
  AvatarContentActionContainer,
  AvatarContentContainer,
  ContentContainer,
  ContentTypeDecoratorContainer,
  ContentTypeWrapper,
} from './styled';

type AvatarContentActionProps = {
  avatar?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
};

export const AvatarContentAction = ({
  avatar,
  action,
  children,
}: AvatarContentActionProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <AvatarContentActionContainer
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AvatarContentContainer>
        {avatar && <AvatarContainer>{avatar}</AvatarContainer>}
        <ContentContainer>{children}</ContentContainer>
      </AvatarContentContainer>
      {action && (
        <ActionContainer visible={isHovering}>{action}</ActionContainer>
      )}
    </AvatarContentActionContainer>
  );
};

type ContentTypeDecoratorProps = {
  children: ReactNode;
  type: string;
};

export const ContentTypeDecorator = ({
  children,
  type,
}: ContentTypeDecoratorProps) => (
  <ContentTypeDecoratorContainer>
    {children}
    <ContentTypeWrapper>{type}</ContentTypeWrapper>
  </ContentTypeDecoratorContainer>
);

export const actionButtonTheme = (currentTheme: any, themeProps: any) => {
  const { buttonStyles, ...rest } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      width: '16px',
      height: '16px',
    },
    ...rest,
  };
};

export { LinkWrapper, TextOverflowWrapper } from './styled';

export default AvatarContentAction;
