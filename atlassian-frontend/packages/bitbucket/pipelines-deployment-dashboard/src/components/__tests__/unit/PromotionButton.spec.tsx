import React from 'react';

import { mount, ReactWrapper } from 'enzyme';

import Button from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';
import { Deployment, Environment } from '@atlassian/pipelines-models';

import PromotionButton, { Props } from '../../PromotionButton';

describe('PromotionButton component', () => {
  let component: ReactWrapper<Props>;

  const environment1 = new Environment({
    name: 'foo',
    uuid: 'foo',
    next_promotion: {
      environment: { uuid: 'bar' },
      uuid: 'baz',
    } as Deployment,
  });

  const environment2 = new Environment({
    name: 'bar',
    uuid: 'bar',
    latest_successful_deployment: {
      uuid: 'bax',
    } as Deployment,
  });

  const defaultProps: Props = {
    environment: environment1,
    environments: [environment1, environment2],
    isPremiumAccount: true,
    userIsAdmin: true,
    openDeploymentPreview: jest.fn(),
  };

  function render(props: Props) {
    component = mount(<PromotionButton {...props} />);
  }

  it(`should construct correct promotion deployment & environment values`, () => {
    render({
      ...defaultProps,
    });
    component.find(Button).last().simulate('click');
    expect(defaultProps.openDeploymentPreview).toHaveBeenCalledWith({
      deployment: environment2.latest_successful_deployment,
      environment: environment1,
    });
  });

  it(`should render tooltip when promotion environment is locked`, () => {
    render({
      ...defaultProps,
      environments: [
        environment1,
        new Environment({
          name: 'bar',
          uuid: 'bar',
          latest_successful_deployment: {
            uuid: 'bax',
          },
          lock: { name: 'CLOSED' },
        }),
      ],
    });
    expect(component.find(Tooltip).prop('content')).toEqual(
      `We're currently deploying to bar`,
    );
  });

  it(`should render tooltip when promotion environment is admin restricted`, () => {
    render({
      ...defaultProps,
      userIsAdmin: false,
      environments: [
        environment1,
        new Environment({
          name: 'bar',
          uuid: 'bar',
          latest_successful_deployment: {
            uuid: 'bax',
          },
          restrictions: { admin_only: true },
        }),
      ],
    });
    expect(component.find(Tooltip).prop('content')).toEqual(
      `Only repository admins are allowed to deploy to the bar environment`,
    );
  });
});
