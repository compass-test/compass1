import React, { useCallback, useMemo, useState } from 'react';

import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import Spinner from '@atlaskit/spinner';
import * as colors from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import {
  Capabilities,
  Environment,
  RepositoryAssociationSummary,
} from '@atlassian/pipelines-models';

import {
  CreateBranchRestriction,
  DeleteBranchRestriction,
  DeleteEnvironment,
  FetchBranches,
  RenderVariableList,
  UpdateEnvironment,
} from '../types';

import UnlockIcon from './assets/UnlockIcon';
import EnvironmentActions from './EnvironmentActions';
import LicenseGatedFeatures from './LicenseGatedFeatures';
import RenameEnvironment from './RenameEnvironment';
import {
  AccordionButton,
  EnvironmentWrapper,
  ExpandedContent,
  Header,
  HeaderIcon,
  UnrestrictedLockIcon,
} from './styled';

type LockIconProps = {
  hasAdminRestriction: boolean;
  hasBranchRestrictions: boolean;
};

const LockIcon: React.FC<LockIconProps> = ({
  hasAdminRestriction,
  hasBranchRestrictions,
}) => {
  const tooltipContent = useMemo(() => {
    if (hasAdminRestriction && hasBranchRestrictions) {
      return 'Restricted: branch and admins';
    } else if (hasBranchRestrictions) {
      return 'Restricted: branch';
    } else if (hasAdminRestriction) {
      return 'Restricted: admins';
    }
    return 'Unrestricted';
  }, [hasAdminRestriction, hasBranchRestrictions]);
  return (
    <Tooltip content={tooltipContent}>
      <div>
        {/* div required for tooltip positioning */}
        {hasAdminRestriction || hasBranchRestrictions ? (
          <LockFilledIcon label="Restricted" primaryColor={colors.N500} />
        ) : (
          <UnrestrictedLockIcon>
            <UnlockIcon />
          </UnrestrictedLockIcon>
        )}
      </div>
    </Tooltip>
  );
};

type Props = {
  capabilities: Capabilities;
  createBranchRestriction: CreateBranchRestriction;
  deleteBranchRestriction: DeleteBranchRestriction;
  deleteEnvironment: DeleteEnvironment;
  environment: Environment;
  environments: Environment[];
  fetchBranches: FetchBranches;
  isUpdatingAdminRestriction: boolean;
  isUpdatingBranchRestriction: boolean;
  isUpdatingDeploymentGating: boolean;
  maxDeploymentEnvironments: number;
  repositoryAssociationSummary: RepositoryAssociationSummary;
  updateEnvironment: UpdateEnvironment;
  renderVariableList: RenderVariableList;
};

const EnvironmentItem: React.FC<Props> = ({
  capabilities,
  createBranchRestriction,
  deleteBranchRestriction,
  deleteEnvironment,
  environment,
  environments,
  fetchBranches,
  isUpdatingAdminRestriction,
  isUpdatingBranchRestriction,
  isUpdatingDeploymentGating,
  maxDeploymentEnvironments,
  repositoryAssociationSummary,
  updateEnvironment,
  renderVariableList,
}) => {
  const [isFirstExpanded, setIsFirstExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasAdminRestriction = useMemo(() => {
    return environment.hasAdminOnlyRestriction && capabilities.isPremium;
  }, [environment, capabilities]);

  const hasBranchRestrictions = useMemo(() => {
    return !!(environment.branchRestrictions.length && capabilities.isPremium);
  }, [environment, capabilities]);

  const isCreatingEnvironment = useMemo(() => !!environment.uuid, [
    environment,
  ]);

  const isFetching = useMemo(() => {
    return isUpdatingAdminRestriction || isUpdatingBranchRestriction;
  }, [isUpdatingAdminRestriction, isUpdatingBranchRestriction]);

  const showGatingToggle = useMemo(() => {
    return (
      environment.deployment_gate_enabled ||
      repositoryAssociationSummary.hasChangeManagementProjectAssociation
    );
  }, [environment, repositoryAssociationSummary]);

  const isDeploymentGatingToggleDisabled = useMemo(() => {
    return (
      !capabilities.isPaidOrPremium ||
      isUpdatingDeploymentGating ||
      (!repositoryAssociationSummary.hasChangeManagementProjectAssociation &&
        !environment.deployment_gate_enabled)
    );
  }, [
    capabilities,
    environment,
    isUpdatingDeploymentGating,
    repositoryAssociationSummary,
  ]);

  const toggleExpansion = useCallback(() => {
    setIsFirstExpanded(true);
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsFirstExpanded, setIsExpanded]);

  const toggleAdminRestriction = useCallback(() => {
    updateEnvironment(environment.uuid, {
      restrictions: { admin_only: !environment.hasAdminOnlyRestriction },
    });
  }, [environment, updateEnvironment]);

  const toggleDeploymentGating = useCallback(() => {
    updateEnvironment(environment.uuid, {
      deployment_gate_enabled: !environment.deployment_gate_enabled,
    });
  }, [environment, updateEnvironment]);

  if (!isCreatingEnvironment) {
    return (
      <EnvironmentWrapper>
        <Header>
          <HeaderIcon>
            <Spinner />
          </HeaderIcon>
          <h4>{environment.name}</h4>
        </Header>
      </EnvironmentWrapper>
    );
  }

  return (
    <EnvironmentWrapper>
      <Header onClick={toggleExpansion} data-testid="environment-header">
        <HeaderIcon>
          {isFetching ? (
            <Spinner />
          ) : (
            <LockIcon
              hasAdminRestriction={hasAdminRestriction}
              hasBranchRestrictions={hasBranchRestrictions}
            />
          )}
        </HeaderIcon>
        <h4>{environment.name}</h4>
        <AccordionButton isExpanded={isExpanded}>
          <ChevronRightIcon label="Expand" size="large" />
        </AccordionButton>
      </Header>
      <ExpandedContent isExpanded={isExpanded}>
        <>
          <RenameEnvironment
            environment={environment}
            environments={environments}
            capabilities={capabilities}
            updateEnvironment={updateEnvironment}
            maxDeploymentEnvironments={maxDeploymentEnvironments}
          />
          <EnvironmentActions
            environment={environment}
            deleteEnvironment={deleteEnvironment}
          />
        </>
        {isFirstExpanded && (
          <>
            <LicenseGatedFeatures
              capabilities={capabilities}
              environment={environment}
              isFetching={isFetching}
              showGatingToggle={showGatingToggle}
              hasAdminRestriction={hasAdminRestriction}
              isDeploymentGatingToggleDisabled={
                isDeploymentGatingToggleDisabled
              }
              fetchBranches={fetchBranches}
              toggleDeploymentGating={toggleDeploymentGating}
              toggleAdminRestriction={toggleAdminRestriction}
              createBranchRestriction={createBranchRestriction}
              deleteBranchRestriction={deleteBranchRestriction}
            />
            <h5>Variables</h5>
            {renderVariableList(environment)}
          </>
        )}
      </ExpandedContent>
    </EnvironmentWrapper>
  );
};

export default React.memo(EnvironmentItem);
