import React from 'react';
import { IntlProvider } from 'react-intl';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { SearchSessionProvider } from '../../../common/search-session-provider';
import {
  createJiraIssueResponse,
  createBoardProjectFilterResponse,
} from '../../../__tests__/__fixtures__/mock-jira-results';
import {
  IssueSearchResultsList,
  BoardsProjectFiltersSearchResultsList,
} from './jira-search-results-lists';
import { AttributeType, AttributeBoard } from '../../clients/response-types';

const PageContainer = styled.div`
  width: 780px;
  border: 1px solid black;
`;

const commonProps = {
  screenType: 'postQuerySearchResults',
  onSelect: action('issue result selected'),
  analyticContext: {
    sectionIndex: 100,
    totalNumberOfItemsInPreviousSections: 100,
  },
};

export const IssueResults = () => (
  <IssueSearchResultsList
    {...commonProps}
    screenType={'postQuerySearchResults'}
    results={createJiraIssueResponse(30).items}
  />
);

export const BoardsProjectsFiltersResults = () => (
  <BoardsProjectFiltersSearchResultsList
    {...commonProps}
    screenType={'postQuerySearchResults'}
    results={createBoardProjectFilterResponse(10).items}
  />
);

export const BoardsWithMissingAvatar = () => {
  const results = createBoardProjectFilterResponse(10);
  const firstBoard = results.items.find(
    (result) => result.attributes['@type'] === AttributeType.board,
  );
  if (firstBoard) {
    delete (firstBoard.attributes as AttributeBoard).avatar;
  }
  return (
    <BoardsProjectFiltersSearchResultsList
      {...commonProps}
      screenType={'postQuerySearchResults'}
      results={results.items}
    />
  );
};

export default {
  title: 'Jira Search Dialog/Search Results/Lists',
  decorators: [
    (story: () => React.ElementType) => (
      <SearchSessionProvider sessionKey="">
        <PageContainer>
          <IntlProvider locale="en">{story()}</IntlProvider>
        </PageContainer>
      </SearchSessionProvider>
    ),
  ],
};
