import React, { useState } from 'react';
import {
  SearchDialog,
  SearchInput,
  ResultContainer,
  SidebarContainer,
  SearchDialogContent,
  KeyboardHighlightProvider,
} from '../src';
import { ExampleSearchResults } from './102-step-2-with-results';
import { ExampleFooter } from './103-step-3-with-footer';
import {
  ExampleFilterColContent,
  ExampleFilterRowContent,
} from './104-step-4-with-filters';

export default () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  return (
    <>
      <button
        style={{ marginBottom: '10px' }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Close Dialog' : 'Open Dialog'}
      </button>

      <KeyboardHighlightProvider listenerNode={ref}>
        <SearchInput
          ref={setRef}
          isExpanded={isExpanded}
          onInput={() => setIsExpanded(true)}
          onClick={() => setIsExpanded(true)}
        />
        {isExpanded && (
          <SearchDialog>
            <SearchDialogContent>
              <ResultContainer>
                <ExampleSearchResults />
              </ResultContainer>
              <SidebarContainer>
                <ExampleFilterColContent />
                <ExampleFilterRowContent />
              </SidebarContainer>
            </SearchDialogContent>
            <ExampleFooter />
          </SearchDialog>
        )}
      </KeyboardHighlightProvider>
    </>
  );
};
