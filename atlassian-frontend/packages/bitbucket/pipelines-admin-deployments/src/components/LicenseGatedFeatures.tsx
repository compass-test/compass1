import React, { useCallback, useMemo } from 'react';

import Button from '@atlaskit/button';
import BranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import PremiumIcon from '@atlaskit/icon/glyph/premium';
import { AsyncCreatableSelect } from '@atlaskit/select';
import * as colors from '@atlaskit/theme/colors';
import Toggle from '@atlaskit/toggle';
import Tooltip from '@atlaskit/tooltip';
import { Capabilities, Environment } from '@atlassian/pipelines-models';

import { DOCS_DEPLOYMENT_GATING, DOCS_PREMIUM_BITBUCKET_PLAN } from '../const';
import {
  CreateBranchRestriction,
  DeleteBranchRestriction,
  FetchBranches,
} from '../types';

import {
  AdminRestriction,
  BranchMenuItem,
  BranchRestrictionsWrapper,
  DeploymentGatingWrapper,
  InlinePremiumIconWrapper,
  LicenseRestrictionMessage,
  Separator,
  Title,
  ToggleWrapper,
} from './styled';

type Props = {
  capabilities: Capabilities;
  createBranchRestriction: CreateBranchRestriction;
  deleteBranchRestriction: DeleteBranchRestriction;
  environment: Environment;
  fetchBranches: FetchBranches;
  hasAdminRestriction: boolean;
  isDeploymentGatingToggleDisabled: boolean;
  isFetching: boolean;
  showGatingToggle: boolean;
  toggleAdminRestriction: () => void;
  toggleDeploymentGating: () => void;
};

const LicenseGatedFeatures: React.FC<Props> = ({
  capabilities,
  createBranchRestriction,
  deleteBranchRestriction,
  environment,
  fetchBranches,
  hasAdminRestriction,
  isDeploymentGatingToggleDisabled,
  isFetching,
  showGatingToggle,
  toggleAdminRestriction,
  toggleDeploymentGating,
}) => {
  const value = useMemo(() => {
    if (
      environment.branchRestrictions.length === 0 ||
      !capabilities.isPremium
    ) {
      return [];
    }
    return environment.branchRestrictions.map(({ pattern }) => ({
      value: pattern,
      label: pattern,
    }));
  }, [environment, capabilities]);

  const loadBranches = useCallback(
    (query: string) =>
      fetchBranches(query).then((response) => [
        {
          label: 'Branches',
          options: response.values.map((branch) => ({
            label: branch.name,
            value: branch.name,
          })),
        },
      ]),
    [fetchBranches],
  );

  const handleCreate = useCallback(
    (pattern: string) => createBranchRestriction(environment.uuid, pattern),
    [environment, createBranchRestriction],
  );

  const handleChange = useCallback(
    (newRestrictions: { value: string }[]) => {
      const branchRestrictions = environment.branchRestrictions;
      newRestrictions = newRestrictions || [];
      if (newRestrictions.length > branchRestrictions.length) {
        newRestrictions
          .filter(
            ({ value }) =>
              !branchRestrictions.some(
                (restriction) => restriction.pattern === value,
              ),
          )
          .forEach(({ value }) => handleCreate(value));
      } else {
        const restrictions = branchRestrictions.filter(({ pattern }) =>
          newRestrictions.length
            ? !newRestrictions.some(({ value }) => pattern === value)
            : true,
        );
        restrictions.forEach(({ uuid }) =>
          deleteBranchRestriction(environment.uuid, uuid),
        );
      }
    },
    [environment, handleCreate, deleteBranchRestriction],
  );

  const formatOptionLabel = useCallback(
    ({ label, value }, { context }) =>
      context === 'menu' && label === value ? (
        <BranchMenuItem>
          <BranchesIcon size="medium" label="Branch" />
          {value}
        </BranchMenuItem>
      ) : (
        label
      ),
    [],
  );

  const validateNewOption = useCallback(
    (inputValue, selectValue, selectOptions) => {
      const compareOption = (value: any, option: any) =>
        option.options
          ? option.options.some(
              (o: any) => o.value.toLowerCase() === value.toLowerCase(),
            )
          : option.value.toLowerCase() === value.toLowerCase();
      return !(
        !inputValue ||
        selectValue.some((option: any) => compareOption(inputValue, option)) ||
        selectOptions.some((option: any) => compareOption(inputValue, option))
      );
    },
    [],
  );
  return (
    <>
      <BranchRestrictionsWrapper>
        <Title isPremium={capabilities.isPremium}>
          Branches allowed to deploy to {environment.name}:
        </Title>
        <AsyncCreatableSelect
          formatOptionLabel={formatOptionLabel}
          isDisabled={isFetching || !capabilities.isPremium}
          isLoading={isFetching}
          isValidNewOption={validateNewOption}
          loadOptions={loadBranches}
          onChange={handleChange as any}
          onCreateOption={handleCreate}
          placeholder="All branches can deploy - to restrict: select branch or type a glob pattern"
          value={value}
          defaultOptions
          isMulti
        />
      </BranchRestrictionsWrapper>
      {showGatingToggle && (
        <div>
          <DeploymentGatingWrapper
            isPaidOrPremium={capabilities.isPaidOrPremium}
          >
            <ToggleWrapper data-testid="deployment-gating-toggle">
              <Toggle
                isChecked={environment.deployment_gate_enabled}
                onChange={toggleDeploymentGating}
                isDisabled={isDeploymentGatingToggleDisabled}
              />
            </ToggleWrapper>
            Enable deployment gating for this environment
          </DeploymentGatingWrapper>
          <LicenseRestrictionMessage>
            Control change management with our standard and premium plan.{' '}
            <Button
              href={DOCS_DEPLOYMENT_GATING}
              spacing="none"
              appearance="link"
              target="_blank"
            >
              Learn more
            </Button>
          </LicenseRestrictionMessage>
        </div>
      )}
      <div>
        <AdminRestriction isPremium={capabilities.isPremium}>
          <ToggleWrapper>
            <Toggle
              isChecked={hasAdminRestriction}
              onChange={toggleAdminRestriction}
              isDisabled={isFetching || !capabilities.isPremium}
            />
          </ToggleWrapper>
          Only allow admins to deploy to this environment{' '}
          <InlinePremiumIconWrapper>
            <Tooltip content="Premium">
              <PremiumIcon
                label="Premium"
                primaryColor={colors.B400}
                size="medium"
              />
            </Tooltip>
          </InlinePremiumIconWrapper>
        </AdminRestriction>
        <LicenseRestrictionMessage>
          Control deployment restrictions with our premium plan.{' '}
          <Button
            href={DOCS_PREMIUM_BITBUCKET_PLAN}
            spacing="none"
            appearance="link"
            target="_blank"
          >
            Learn more
          </Button>
        </LicenseRestrictionMessage>
      </div>
      <Separator />
    </>
  );
};

export default React.memo(LicenseGatedFeatures);
