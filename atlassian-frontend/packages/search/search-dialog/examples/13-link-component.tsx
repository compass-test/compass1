import React from 'react';
import styled from '@emotion/styled';
import { B400 } from '@atlaskit/theme/colors';
import { Link } from '../src';

export const Simple = () => {
  const StyledLink = styled(Link)`
    color: ${B400};
    text-decoration: none;
  `;
  return <StyledLink href="#">Text</StyledLink>;
};

export default Simple;
