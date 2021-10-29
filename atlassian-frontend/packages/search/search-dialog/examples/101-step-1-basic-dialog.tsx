import React, { useState } from 'react';
import { SearchDialog, SearchInput } from '../src';

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
      {isExpanded && <SearchDialog>Hello World!</SearchDialog>}
    </>
  );
};
