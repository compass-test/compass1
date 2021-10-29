import React, { FC, ReactNode } from 'react';

import {
  Description,
  Header,
  RightHeaderContent,
  Title,
  Wrapper,
} from './styled';

export type Props = {
  title?: string;
  HeadingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  rightHeaderContent?: ReactNode;
  description?: string;
};

const TableHeader: FC<Props> = ({
  title,
  HeadingLevel = 'h2',
  rightHeaderContent,
  description,
  children,
}) => {
  const shouldShowTitle = title || rightHeaderContent || description;
  return (
    <div>
      {shouldShowTitle && (
        <Wrapper>
          <Header>
            {title && (
              <Title>
                <HeadingLevel>{title}</HeadingLevel>
              </Title>
            )}
            {rightHeaderContent && (
              <RightHeaderContent>{rightHeaderContent}</RightHeaderContent>
            )}
          </Header>
          {description && <Description>{description}</Description>}
        </Wrapper>
      )}
      {children}
    </div>
  );
};

export default TableHeader;
