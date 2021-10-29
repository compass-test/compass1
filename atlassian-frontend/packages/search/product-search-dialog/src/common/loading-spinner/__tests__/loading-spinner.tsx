import React from 'react';
import { shallow } from 'enzyme';
import { LoadingSpinner } from '../loading-spinner';

describe('<LoadingSpinner />', () => {
  it('render matches snapshot', () => {
    const wrapper = shallow(<LoadingSpinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
