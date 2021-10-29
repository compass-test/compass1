/** @jsx jsx */
import { useState, useRef, RefObject } from 'react';
import { jsx } from '@emotion/core';
import { MenuGroup } from '@atlaskit/menu';
// eslint-disable-next-line import/no-extraneous-dependencies
import { InstantSearch, Index } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import {
  ContextualAnalyticsData,
  INLINE_DIALOG,
} from '@atlassian/analytics-bridge';
import SearchInput from './SearchInput';
import Results from './Results';
import ResultsWrapper from './ResultsWrapper';
import { useClickOutside } from './utils';

export default function Search() {
  const indices = [
    { name: 'Components', title: 'Components' },
    { name: 'Foundations', title: 'Foundations' },
    { name: 'Patterns', title: 'Patterns' },
    { name: 'Content', title: 'Content' },
    { name: 'Brand', title: 'Brand' },
    { name: 'Resources', title: 'Resources' },
  ];

  const inputRef: RefObject<HTMLInputElement> = useRef();
  const containerRef: RefObject<HTMLDivElement> = useRef();
  const { isOpen, setIsOpen } = useClickOutside(inputRef, containerRef);
  const [query, setQuery] = useState('');

  const searchClient = algoliasearch(
    process.env.GATSBY_CONSTELLATION_ALGOLIA_APP_ID,
    process.env.GATSBY_CONSTELLATION_ALGOLIA_SEARCH_KEY,
  );

  return (
    <InstantSearch
      indexName="Components"
      searchClient={searchClient}
      onSearchStateChange={({ query }) => {
        setQuery(query);
        if (query.length > 0) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }}
    >
      <SearchInput
        ref={inputRef}
        onKeyDown={(event) => {
          switch (event.key) {
            case 'Escape': {
              if (isOpen) {
                setIsOpen(false);
              }
              break;
            }
            default: {
              break;
            }
          }
        }}
        onClick={(event) => {
          event.preventDefault();
          if (!isOpen && query.length) {
            setIsOpen(true);
          }
        }}
      />

      {indices.map(({ name }) => (
        <Index key={name} indexName={name} />
      ))}

      {isOpen && (
        <ContextualAnalyticsData sourceType={INLINE_DIALOG} sourceName="search">
          <ResultsWrapper ref={containerRef} show={isOpen}>
            <MenuGroup>
              <Results />
            </MenuGroup>
          </ResultsWrapper>
        </ContextualAnalyticsData>
      )}
    </InstantSearch>
  );
}
