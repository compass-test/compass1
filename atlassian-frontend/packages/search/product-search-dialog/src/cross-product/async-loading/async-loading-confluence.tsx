import React, { Suspense } from 'react';
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize } from '@atlaskit/theme';
import { ConfluenceSearchDialogContentProps } from '../../confluence';
import { SearchFooter } from '@atlassian/search-dialog';
import { ConfluenceAdvancedSearch } from '../../confluence/advanced-search';
import { TimeLazyLoad } from '../../common/lazy-load-timing';
import { LoadingSpinner } from '../../common/loading-spinner';

const ConfluenceComponent = React.lazy(() =>
  import(
    /* webpackChunkName: "@atlaskit-internal_@atlassian/product-search-dialog/async-chunk/confluence-dialog" */ '../../confluence'
  ).then(({ ConfluenceSearchDialogContent }) => ({
    default: ConfluenceSearchDialogContent,
  })),
);

const ResultsContainer = styled.div`
  padding: ${gridSize()}px 0;
  flex: 1;
`;

const LoadingHeightContainer = styled.div<{ minHeight?: number }>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.minHeight ? `${props.minHeight}px` : 'auto')};
`;

export const AsyncConfluence: React.FunctionComponent<ConfluenceSearchDialogContentProps> = (
  props,
) => {
  return (
    <Suspense
      fallback={
        <TimeLazyLoad product="confluence">
          <LoadingHeightContainer minHeight={props.dialogHeight}>
            <ResultsContainer>
              <LoadingSpinner />
            </ResultsContainer>
            <SearchFooter>
              <ConfluenceAdvancedSearch
                linkComponent={props.linkComponent}
                query={props.query}
                isLoading
              />
            </SearchFooter>
          </LoadingHeightContainer>
        </TimeLazyLoad>
      }
    >
      <ConfluenceComponent {...props} />
    </Suspense>
  );
};
