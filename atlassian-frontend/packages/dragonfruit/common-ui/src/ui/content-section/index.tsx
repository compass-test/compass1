import React, { PropsWithChildren } from 'react';

import {
  SectionDescriptionText,
  SectionHeadingText,
  SectionWrapper,
} from './styled';

type Props = PropsWithChildren<{
  title: string;
  name: string;
  description?: string;
  position?: 'main' | 'sidebar';
}>;

export const ContentSection: React.FC<Props> = (props: Props) => {
  const { title, name, description, position = 'main', children } = props;

  return (
    <SectionWrapper aria-labelledby={`${name}-section-heading`}>
      <SectionHeadingText id={`${name}-section-heading`} position={position}>
        {title}
      </SectionHeadingText>
      {description && (
        <SectionDescriptionText>{description}</SectionDescriptionText>
      )}
      {children}
    </SectionWrapper>
  );
};
