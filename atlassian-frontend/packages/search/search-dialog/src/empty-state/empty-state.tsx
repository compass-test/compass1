import React from 'react';
import { Title, Wrapper, Content } from './empty-state.styled';

export interface Props {
  /**
   * An image that is shown above the text. This should be used to communicate what the page is for.
   */
  Image: React.ComponentType;
  /**
   * A summary of why the page is shown.
   */
  title: string | JSX.Element;
  /**
   * Details on why the page is shown including any call to actions.
   */
  content?: JSX.Element;
}

export const EmptyState: React.FC<Props> = ({ title, content, Image }) => (
  <Wrapper>
    <Image />
    <Title>{title}</Title>
    <Content>{content}</Content>
  </Wrapper>
);
