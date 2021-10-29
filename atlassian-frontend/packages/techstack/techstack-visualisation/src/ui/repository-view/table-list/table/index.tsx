import React, { FC } from 'react';

import max from 'lodash/max';

import { DynamicTableStateless } from '@atlaskit/dynamic-table';

import {
  Cell,
  Solution,
  TechStack,
  UseCase,
  UsedStack,
} from '../../../../common/types';
import { SolutionCell } from '../../../../common/ui/solution-cell';
import { UseCaseCell } from '../../../../common/ui/use-case-cell';
import { useFilters } from '../../../../controllers/filters';

import { TableWrapper } from './styled';

const filterTechStack = (
  techStack: TechStack,
  showUnavailable: boolean,
): TechStack => {
  const unavailableFilter = !showUnavailable
    ? (solution: Solution) => solution.status !== 'unavailable'
    : () => true;

  return [
    ...techStack.map(useCase => ({
      ...useCase,
      solutions: useCase.solutions.filter(unavailableFilter),
    })),
  ];
};

const getMaximumNumberOfSolutions = (techStack: TechStack): number => {
  const maxSolutions: number | void = max(
    techStack.map((useCase: UseCase) => useCase.solutions.length),
  );
  if (maxSolutions) {
    return maxSolutions;
  } else {
    return 0;
  }
};

export const Table: FC<{
  techStack: TechStack;
  metaName: string;
  usedStack: UsedStack;
}> = ({ techStack, metaName, usedStack }) => {
  const [filterState] = useFilters();
  const filteredTechStack = filterTechStack(
    techStack,
    filterState.showUnavailable,
  );
  const solutionsCount: number = getMaximumNumberOfSolutions(filteredTechStack);

  const renderHead = () => {
    const headerCells = Array(solutionsCount + 1)
      .fill(undefined)
      .map((_, index) => ({
        isSortable: false,
        content: index
          ? index === 1
            ? 'Latest'
            : `n-${index - 1}`
          : 'Use case',
      }));

    return { cells: headerCells };
  };
  const getRows = () => {
    return techStack.reduce((acc: any, useCase, rowNumber) => {
      const cells: Cell[] = Array(solutionsCount + 1)
        .fill(undefined)
        .map((_, index) => ({
          isSortable: false,
          key: index,
          content: index ? (
            <SolutionCell
              useCase={techStack[rowNumber]}
              solution={techStack[rowNumber]['solutions'][index - 1]}
              usedStack={usedStack}
            />
          ) : (
            <UseCaseCell useCase={techStack[rowNumber]} usedStack={usedStack} />
          ),
        }));
      return [...acc, { cells, key: useCase.id }];
    }, []);
  };
  return (
    <TableWrapper>
      <DynamicTableStateless
        caption={metaName}
        head={renderHead()}
        rows={getRows()}
      />
    </TableWrapper>
  );
};
