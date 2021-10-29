import React from 'react';
import styled from '@emotion/styled';
import { B400 } from '@atlaskit/theme/colors';
import { Link } from '../src';
import MockLinkComponent from '../examples-helpers/mock-link-component';

const SPALinkExample = () => {
  const StyledLink = styled(Link)`
    color: ${B400};
    text-decoration: none;
  `;
  return (
    <StyledLink href="#" linkComponent={MockLinkComponent}>
      Text
    </StyledLink>
  );
};

export default SPALinkExample;
