import React from 'react';
import { SearchAnchor } from './search-anchor';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';

const Page = styled.div`
  width: 50%;
  margin-top: 50px;
`;

// todo - these stories should document the visual difference of isExpanded prop

export const BasicExpanded = () => (
  <Page>
    <SearchAnchor
      onBlur={action('blur')}
      onFocus={action('focus')}
      onKeyDown={action('onkeydown')}
      isExpanded
    >
      <div>This snowflage div is anchored!</div>
    </SearchAnchor>
  </Page>
);

export const BasicCollapsed = () => (
  <Page>
    <SearchAnchor
      onBlur={action('blur')}
      onFocus={action('focus')}
      onKeyDown={action('onkeydown')}
      isExpanded={false}
    >
      <div>This snowflage div is anchored!</div>
    </SearchAnchor>
  </Page>
);

export default { title: 'Search Dialog/Search Anchor' };
