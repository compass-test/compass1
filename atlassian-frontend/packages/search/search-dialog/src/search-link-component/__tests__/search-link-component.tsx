import React from 'react';
import styled from 'styled-components';
import { render } from '@testing-library/react';
import { Link, LinkComponentProps } from '../search-link-component';

describe('search-link-component', () => {
  const DummyLinkComponent = (props: LinkComponentProps) => (
    <div className={props.className}>{props.children}</div>
  );

  it('creates a link component that can be styled', () => {
    const StyledLinkComponent = styled(Link)`
      width: 100%;
    `;

    const { getByText } = render(
      <StyledLinkComponent linkComponent={DummyLinkComponent}>
        Test
      </StyledLinkComponent>,
    );

    const component = getByText('Test');

    expect(component).toBeInstanceOf(HTMLDivElement);
    expect(component).toHaveStyle(`width: 100%;`);
  });

  it('uses a default anchor tag if a link component is not provided', () => {
    const StyledLinkComponent = styled(Link)`
      width: 100%;
    `;

    const { getByText } = render(
      <StyledLinkComponent>Test</StyledLinkComponent>,
    );

    const component = getByText('Test');

    expect(component).toBeInstanceOf(HTMLAnchorElement);
    expect(component).toHaveStyle(`width: 100%;`);
  });
});
