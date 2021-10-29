import React from 'react';
import { SearchResultSectionLink } from '../src';
import MockLinkComponent from '../examples-helpers/mock-link-component';

const Example = () => (
  <SearchResultSectionLink linkComponent={MockLinkComponent}>
    <p>Click me</p>
  </SearchResultSectionLink>
);

export default Example;
