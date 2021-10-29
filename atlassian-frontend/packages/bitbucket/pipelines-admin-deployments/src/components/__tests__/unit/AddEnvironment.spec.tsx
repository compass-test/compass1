import React from 'react';

import { mount } from 'enzyme';

import InlineEdit from '@atlaskit/inline-edit';
import { Capabilities, Environment } from '@atlassian/pipelines-models';

import AddEnvironment from '../../AddEnvironment';
import { ReadViewContainer } from '../../styled';

describe('AddEnvironment component', () => {
  const defaultProps = {
    capabilities: new Capabilities({ isPaid: true, isPremium: true }),
    createEnvironment: jest.fn(),
    environmentTypes: { test: [new Environment({})] },
    maxDeploymentEnvironments: 10,
    type: 'test',
  };

  it('create environment', () => {
    const component = mount(<AddEnvironment {...defaultProps} />);
    component.find(ReadViewContainer).simulate('click');

    component
      .find('input[name="environment_name"]')
      .first()
      .simulate('change', {
        target: { value: 'foo' },
      });
    component.find(InlineEdit).first().prop('onConfirm')();
    expect(defaultProps.createEnvironment).toHaveBeenCalledWith('foo', 'test');
  });
});
