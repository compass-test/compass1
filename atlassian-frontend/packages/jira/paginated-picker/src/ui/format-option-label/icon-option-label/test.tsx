import React from 'react';

import { shallow } from 'enzyme';

import type { Option } from '../../../common/types';
import { StyledChildIcon, StyledOptionIcon } from '../../../common/ui/styled';

import { IconOptionLabel } from './main';

describe('IconOptionLabel', () => {
  const option: Option = {
    value: '1',
    label: 'option 1',
    optionType: 'option',
  };

  it('should return label without icon when option.icon is not defined', () => {
    const wrapper = shallow(<IconOptionLabel option={option} />);
    expect(wrapper.find(StyledOptionIcon)).toHaveLength(0);
    expect(wrapper.find(StyledChildIcon).dive().text()).toBe('option 1');
  });

  it('should return label with icon when option.icon is defined', () => {
    const wrapper = shallow(
      <IconOptionLabel option={{ ...option, icon: 'testIcon' }} />,
    );
    const icon = wrapper.find(StyledOptionIcon);
    expect(icon).toHaveLength(1);
    expect(icon.props()).toEqual({ alt: 'option 1', src: 'testIcon' });
    expect(wrapper.find(StyledChildIcon).dive().text()).toBe('option 1');
  });
});
