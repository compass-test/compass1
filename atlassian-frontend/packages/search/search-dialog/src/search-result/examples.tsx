import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from '@emotion/styled';
import BoardIcon from '@atlaskit/icon/glyph/board';
import ListIcon from '@atlaskit/icon/glyph/list';
import FilterIcon from '@atlaskit/icon/glyph/filter';
import { SearchResult } from './search-result';
import { dialogWidth } from '../style-utils';
import { TestSearchKeyboardProvider } from '../search-keyboard';

// Fake data
// -----------------------------
const issueProps = {
  containerDetail: 'This is the container detail',
  href: '#',
  icon: <img src="http://lorempixel.com/24/24/cats" alt="business" />,
  label: 'GP-103',
  timeDetail: <div>Updated May 18, 2019</div>,
  title: 'Query parameters missing from landing page URL',
};

const boardProps = {
  containerDetail: 'e-services primary Lead',
  href:
    '/secure/RapidBoard.jspa?rapidView=da417a6a-07e0-4526-80c8-27d70b583b00&searchSessionId=6ab74e81-c430-40aa-ba85-80302e9d0280',
  icon: <BoardIcon label="board" />,
  title: 'Board 393 example',
};

const filterProps = {
  containerDetail: 'e-services primary Lead',
  href:
    '/secure/RapidBoard.jspa?rapidView=da417a6a-07e0-4526-80c8-27d70b583b00&searchSessionId=6ab74e81-c430-40aa-ba85-80302e9d0280',
  icon: <FilterIcon label="filter" />,
  title: 'Filtering is a good thing',
};

const projectProps = {
  href: '/browse/CIIAA?searchSessionId=979f5747-def7-4af1-91d9-7173564db14d',
  icon: <img src="http://lorempixel.com/24/24/cats" alt="business" />,
  title: 'harum illo quos minima facilis',
};

const defaultProps = {
  containerDetail: 'Facilities Workplace Support',
  href: 'https://www.atlassian.com/',
  icon: <ListIcon label="I'm an icon" />,
  onClick: (e: any) => {
    e.preventDefault();
    action('onClick')(e);
  },
  timeDetail: <div>Updated May 14, 2019</div>,
  title:
    'PSA: 752 feature flags got evaluated to default value specified in the code! :omg:',
};

// Stories
// -----------------------------
export const Basic = () => (
  <SearchResult
    {...defaultProps}
    href={`https://www.atlassian.com/${Math.random()}`}
  />
);

export const Collapsed = () => <SearchResult {...defaultProps} isCollapsed />;

export const WithVisitedLink = () => (
  <SearchResult {...defaultProps} href={`https://www.atlassian.com/`} />
);

export const KeyboardHighlighted = () => (
  <TestSearchKeyboardProvider allHighlighted>
    <SearchResult {...defaultProps} />
  </TestSearchKeyboardProvider>
);

export const MissingSomeDetail = () => (
  <>
    <p>Missing time</p>
    <SearchResult
      {...defaultProps}
      timeDetail={undefined}
      href={`https://www.atlassian.com/`}
    />
    <p>Missing container</p>
    <SearchResult
      {...defaultProps}
      containerDetail={undefined}
      href={`https://www.atlassian.com/`}
    />
    <p>Missing both</p>
    <SearchResult
      {...defaultProps}
      timeDetail={undefined}
      containerDetail={undefined}
      href={`https://www.atlassian.com/`}
    />
  </>
);

export const WithLongDetail = () => (
  <SearchResult
    {...defaultProps}
    containerDetail={'Facilities Workplace Support For Technical Staff'}
    timeDetail={<div>Updated yesterday at 11:04 AM</div>}
    href={`https://www.atlassian.com/`}
  />
);

export const InDialogSizedContainers = () => {
  const DialogSizedContainer = styled.div`
    width: ${dialogWidth};
    border: 1px solid grey;
    margin-bottom: 8px;
    padding: 8px;
    box-sizing: border-box;
  `;

  return (
    <DialogSizedContainer>
      <SearchResult
        {...defaultProps}
        href={`https://www.atlassian.com/${Math.random()}`}
      />
      <TestSearchKeyboardProvider allHighlighted>
        <SearchResult {...defaultProps} />
      </TestSearchKeyboardProvider>
    </DialogSizedContainer>
  );
};

export const SomeWithLabelBeforeTitle = () => (
  <>
    <SearchResult
      {...defaultProps}
      href={`https://www.atlassian.com/${Math.random()}`}
      label="QS-1191"
    />
    <SearchResult
      {...defaultProps}
      href={`https://www.atlassian.com/${Math.random()}`}
      label="QS-349"
    />
    <SearchResult
      {...defaultProps}
      href={`https://www.atlassian.com/${Math.random()}`}
      label="QS-55391"
    />
    <SearchResult
      {...defaultProps}
      href={`https://www.atlassian.com/${Math.random()}`}
    />
  </>
);

export const WithCustomLinkComponent = () => (
  <SearchResult
    {...defaultProps}
    href={`https://www.atlassian.com/${Math.random()}`}
    linkComponent={styled.div``}
  />
);

export const IssueCollapsed = () => (
  <SearchResult {...issueProps} isCollapsed />
);

export const IssueCollapsedLongTitle = () => (
  <SearchResult
    {...issueProps}
    title="This is a really, really long title that should test how resilient a design is!"
    isCollapsed
  />
);

export const BoardCollapsed = () => (
  <SearchResult {...boardProps} isCollapsed />
);

export const BoardCollapsedLongTitle = () => (
  <SearchResult
    {...boardProps}
    title="This is a really, really long title that should test how resilient a design is!"
    isCollapsed
  />
);

export const ProjectCollapsed = () => (
  <SearchResult {...projectProps} isCollapsed />
);

export const ProjectCollapsedLongTitle = () => (
  <SearchResult
    {...projectProps}
    title="This is a really, really long title that should test how resilient a design is!"
    isCollapsed
  />
);

export const FlterCollapsed = () => (
  <SearchResult {...filterProps} isCollapsed />
);

export const FilterCollapsedLongTitle = () => (
  <SearchResult
    {...filterProps}
    title="This is a really, really long title that should test how resilient a design is!"
    isCollapsed
  />
);

export default {
  title: 'Search Dialog/Search Result',
  decorators: [
    (story: () => React.ElementType) => (
      <TestSearchKeyboardProvider allHighlighted={false}>
        {story()}
      </TestSearchKeyboardProvider>
    ),
  ],
};
