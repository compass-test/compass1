import React from 'react';

import { mount, ReactWrapper } from 'enzyme';

import { Deployment, Environment } from '@atlassian/pipelines-models';

import EnvironmentHeader, { Props } from '../../EnvironmentHeader';

describe('EnvironmentHeader component', () => {
  let component: ReactWrapper<Props>;

  const defaultProps: Props = {
    environment: new Environment({
      name: 'foo',
      uuid: 'foo',
    }),
    selectedEnvironmentUuid: 'foo',
    toggleHistory: (environmentUuid: string) => () => {},
    children: null,
  };

  function render(props: Props) {
    component = mount(<EnvironmentHeader {...props} />);
  }

  it('should render empty state', () => {
    render({
      ...defaultProps,
    });
    expect(component.html()).toContain('Nothing deployed');
  });

  it('should render environment header', () => {
    render({
      ...defaultProps,
      environment: new Environment({
        name: 'foo',
        uuid: 'foo',
        latest_deployment: {
          state: {
            started_on: '2021-08-17T23:41:27+00:00',
            status: 'SUCCESSFUL',
          },
        } as Deployment,
      }),
    });
    expect(component.find('h4').text()).toEqual('foo');
  });
});
