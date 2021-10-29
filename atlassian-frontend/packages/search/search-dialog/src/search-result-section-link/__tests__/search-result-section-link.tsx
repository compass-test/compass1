import React from 'react';
import { shallow } from 'enzyme';
import { SearchResultSectionLink } from '../search-result-section-link';

describe('<SearchResultSectionLink />', () => {
  it('SearchResult matches snapshot', () => {
    const wrapper = shallow(
      <SearchResultSectionLink href={'http://google.com'} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
