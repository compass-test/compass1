import React, { Suspense } from 'react';
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { JiraSearchDialogContentProps } from '../../jira';
import { SearchFooter } from '@atlassian/search-dialog';
import { TimeLazyLoad } from '../../common/lazy-load-timing';
import { LoadingSpinner } from '../../common/loading-spinner';
import { JiraAdvancedSearch } from '../../jira/jira-advanced-search';

const JiraComponent = React.lazy(() =>
  import(
    /* webpackChunkName: "@atlaskit-internal_@atlassian/product-search-dialog/async-chunk/jira-dialog" */ '../../jira'
  ).then(({ JiraSearchDialogContent }) => ({
    default: JiraSearchDialogContent,
  })),
);

const ResultsContainer = styled.div`
  padding: ${gridSize()}px 0;
  flex: 1;
`;

const LoadingHeightContainer = styled.div<{ minHeight: number | undefined }>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.minHeight ? `${props.minHeight}px` : 'auto')};
`;

export const AsyncJira = (props: JiraSearchDialogContentProps) => {
  return (
    <Suspense
      fallback={
        <TimeLazyLoad product="jira">
          <LoadingHeightContainer minHeight={props.dialogHeight}>
            <ResultsContainer>
              <LoadingSpinner />
            </ResultsContainer>
            <SearchFooter>
              <JiraAdvancedSearch
                query={props.query}
                onClick={props.onNavigate}
                isLoading
              />
            </SearchFooter>
          </LoadingHeightContainer>
        </TimeLazyLoad>
      }
    >
      <JiraComponent {...props} />
    </Suspense>
  );
};
