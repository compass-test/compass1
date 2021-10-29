import React from 'react';

import { shallow } from 'enzyme';

import Lozenge from '@atlaskit/lozenge';

import type { LozengeOption } from '../../../common/types';

import { LozengeOptionLabel } from './main';

describe('AvatarOptionLabel', () => {
  const option: LozengeOption = {
    value: '1',
    label: 'option 1',
    optionType: 'lozenge',
    appearance: 'default',
    isBold: true,
    maxWidth: '23',
  };

  it('should return circle avatar with no src', () => {
    const wrapper = shallow(<LozengeOptionLabel lozengeOption={option} />);
    const lozenge = wrapper.find(Lozenge);
    expect(lozenge).toHaveLength(1);
    expect(lozenge.props()).toEqual({
      appearance: 'default',
      isBold: true,
      maxWidth: '23',
      children: 'option 1',
    });
  });
});
