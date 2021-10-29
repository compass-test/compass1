import React from 'react';

import { forceReRender } from '@storybook/react';

import {
  Capabilities,
  Environment,
  RepositoryAssociationSummary,
} from '@atlassian/pipelines-models';

import EnvironmentList from '../src';

let environmentTypes: any = {
  test: [
    new Environment({
      name: 'foo',
      uuid: 'foo',
      branchRestrictions: [{ pattern: 'master', uuid: 'master' }],
    }),
    new Environment({
      name: 'bar',
      uuid: 'bar',
    }),
  ],
  staging: [
    new Environment({
      name: 'baz',
      uuid: 'baz',
    }),
  ],
};

export default () => {
  return (
    <div style={{ width: '880px' }}>
      <EnvironmentList
        capabilities={
          new Capabilities({
            isPaid: true,
            isPremium: true,
          })
        }
        createBranchRestriction={(environmentUuid: string, pattern: string) => {
          Object.keys(environmentTypes).forEach((type) => {
            environmentTypes[type].forEach((e: Environment, index: number) => {
              if (e.uuid === environmentUuid) {
                environmentTypes[type][index] = new Environment({
                  ...e,
                  branchRestrictions: e.branchRestrictions.concat({
                    pattern: pattern,
                    uuid: pattern,
                  }),
                });
              }
            });
          });
          forceReRender();
        }}
        createEnvironment={(environmentName, environmentType) => {
          if (environmentTypes[environmentType]) {
            environmentTypes[environmentType].push(
              new Environment({
                name: environmentName,
                uuid: environmentName,
              }),
            );
          } else {
            environmentTypes[environmentType] = [
              new Environment({
                name: environmentName,
                uuid: environmentName,
              }),
            ];
          }
          forceReRender();
        }}
        deleteBranchRestriction={(environmentUuid, restrictionUuid) => {
          Object.keys(environmentTypes).forEach((type) => {
            environmentTypes[type].forEach((e: Environment, index: number) => {
              if (e.uuid === environmentUuid) {
                environmentTypes[type][index] = new Environment({
                  ...e,
                  branchRestrictions: e.branchRestrictions.filter(
                    (restriction) => restriction.uuid !== restrictionUuid,
                  ),
                });
              }
            });
          });
          forceReRender();
        }}
        deleteEnvironment={(environmentUuid) => {
          Object.keys(environmentTypes).forEach((type) => {
            environmentTypes[type].forEach((e: Environment, index: number) => {
              if (e.uuid === environmentUuid) {
                environmentTypes[type].splice(index, 1);
              }
            });
          });
          forceReRender();
        }}
        environmentTypes={environmentTypes}
        fetchBranches={() =>
          Promise.resolve({ values: [{ name: 'master' }, { name: 'foo' }] })
        }
        getIsUpdatingAdminRestriction={(environmentUuid) => {
          return false;
        }}
        getIsUpdatingBranchRestriction={(environmentUuid) => {
          return false;
        }}
        getIsUpdatingDeploymentGating={(environmentUuid) => {
          return false;
        }}
        isFetchingDashboard={false}
        isUpdatingEnvironmentList={false}
        maxDeploymentEnvironments={10}
        reorderEnvironments={() => {
          console.log('reorder');
        }}
        repositoryAssociationSummary={
          new RepositoryAssociationSummary({
            hasFetched: true,
            hasChangeManagementProjectAssociation: true,
          })
        }
        updateEnvironment={(environmentUuid: string, change: any) => {
          Object.keys(environmentTypes).forEach((type) => {
            environmentTypes[type].forEach((e: Environment, index: number) => {
              if (e.uuid === environmentUuid) {
                environmentTypes[type][index] = new Environment({
                  ...e,
                  ...(change.name
                    ? {
                        name: change.name,
                        uuid: change.name,
                      }
                    : {}),
                  ...(change.restrictions ||
                  change.hasOwnProperty('deployment_gate_enabled')
                    ? change
                    : {}),
                });
              }
            });
          });
          forceReRender();
        }}
        renderVariableList={(environment: Environment) => (
          <div style={{ marginTop: '20px' }}>(variables list)</div>
        )}
      />
    </div>
  );
};
