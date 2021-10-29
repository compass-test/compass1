import React, { useCallback } from 'react';

import BranchIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import AsyncSelect from '@atlaskit/select/AsyncSelect';
import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { Branch } from '@atlassian/pipelines-models';

import { BranchesListProps } from '../types';

import {
  BranchesListWrapper,
  BranchItem,
  BranchName,
  subtleSelector,
} from './styled';

const formatOption = (branch: Branch) => (
  <BranchItem>
    <BranchIcon label="branch" size="small" primaryColor={colors.N90} />
    <BranchName>{branch.name}</BranchName>
  </BranchItem>
);

const formatOptions = (branches: Branch[]) =>
  branches.length > 0
    ? [
        {
          label: 'main branch', // main branch is first on any branch list
          options: [
            { label: formatOption(branches[0]), value: branches[0].name },
          ],
        },
        {
          label: 'other branches',
          options: branches
            .slice(1) // removes main branch from the list
            .map((branch) => ({
              label: formatOption(branch),
              value: branch.name,
            })),
        },
      ]
    : [];

export const BranchesListFilter = ({
  getBranches,
  defaultBranchValue,
  onBranchChange,
}: BranchesListProps) => {
  const loadOptions = useCallback(
    (search: string) => getBranches(search).then(formatOptions),
    [getBranches],
  );

  return (
    <BranchesListWrapper>
      <AsyncSelect
        inputId="pipeline-branch-filter"
        placeholder="Branch"
        loadOptions={loadOptions}
        onChange={onBranchChange}
        defaultValue={
          defaultBranchValue
            ? {
                label: formatOption(defaultBranchValue),
                value: defaultBranchValue.name,
              }
            : null
        }
        styles={{
          control: (css, state) => ({
            ...css,
            ...subtleSelector(css as any, state),
            width: gridSize() * 26,
          }),
          menu: (base) => ({ ...base, width: gridSize() * 36 }),
        }}
        cacheOptions
        defaultOptions
        isClearable
      />
    </BranchesListWrapper>
  );
};
