import React from 'react';

import { Branch } from '@atlassian/pipelines-models';

import { Filters } from '../src';
import StaticStatusIcon from '../src/components/StatusIcon/StaticStatusIcon';
import { branches } from '../src/mocks/branches';
import { filterParams } from '../src/mocks/filter-params';
import { pipelinesDefinitions } from '../src/mocks/pipelinesDefinitions';
import { statuses } from '../src/mocks/statuses';
import { triggerTypes } from '../src/mocks/triggerTypes';
import { users } from '../src/mocks/users';

const getBranches = (search?: string) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(branches);
    }, 1000);
  });
  return promise as Promise<Branch[]>;
};

const PipelinesFilters = () => (
  <div>
    <Filters
      url="foo"
      onUpdateFilter={(filters) => {
        console.log('onUpdateFilter', filters);
      }}
      triggerTypes={triggerTypes}
      statuses={statuses}
      pipelineDefinitions={pipelinesDefinitions}
      getBranches={getBranches}
      defaultBranchValue={branches[0]}
      onBranchChange={(selectedOption) => console.log(selectedOption)}
      parseFilterPathParam={() => {
        return filterParams;
      }}
      getFilterQuery={() => ''}
      users={users}
      showSearchFilter
      showUsersFilter
    />
    <StaticStatusIcon iconName="success" iconText="test" />
  </div>
);

export default PipelinesFilters;
