import React from 'react';

import { shallow } from 'enzyme';

import Avatar from '@atlaskit/avatar';

import type { AvatarOption } from '../../../common/types';
import { StyledChild } from '../../../common/ui/styled';

import { AvatarOptionLabel } from './main';

describe('AvatarOptionLabel', () => {
  const option: AvatarOption = {
    value: '1',
    label: 'option 1',
    optionType: 'avatar',
  };

  it('should return circle avatar with no src', () => {
    const wrapper = shallow(<AvatarOptionLabel avatarOption={option} />);
    const avatar = wrapper.find(Avatar);
    expect(avatar).toHaveLength(1);
    expect(avatar.props()).toEqual({
      appearance: 'circle',
      src: undefined,
      size: 'xsmall',
    });
    expect(wrapper.find(StyledChild).dive().text()).toBe('option 1');
  });

  it('should return circle avatar with src', () => {
    const wrapper = shallow(
      <AvatarOptionLabel avatarOption={{ ...option, avatar: 'avatarSrc' }} />,
    );
    const avatar = wrapper.find(Avatar);
    expect(avatar).toHaveLength(1);
    expect(avatar.props()).toEqual({
      appearance: 'circle',
      src: 'avatarSrc',
      size: 'xsmall',
    });
    expect(wrapper.find(StyledChild).dive().text()).toBe('option 1');
  });

  it('should return square avatar with src', () => {
    const wrapper = shallow(
      <AvatarOptionLabel
        avatarOption={{ ...option, avatar: 'avatarSrc', square: true }}
      />,
    );
    const avatar = wrapper.find(Avatar);
    expect(avatar).toHaveLength(1);
    expect(avatar.props()).toEqual({
      appearance: 'square',
      src: 'avatarSrc',
      size: 'xsmall',
    });
    expect(wrapper.find(StyledChild).dive().text()).toBe('option 1');
  });
});
