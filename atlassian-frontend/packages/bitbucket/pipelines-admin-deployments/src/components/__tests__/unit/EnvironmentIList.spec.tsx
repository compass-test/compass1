import React from 'react';

import { mount } from 'enzyme';

import { AsyncCreatableSelect } from '@atlaskit/select';
import Toggle from '@atlaskit/toggle';
import {
  Capabilities,
  Environment,
  RepositoryAssociationSummary,
} from '@atlassian/pipelines-models';

import EnvironmentList from '../../EnvironmentList';
import { DeploymentGatingWrapper } from '../../styled';

describe('EnvironmentItem component', () => {
  const defaultProps = {
    capabilities: new Capabilities({ isPaid: true, isPremium: true }),
    createBranchRestriction: jest.fn(),
    createEnvironment: jest.fn(),
    deleteBranchRestriction: jest.fn(),
    deleteEnvironment: jest.fn(),
    environmentTypes: {
      test: [
        new Environment({
          name: 'foo',
          uuid: 'foo',
          branchRestrictions: [{ pattern: 'master', uuid: 'master' }],
        }),
        new Environment({ name: 'bar', uuid: 'bar' }),
      ],
      staging: [new Environment({ name: 'baz', uuid: 'baz' })],
    },

    fetchBranches: () =>
      Promise.resolve({ values: [{ name: 'master' }, { name: 'foo' }] }),
    getIsUpdatingAdminRestriction: jest.fn().mockReturnValue(false),
    getIsUpdatingBranchRestriction: jest.fn().mockReturnValue(false),
    getIsUpdatingDeploymentGating: jest.fn().mockReturnValue(false),
    isFetchingDashboard: false,
    isUpdatingEnvironmentList: false,
    maxDeploymentEnvironments: 10,
    reorderEnvironments: jest.fn(),
    repositoryAssociationSummary: new RepositoryAssociationSummary({
      hasFetched: true,
    }),
    updateEnvironment: jest.fn(),
    renderVariableList: () => null,
  };

  it('should not render <DeploymentGatingWrapper /> if a change management project association does not exist and toggle state is false', () => {
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          repositoryAssociationSummary: new RepositoryAssociationSummary(),
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    expect(component.find(DeploymentGatingWrapper).exists()).toBe(false);
  });

  it('should render <DeploymentGatingWrapper /> if a change management project association exists', () => {
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          repositoryAssociationSummary: new RepositoryAssociationSummary({
            hasChangeManagementProjectAssociation: true,
            hasFetched: true,
          }),
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    expect(component.find(DeploymentGatingWrapper).exists()).toBe(true);
  });

  it('should render <DeploymentGatingWrapper /> if a change management project association does not exist but toggle state is true', () => {
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          repositoryAssociationSummary: new RepositoryAssociationSummary(),
          environmentTypes: {
            test: [
              new Environment({
                name: 'foo',
                uuid: 'foo',
                deployment_gate_enabled: true,
              }),
            ],
          },
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    expect(component.find(DeploymentGatingWrapper).exists()).toBe(true);
  });

  it('should toggle deployment gating', () => {
    const updateEnvironment = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          repositoryAssociationSummary: new RepositoryAssociationSummary({
            hasChangeManagementProjectAssociation: true,
            hasFetched: true,
          }),
          updateEnvironment,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(Toggle).first().prop('onChange')();
    expect(updateEnvironment).toHaveBeenCalledWith('foo', {
      deployment_gate_enabled: true,
    });
  });

  it('should disable deployment gating toggle when not "paid or premium"', () => {
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          capabilities: new Capabilities({ isPremium: false, isPaid: false }),
          repositoryAssociationSummary: new RepositoryAssociationSummary({
            hasChangeManagementProjectAssociation: true,
            hasFetched: true,
          }),
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    expect(component.find(Toggle).first().prop('isDisabled')).toBeTruthy();
  });

  it('should not disable deployment gating toggle when "paid or premium" and project association exists', () => {
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          capabilities: new Capabilities({ isPremium: false, isPaid: true }),
          repositoryAssociationSummary: new RepositoryAssociationSummary({
            hasChangeManagementProjectAssociation: true,
            hasFetched: true,
          }),
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    expect(component.find(Toggle).first().prop('isDisabled')).toBeFalsy();
  });

  it('should toggle admin restrictions', () => {
    const updateEnvironment = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          updateEnvironment,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(Toggle).last().prop('onChange')();
    expect(updateEnvironment).toHaveBeenCalledWith('foo', {
      restrictions: {
        admin_only: true,
      },
    });
  });

  it('should handle create branch restriction', () => {
    const createBranchRestriction = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          createBranchRestriction,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(AsyncCreatableSelect).first().prop('onCreateOption')('baz');
    expect(createBranchRestriction).toHaveBeenCalledWith('foo', 'baz');
  });

  it('should handle create branch restriction', () => {
    const createBranchRestriction = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          createBranchRestriction,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(AsyncCreatableSelect).first().prop('onCreateOption')('baz');
    expect(createBranchRestriction).toHaveBeenCalledWith('foo', 'baz');
  });

  it('should handle remove branch restriction', () => {
    const deleteBranchRestriction = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          deleteBranchRestriction,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(AsyncCreatableSelect).first().prop('onChange')([]);
    expect(deleteBranchRestriction).toHaveBeenCalledWith('foo', 'master');
  });

  it('should handle remove branch restriction', () => {
    const createBranchRestriction = jest.fn();
    const component = mount(
      <EnvironmentList
        {...{
          ...defaultProps,
          createBranchRestriction,
        }}
      />,
    );
    component
      .find('[data-testid="environment-header"]')
      .first()
      .simulate('click');
    component.find(AsyncCreatableSelect).first().prop('onChange')([
      { label: 'feature/*', value: 'feature/*' },
      { label: 'bar', value: 'bar' },
    ]);
    expect(createBranchRestriction.mock.calls).toEqual([
      ['foo', 'feature/*'],
      ['foo', 'bar'],
    ]);
  });
});
