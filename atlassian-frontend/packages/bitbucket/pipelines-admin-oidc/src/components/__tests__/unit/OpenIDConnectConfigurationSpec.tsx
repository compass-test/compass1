import React from 'react';

import { mount } from 'enzyme';

import Button from '@atlaskit/button/custom-theme-button';
import Select from '@atlaskit/select';

import CopyableCodeBlock from '../../CopyableCode';
import CopyButton from '../../CopyButton';
import OpenIDConnectConfiguration from '../../OpenIDConnectConfiguration';

describe('<OpenIdConnectPage />', () => {
  const defaultProps = {
    accountUuid: '{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}',
    accountName: 'test',
    repositoryUuid: '{3b7fd7c7-6dc8-4054-9c53-69182c4e4d2a}',
    connectEnvironment: 'PRODUCTION',
    deploymentEnvironments: [],
  };

  it('should render component with claim collapsed', () => {
    const component = mount(<OpenIDConnectConfiguration {...defaultProps} />);
    expect(component).toMatchSnapshot();
    expect(component.find(CopyableCodeBlock)).toHaveLength(3);
    expect(component.find(CopyButton)).toHaveLength(5);
  });

  it('should render component with claim expanded', () => {
    const component = mount(<OpenIDConnectConfiguration {...defaultProps} />);
    expect(component.find(Button).simulate('click'));
    component.update();

    expect(component).toMatchSnapshot();
    expect(component.find(CopyableCodeBlock)).toHaveLength(3);
    expect(component.find(CopyButton)).toHaveLength(5);
  });

  it('should render component with deployment environment', () => {
    const newProps = {
      ...defaultProps,
      deploymentEnvironments: [
        {
          label: 'Other',
          options: [
            { label: 'No environment', value: 'no environment', uuid: '' },
          ],
        },
        {
          label: 'Test Environments',
          options: [{ label: 'foo', value: 'bar', uuid: '{blah}' }],
        },
      ],
    };
    const component = mount(<OpenIDConnectConfiguration {...newProps} />);
    const selectEnv = component.find(Select);
    selectEnv.simulate('click');
    selectEnv.props().onChange({
      label: 'Test Environments',
      options: [{ label: 'foo', value: 'bar', uuid: '{blah}' }],
    });
    component.update();

    expect(component).toMatchSnapshot();
    expect(component.find(CopyableCodeBlock)).toHaveLength(3);
    expect(component.find(CopyButton)).toHaveLength(6);
  });
});
