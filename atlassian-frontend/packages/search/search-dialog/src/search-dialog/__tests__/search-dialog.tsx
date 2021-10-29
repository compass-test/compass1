import React from 'react';
import { SearchDialog } from '../search-dialog';
import { shallow } from 'enzyme';

describe('<SearchDialog />', () => {
  it('snapshot', () => {
    const wrapper = shallow(<SearchDialog />);
    expect(wrapper).toMatchSnapshot();
  });
});
