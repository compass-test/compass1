import React from 'react';
import { SearchFooter, SearchDialog } from '../src';
import { SimpleTag } from '@atlaskit/tag';

export const Simple = () => (
  <SearchFooter>
    <div style={{ padding: '.6em 1em' }}>
      <p>
        Go to: <SimpleTag href="#" text="Newest" />
      </p>
    </div>
  </SearchFooter>
);

export const ContextualExample = () => (
  <SearchDialog>
    <div style={{ padding: '1em' }}>
      <p>Search results ...</p>
    </div>
    <Simple />
  </SearchDialog>
);

export default ContextualExample;
