import React, { FC } from 'react';

import merge from 'lodash/merge';

import { useFilters } from '../../../controllers/filters';

import { Table } from './table';

// This function is needed to support old techstackrc format
const getTechstack = ({ techStack, key }: { techStack: any; key: string }) =>
  techStack[key] ? techStack[key] : techStack;

export const TableList: FC<{ data: any }> = ({ data }) => {
  const [filterState] = useFilters();
  const usedTechStackForPackage =
    filterState['package'] !== 'all'
      ? merge(
          data.techstack[filterState['package']],
          getTechstack({ techStack: data.techstack['all'], key: 'default' }),
        )
      : getTechstack({ techStack: data.techstack['all'], key: 'repository' });

  return (
    <>
      {Object.keys(usedTechStackForPackage).map(techStack => {
        return (
          <Table
            key={techStack}
            techStack={data.definitions[techStack]}
            metaName={techStack}
            usedStack={usedTechStackForPackage[techStack]}
          />
        );
      })}
    </>
  );
};
