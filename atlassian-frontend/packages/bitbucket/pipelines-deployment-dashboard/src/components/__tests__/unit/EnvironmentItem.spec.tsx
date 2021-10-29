import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
import { IntlProvider } from 'react-intl';

import { Environment } from '@atlassian/pipelines-models';

import EnvironmentCard from '../../EnvironmentCard';
import EnvironmentItem, { Props } from '../../EnvironmentItem';

describe('EnvironmentItem component', () => {
  let component: ReactWrapper<Props>;

  const environment = new Environment({
    name: 'foo',
    uuid: 'foo',
    latest_successful_deployment: {
      uuid: 'bar',
    },
  });

  const defaultProps: Props = {
    environment: environment,
    environments: [environment],
    isPremiumAccount: true,
    userIsAdmin: true,
    openDeploymentPreview: jest.fn(),
    toggleHistory: jest.fn(),
    openDeploymentSummary: jest.fn(),
  };

  function render(props: Props) {
    component = mount(
      <IntlProvider locale="en">
        <EnvironmentItem {...props} />
      </IntlProvider>,
    );
  }

  it(`should render single environment card`, () => {
    render({
      ...defaultProps,
    });
    expect(component.find(EnvironmentCard)).toHaveLength(1);
  });

  it(`should render overlay environment card`, () => {
    render({
      ...defaultProps,
      environment: new Environment({
        name: 'foo',
        uuid: 'foo',
        latest_successful_deployment: {
          uuid: 'bar',
        },
        latest_deployment: {
          uuid: 'baz',
        },
      }),
    });
    expect(component.find(EnvironmentCard)).toHaveLength(2);
  });
});
