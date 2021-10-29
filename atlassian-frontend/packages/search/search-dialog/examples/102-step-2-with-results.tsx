import React, { useState } from 'react';
import {
  SearchDialog,
  SearchInput,
  SearchResultSection,
  SearchResult,
  SearchResultSectionLink,
} from '../src';
import { getMockSearchResults } from '../examples-helpers/mock-data';
import ListIcon from '@atlaskit/icon/glyph/list';

const dataSection1 = getMockSearchResults(3);
const dataSection2 = getMockSearchResults(3);

/**
 * This demonstrates search results split into 2 sections.
 */
export const ExampleSearchResults = () => (
  <>
    <SearchResultSection
      title="Search results Section 1"
      totalResults={dataSection1.length}
    >
      {dataSection1.map((i: any) => (
        <SearchResult
          key={i.id}
          href={i.href}
          title={i.title}
          icon={<ListIcon label="list icon" />}
        />
      ))}
    </SearchResultSection>
    <SearchResultSection
      title="Search results Section 2"
      totalResults={dataSection2.length}
    >
      {dataSection2.map((i: any) => (
        <SearchResult
          key={i.id}
          href={i.href}
          title={i.title}
          icon={<ListIcon label="list icon" />}
        />
      ))}
      <SearchResultSectionLink>show more (not wired)</SearchResultSectionLink>
    </SearchResultSection>
  </>
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
        </SearchDialog>
      )}
    </>
  );
};
