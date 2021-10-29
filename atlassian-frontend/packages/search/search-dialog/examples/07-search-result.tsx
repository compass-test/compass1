import React from 'react';
import { SearchResult } from '../src';
import ListIcon from '@atlaskit/icon/glyph/list';

const Example = () => (
  <SearchResult
    href="#"
    title="PSA: Search Result is shown"
    icon={<ListIcon label="list icon" />}
  />
);

export default Example;
