import React from 'react';
import {
  SearchInput,
  KeyboardHighlightProvider,
  SearchResult,
  SearchDialog,
} from '../src';
import ListIcon from '@atlaskit/icon/glyph/list';
import { getMockSearchResults } from '../examples-helpers/mock-data';

const data = getMockSearchResults(3);

const results = data.map((i) => (
  <SearchResult
    key={i.id}
    href={i.href}
    title={i.title}
    icon={<ListIcon label="list icon" />}
  />
));

export const ContextualExample = () => {
  const [ref, setRef] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <div style={{ paddingBottom: '10px' }}>
        Press up and down while highlighted on the input
      </div>

      <KeyboardHighlightProvider listenerNode={ref}>
        <SearchInput isExpanded ref={setRef} />
        <SearchDialog>{results}</SearchDialog>
      </KeyboardHighlightProvider>
    </>
  );
};

export default ContextualExample;
