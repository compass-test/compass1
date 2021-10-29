import React from 'react';
import styled from '@emotion/styled';

const Heading = styled.div`
  padding-left: 32px;
  display: flex;
  height: 32px;
  align-items: center;
  &:first-of-type {
    margin-top: 32px;
  }
`;

export const HeadingItem = ({ children }: { children: React.ReactNode }) => (
  <Heading className="headline3">{children}</Heading>
);
