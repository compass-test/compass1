import React, { FC } from 'react';

import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import { RouterStoreContext } from '@atlaskit/router';
import Spinner from '@atlaskit/spinner';

import { Cell, TechStack } from '../../common/types';
import { SolutionCell } from '../../common/ui/solution-cell';
import { UseCaseCell } from '../../common/ui/use-case-cell';
import FetchTechStack from '../../services/fetch-techstack';

import { SpinnerWrapper, TableWrapper } from './styled';

export const Home: FC<RouterStoreContext> = () => {
  const renderHead = () => {
    const headerCells = Array(2)
      .fill(undefined)
      .map((_, index) => ({
        isSortable: false,
        content: index ? 'Latest' : 'Use case',
      }));

    return { cells: headerCells };
  };
  const getRows = (techStack: TechStack) => {
    return techStack.reduce((acc: any, useCase, rowNumber) => {
      const cells: Cell[] = Array(2)
        .fill(undefined)
        .map((_, index) => ({
          isSortable: false,
          key: index,
          content: index ? (
            <SolutionCell
              useCase={techStack[rowNumber]}
              solution={techStack[rowNumber]['solutions'][index - 1]}
              usedStack={{}}
            />
          ) : (
            <UseCaseCell
              useCase={techStack[rowNumber]}
              usedStack={{}}
              highlightIsUsed={false}
            />
          ),
        }));
      return [...acc, { cells, key: useCase.id }];
    }, []);
  };
  return (
    <FetchTechStack>
      {({ loading, data }: { loading: boolean; data: any }) => {
        if (loading) {
          return (
            <SpinnerWrapper>
              <Spinner size={'large'} />
            </SpinnerWrapper>
          );
        }
        if (!data) {
          return null;
        }
        return (
          <TableWrapper>
            <DynamicTableStateless
              caption={'Frontend Techstack'}
              head={renderHead()}
              rows={getRows(data.definitions['@atlassian/frontend'])}
            />
          </TableWrapper>
        );
      }}
    </FetchTechStack>
  );
};
