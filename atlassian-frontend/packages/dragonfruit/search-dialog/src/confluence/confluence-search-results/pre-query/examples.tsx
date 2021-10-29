import React from 'react';
import { IntlProvider } from 'react-intl';
import styled from 'styled-components';
import { ConfluencePreQuery } from './confluence-pre-query';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../../../__tests__/__fixtures__/mock-search-results';
import { action } from '@storybook/addon-actions';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import { ScreenType } from '../../../common/analytics';

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
  searchResultSelected: action('search result selected'),
  advancedSearchSelected: action('advanced search selected'),
  searchSessionId: 'fakeSearchSessionId',
  isLoading: false,
  components: [],
  teams: [],
  screenType: 'preQuerySearchResults' as ScreenType,
};

const emptyProps = {
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
  height: 500px;
  width: 780px;
  border: 1px solid black;
`;

export const PreQueryBasic = () => <ConfluencePreQuery {...defaultProps} />;

export const PreQueryNoResults = () => (
  <ConfluencePreQuery {...defaultProps} {...emptyProps} />
);

export const PreQueryNoItem = () => <ConfluencePreQuery {...defaultProps} />;

export const PreQueryNoSpace = () => <ConfluencePreQuery {...defaultProps} />;

export const PreQueryNoPeople = () => <ConfluencePreQuery {...defaultProps} />;

export default {
  title: 'Confluence Search Dialog/Confluence Pre Query',
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
