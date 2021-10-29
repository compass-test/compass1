import React from 'react';
import { shallow } from 'enzyme';
import { SearchAnchor } from '../search-anchor';

describe('<SearchAnchor />', () => {
  it('matches snapshot when expanded', () => {
    const wrapper = shallow(
      <SearchAnchor
        onBlur={jest.fn()}
        onFocus={jest.fn()}
        onKeyDown={jest.fn()}
        isExpanded
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when contracted', () => {
    const wrapper = shallow(
      <SearchAnchor
        onBlur={jest.fn()}
        onFocus={jest.fn()}
        onKeyDown={jest.fn()}
        isExpanded={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
