import React, { useCallback } from 'react';

import { AsyncSelect } from '@atlaskit/select';

import { BRANCH_SELECTOR_PAGE_SIZE } from '../const';
import { BranchesResponse, BranchOption, FetchBranches } from '../types';

import { Label, SelectorWrapper } from './styled';

type Props = {
  fetchBranches: FetchBranches;
  onChange: (branch: BranchOption | any) => void;
  branchOption: BranchOption | undefined;
};

const RunPipelineBranchSelector: React.FC<Props> = ({
  fetchBranches,
  onChange,
  branchOption,
}) => {
  const loadBranches = useCallback(
    (query: string) =>
      fetchBranches({
        name: query,
        pagelen: BRANCH_SELECTOR_PAGE_SIZE,
      }).then((response: BranchesResponse) =>
        response.values.map(({ name, target }) => ({
          label: name,
          value: name,
          branch: { name, revision: target.hash },
        })),
      ),
    [fetchBranches],
  );

  return (
    <SelectorWrapper>
      <Label>Branch</Label>
      <AsyncSelect
        loadOptions={loadBranches}
        onChange={onChange}
        name="branch"
        placeholder="Select a branch"
        position="bottom left"
        cacheOptions
        defaultOptions
        value={branchOption}
        id="run-pipeline-branch-selector-select"
        instanceId="run-pipeline-branch-selector-select"
      />
    </SelectorWrapper>
  );
};

export default React.memo(RunPipelineBranchSelector);
