import React from 'react';
import { SearchResultSection } from '../search-result-section';
import { shallow } from 'enzyme';
import Badge from '@atlaskit/badge';

jest.mock('@atlaskit/badge');

describe('<SearchResultSection />', () => {
  it('snapshot', () => {
    const wrapper = shallow(
      <SearchResultSection title="Search results" totalResults={22} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot when totalResults = 0', () => {
    const wrapper = shallow(
      <SearchResultSection title="Search results" totalResults={0} />,
    );
    expect(wrapper.find(Badge).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot when totalResults is undefined', () => {
    const wrapper = shallow(
      <SearchResultSection title="Search results" totalResults={0} />,
    );
    expect(wrapper.find(Badge).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });
});
