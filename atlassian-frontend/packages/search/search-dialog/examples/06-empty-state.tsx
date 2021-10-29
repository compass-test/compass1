import React from 'react';
import { EmptyState } from '../src';
import SearchIcon from '@atlaskit/icon/glyph/search';

const Example = () => (
  <EmptyState
    title={"We're having trouble searching"}
    Image={() => <SearchIcon label="" size="xlarge" />}
    content={<p>Try again</p>}
  />
);

export const SearchError = Example;

export default Example;
