import React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import { ConfluencePostQuery } from './confluence-post-query';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../../../__tests__/__fixtures__/mock-search-results';
import { action } from '@storybook/addon-actions';
import { ScreenType } from '../../../common/analytics/events';
import { SearchSessionProvider } from '../../../common/search-session-provider';

const defaultProps = {
  items: {
    isLoading: false,
    results: createPageBlogAttachmentResults(3),
  },
  spaces: {
    isLoading: false,
    results: createSpaceResponse(3),
  },
  people: {
    isLoading: false,
    results: createPeopleResults(3),
  },
  query: 'abc',
  enabledFilters: [],
  searchResultSelected: action('search result selected'),
  advancedSearchSelected: action('advanced search clicked'),
  showMoreClicked: action('show more clicked'),
  showAllClicked: action('show all clicked'),
  searchSessionId: 'fakeSearchSessionId',
  screenType: 'postQuerySearchResults' as ScreenType,
  isLoading: false,
  isCollapsed: false,
};

const emptyProps = {
  ...defaultProps,
  items: {
    isLoading: false,
    results: {
      items: [],
      totalSize: 0,
      timings: 0,
    },
  },
  spaces: {
    isLoading: false,
    results: {
      items: [],
      timings: 0,
    },
  },
  people: {
    isLoading: false,
    results: {
      items: [],
      timings: 0,
    },
  },
};

const Container = styled.div`
  height: calc(100vh - 160px);
  width: 780px;
  border: 1px solid black;
  padding: 8px 0;
`;

export const DefaultPostQuery = () => <ConfluencePostQuery {...defaultProps} />;

export const PostQueryCollapsed = () => (
  <ConfluencePostQuery {...defaultProps} isCollapsed />
);

export const NoResultsPostQuery = () => <ConfluencePostQuery {...emptyProps} />;

export const NoItemPostQuery = () => (
  <ConfluencePostQuery {...defaultProps} items={emptyProps.items} />
);

export const NoSpacePostQuery = () => (
  <ConfluencePostQuery {...defaultProps} spaces={emptyProps.spaces} />
);

export const NoPeoplePostQuery = () => (
  <ConfluencePostQuery {...defaultProps} people={emptyProps.people} />
);

export const ItemsPostQuery25 = () => (
  <ConfluencePostQuery
    {...defaultProps}
    items={{
      isLoading: false,
      results: {
        ...createPageBlogAttachmentResults(25),
        totalSize: 25,
      },
    }}
  />
);

export const ItemsPostQuery150 = () => (
  <ConfluencePostQuery
    {...defaultProps}
    items={{
      isLoading: false,
      results: {
        ...createPageBlogAttachmentResults(30),
        totalSize: 150,
      },
    }}
  />
);

export const PostQueryRenderingIntermediateResultsFasterSearch = () => (
  <ConfluencePostQuery {...defaultProps} screenType="cachedResults" />
);

export default {
  title: 'Confluence Search Dialog/Confluence Post Query',
  decorators: [
    (story: () => React.ElementType) => (
      <Container>
        <SearchSessionProvider sessionKey="story_session_key">
          <IntlProvider locale="en">{story()}</IntlProvider>
        </SearchSessionProvider>
      </Container>
    ),
  ],
};
