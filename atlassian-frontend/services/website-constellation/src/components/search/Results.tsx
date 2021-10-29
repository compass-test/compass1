/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Section } from '@atlaskit/menu';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connectStateResults } from 'react-instantsearch-dom';
import EmptyState from '@atlaskit/empty-state';
import Spinner from '@atlaskit/spinner';
import { N800, N300 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import {
  FireScreenAnalytics,
  ContextualAnalyticsData,
} from '@atlassian/analytics-bridge';

import { LinkItem, HeadingItem } from './Items';
import Highlight from './Highlight';
import noResultsImg from '../../images/no-results.png';

export default connectStateResults(
  ({ searchState: state, allSearchResults, searching }) => {
    if (searching) {
      return (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 20px',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Spinner />
        </div>
      );
    }

    const results = allSearchResults
      ? Object.entries(allSearchResults).filter(([, searchResults]) => {
          return searchResults.hits.length;
        })
      : [];

    const renderedResults = results.length ? (
      results.map(([indexName, searchResults]) => (
        <Section key={indexName}>
          <HeadingItem indexName={indexName}>
            <p
              css={{
                paddingLeft: '12px',
                fontWeight: 500, // semibold
                letterSpacing: 1,
              }}
            >
              {indexName}
            </p>
          </HeadingItem>
          {searchResults.hits.map((hit) => (
            <LinkItem key={`${indexName}--${hit.id}`} to={hit.path}>
              <p
                css={{
                  fontSize: '16px',
                  color: N800,
                  marginBottom: gridSize() / 2,
                  letterSpacing: '-0.096px',
                }}
              >
                <Highlight hit={hit} attribute="title" />
              </p>
              <p
                css={{
                  fontSize: '14px',
                  color: N300,
                  margin: 0,
                }}
              >
                <Highlight hit={hit} attribute="description" />
              </p>
            </LinkItem>
          ))}
        </Section>
      ))
    ) : (
      <EmptyState
        imageUrl={noResultsImg}
        header={`No results found for ${state.query}`}
        description="Keep searching"
      />
    );

    return (
      <ContextualAnalyticsData
        attributes={{
          resultsCount: results ? results.length : 0,
        }}
      >
        <FireScreenAnalytics key={state.query} />
        {renderedResults}
      </ContextualAnalyticsData>
    );
  },
);
