import React from 'react';

import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import StatusIcon from '../../StatusIcon';

describe('<StatusIcon />', () => {
  const props = {
    status: 'SUCCESSFUL',
  };

  function render(props: any) {
    return mount(<StatusIcon {...props} />);
  }

  it('should render component', () => {
    const component = render({ ...props });
    expect(toJson(component)).toMatchSnapshot();
  });
});
