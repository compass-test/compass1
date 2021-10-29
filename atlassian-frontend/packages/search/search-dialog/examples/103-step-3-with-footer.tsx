import React, { useState } from 'react';
import { SearchDialog, SearchInput, SearchFooter } from '../src';
import { ExampleSearchResults } from './102-step-2-with-results';
import { SimpleTag } from '@atlaskit/tag';

export const ExampleFooter = () => (
  <SearchFooter>
    <div style={{ padding: '.6em 1em' }}>
      <p>
        Go to: <SimpleTag href="#" text="Newest" />
      </p>
    </div>
  </SearchFooter>
);

export default () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Close Dialog' : 'Open Dialog'}
      </button>

      <SearchInput
        isExpanded={isExpanded}
        onInput={() => setIsExpanded(true)}
        onClick={() => setIsExpanded(true)}
      />
      {isExpanded && (
        <SearchDialog>
          <ExampleSearchResults />
          <ExampleFooter />
        </SearchDialog>
      )}
    </>
  );
};
