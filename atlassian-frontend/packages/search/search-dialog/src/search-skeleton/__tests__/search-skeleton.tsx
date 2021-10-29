import React from 'react';
import { SkeletonItem } from '../search-skeleton';
import { mount } from 'enzyme';

describe('<SkeletonItem />', () => {
  it('render matches snapshot', () => {
    const wrapper = mount(<SkeletonItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
