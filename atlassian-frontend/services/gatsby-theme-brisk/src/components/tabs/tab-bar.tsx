import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { N30, B400, N300, B500 } from '@atlaskit/theme/colors';
import titleify from '../../utilities/titleify';

const TabLink = styled(Link)`
  color: ${N300};
  padding-left: 14px;
  padding-right: 14px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  border-color: currentColor;
  border-bottom: 2px solid transparent;

  &.active {
    color: ${B400};
    border-color: currentColor;
  }

  :focus {
    outline: none;
  }

  &:hover {
    color: ${B500};
    text-decoration: none;
  }

  /* Hover and focus are separated because of the specificity of the css reset winning if they are together. */
  &:focus {
    color: ${B500};
    text-decoration: none;
  }
`;

const Container = styled.nav`
  border-bottom: 2px solid ${N30};
  height: 34px;
  box-sizing: content-box;
`;

type TabLink = {
  to: string;
  name: string;
};

type Props = {
  tabLinks: Array<TabLink>;
  className?: string;
};

const TabBar = ({ tabLinks, className }: Props) => {
  return (
    <Container data-docs-tabs className={className} aria-label="page tabs">
      {tabLinks.map(({ name, to }) => (
        <TabLink key={name} className="link" activeClassName="active" to={to}>
          {titleify(name)}
        </TabLink>
      ))}
    </Container>
  );
};

export default TabBar;
