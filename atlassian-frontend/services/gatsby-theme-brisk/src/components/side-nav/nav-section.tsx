import React from 'react';
import styled from '@emotion/styled';

type Props = {
  isOpen?: boolean;
  children: React.ReactNode;
};

const Nav = styled.div<Props>`
  margin-bottom: 16px;
  & > & {
    margin-bottom: 0;
  }
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const NavSection = (props: Props) => (
  <Nav isOpen={props.isOpen || true} {...props} />
);

export default NavSection;
