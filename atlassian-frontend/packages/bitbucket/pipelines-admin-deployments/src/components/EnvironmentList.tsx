import React from 'react';

import Spinner from '@atlaskit/spinner';
import {
  Capabilities,
  Environment,
  RepositoryAssociationSummary,
} from '@atlassian/pipelines-models';

import {
  CreateBranchRestriction,
  CreateEnvironment,
  DeleteBranchRestriction,
  DeleteEnvironment,
  FetchBranches,
  RenderVariableList,
  ReorderEnvironments as ReorderEnvironmentsType,
  UpdateEnvironment,
} from '../types';

import AddEnvironment from './AddEnvironment';
import ReorderEnvironments from './ReorderEnvironments';
import { EnvironmentType, Loading, Wrapper } from './styled';

type Props = {
  capabilities: Capabilities;
  createBranchRestriction: CreateBranchRestriction;
  createEnvironment: CreateEnvironment;
  deleteBranchRestriction: DeleteBranchRestriction;
  deleteEnvironment: DeleteEnvironment;
  environmentTypes: { [type: string]: Environment[] };
  fetchBranches: FetchBranches;
  getIsUpdatingAdminRestriction: (environmentUuid: string) => boolean;
  getIsUpdatingBranchRestriction: (environmentUuid: string) => boolean;
  getIsUpdatingDeploymentGating: (environmentUuid: string) => boolean;
  isFetchingDashboard: boolean;
  isUpdatingEnvironmentList: boolean;
  maxDeploymentEnvironments: number;
  reorderEnvironments: ReorderEnvironmentsType;
  repositoryAssociationSummary: RepositoryAssociationSummary;
  updateEnvironment: UpdateEnvironment;
  renderVariableList: RenderVariableList;
};

const EnvironmentList: React.FC<Props> = (props) => {
  if (props.isFetchingDashboard) {
    return (
      <Loading>
        <Spinner size="large" />
      </Loading>
    );
  }

  return (
    <Wrapper data-testid="environment-list">
      {Object.keys(props.environmentTypes).map((type: string) => (
        <EnvironmentType>
          <h3>{type} environments</h3>
          <ReorderEnvironments
            environments={props.environmentTypes[type]}
            {...props}
          />
          <AddEnvironment {...props} type={type} />
        </EnvironmentType>
      ))}
    </Wrapper>
  );
};

export default React.memo(EnvironmentList);
