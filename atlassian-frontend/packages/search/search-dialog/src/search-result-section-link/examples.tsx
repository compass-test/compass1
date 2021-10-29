import React from 'react';
import { SearchResultSectionLink } from './search-result-section-link';
import { action } from '@storybook/addon-actions';

const DummyLinkComponent: React.FunctionComponent = ({ children, ...rest }) => (
  <a
    {...rest}
    onClick={(e) => {
      e.preventDefault();
      action('Linkcomponent clicked')(e);
    }}
  >
    {children}
  </a>
);

export const Basic = () => (
  <SearchResultSectionLink href={`https://www.atlassian.com/${Math.random()}`}>
    Some link
  </SearchResultSectionLink>
);

export const WithLinkComponent = () => (
  <SearchResultSectionLink linkComponent={DummyLinkComponent} href={`#`}>
    Some link with Link Component
  </SearchResultSectionLink>
);

export default {
  title: 'Search Dialog/Search Result Section Link',
};
