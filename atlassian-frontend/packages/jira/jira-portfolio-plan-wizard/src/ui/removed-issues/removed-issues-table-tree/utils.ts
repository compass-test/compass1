import flatten from 'lodash/fp/flatten';
import groupBy from 'lodash/fp/groupBy';
import isEmpty from 'lodash/fp/isEmpty';

import { ThemeAppearance } from '@atlaskit/lozenge';

import { Issue } from '../../../common/types';
import { DEFAULT_HIERARCHY_LEVEL } from '../../../common/utils/constants';

import { TableItem } from './types';

export const getAllDescendants = (item: TableItem): TableItem[] => [
  item,
  // Add its children
  ...(item.children && !isEmpty(item.children)
    ? flatten(item.children.map(getAllDescendants))
    : []),
];

const lexoRankComparator = (
  rank1: Issue['values']['lexoRank'],
  rank2: Issue['values']['lexoRank'],
) => {
  if (rank1 < rank2) {
    return -1;
  } else if (rank1 > rank2) {
    return 1;
  } else {
    return 0;
  }
};

export const buildHierarchyTree = (
  hierarchyLevelByType: { [type: string]: number },
  issues: Issue[],
) => {
  const groupedByLevel = groupBy(
    (issue) =>
      hierarchyLevelByType[issue.values.type] || DEFAULT_HIERARCHY_LEVEL,
    issues,
  );

  const lowestToHighest = Object.entries(groupedByLevel).sort(
    ([key], [key2]) => Number(key) - Number(key2),
  );

  return lowestToHighest.reduce((result, [level, thisLevelIssues]) => {
    // Put it into result, following parent path
    const consumedIssue: TableItem[] = [];
    const mergedChildren = thisLevelIssues.map((issue) => {
      const children = result
        .filter((maybeChild) => {
          const isChildren = maybeChild.issue.values.parent === issue.id;
          if (isChildren) {
            consumedIssue.push(maybeChild);
          }
          return isChildren;
        })
        .sort(
          (
            {
              issue: {
                values: { lexoRank: rank1 },
              },
            },
            {
              issue: {
                values: { lexoRank: rank2 },
              },
            },
          ) => lexoRankComparator(rank1, rank2),
        );

      return {
        level: Number(level),
        issue,
        children: isEmpty(children) ? null : children,
      };
    });

    const orphans = result.filter((item) => !consumedIssue.includes(item));

    return [...mergedChildren, ...orphans].sort(
      (
        {
          issue: {
            values: { lexoRank: rank1 },
          },
        },
        {
          issue: {
            values: { lexoRank: rank2 },
          },
        },
      ) => lexoRankComparator(rank1, rank2),
    );
  }, [] as TableItem[]);
};

export const STATUS_COLOR_REMAP: {
  [color: string]: ThemeAppearance;
} = {
  'medium-gray': 'default',
  'blue-gray': 'default',
  yellow: 'inprogress',
  green: 'success',
};
