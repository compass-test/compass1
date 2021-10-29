import React from 'react';

import { mount, ReactWrapper } from 'enzyme';

import Tooltip from '@atlaskit/tooltip';

import EnvironmentCardActions, { Props } from '../../EnvironmentCardActions';

describe('EnvironmentCardActions component', () => {
  let component: ReactWrapper<Props>;

  const defaultProps: Props = {
    isDisabled: false,
    openRedeployPreview: jest.fn(),
  };

  function render(props: Props) {
    component = mount(<EnvironmentCardActions {...props} />);
  }

  it('should render tooltip when disabled', () => {
    render({
      ...defaultProps,
      isDisabled: true,
    });
    expect(component.find(Tooltip).props().content).toEqual(
      'This deployment was replaced by a newer one and is no longer available',
    );
  });
});
