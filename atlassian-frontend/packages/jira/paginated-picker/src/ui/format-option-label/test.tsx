import React from 'react';

import { shallow } from 'enzyme';

import type { AvatarOption, LozengeOption, Option } from '../../common/types';

import AvatarOptionLabel from './avatar-option-label';
import IconOptionLabel from './icon-option-label';
import LozengeOptionLabel from './lozenge-option-label';
import formatOptionLabel from './main';

describe('formatOptionLabel', () => {
  const option: Option = {
    value: '1',
    label: 'option 1',
    optionType: 'option',
  };

  describe('Option', () => {
    it('should return IconOptionLabel when optionType is option', () => {
      const wrapper = shallow(<div>${formatOptionLabel(option)}</div>);
      expect(wrapper.find(IconOptionLabel)).toHaveLength(1);
    });
  });

  describe('AvatarOption', () => {
    const avatarOption: AvatarOption = {
      ...option,
      optionType: 'avatar',
    };

    it('should return label when hideAvatar is true', () => {
      const wrapper = shallow(
        <div>
          {formatOptionLabel({
            ...avatarOption,
            hideAvatar: true,
          })}
        </div>,
      );

      expect(wrapper.text()).toBe('option 1');
    });
    it('should return AvatarOptionLabel when optionType is avatar', () => {
      const wrapper = shallow(<div>{formatOptionLabel(avatarOption)}</div>);
      expect(wrapper.find(AvatarOptionLabel)).toHaveLength(1);
    });
  });

  describe('LozengeOption', () => {
    const lozengeOption: LozengeOption = {
      ...option,
      optionType: 'lozenge',
    };

    it('should return LozenOptionLabel when optionType is avatar', () => {
      const wrapper = shallow(<div>{formatOptionLabel(lozengeOption)}</div>);
      expect(wrapper.find(LozengeOptionLabel)).toHaveLength(1);
    });
  });
});
