import React from 'react';
import { shallow } from 'enzyme';
import { SearchFooterLinks } from '../search-footer-links';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';

describe('<SearchAnchor />', () => {
  it('matches snapshot when expanded', () => {
    const wrapper = shallow(<SearchFooterLinks label="test" links={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onclick when clicked', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(
      <SearchFooterLinks
        label="testSingleLink"
        links={[
          {
            key: 'test',
            content: 'testContent',
            href: 'testhref',
          },
        ]}
        onClick={mockOnClick}
      />,
    );

    wrapper
      .findWhere((c) => c.key() === 'test')
      .first()
      .simulate('click');

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders the dropdown with more than 5 links', () => {
    const wrapper = shallow(
      <SearchFooterLinks
        label="testManyLinks"
        links={Array(10)
          .fill(0)
          .map((_, i) => ({
            key: `test${i}`,
            content: `test${i}`,
            href: `testhref${i}`,
          }))}
      />,
    );

    expect(wrapper.find(DropdownMenu).exists()).toBeTruthy();
    expect(wrapper.find(DropdownItem).length).toEqual(5);
  });

  it('Does not render the dropdown menu with fewer than 5 links', () => {
    const wrapper = shallow(
      <SearchFooterLinks
        label="testFewLinks"
        links={Array(3)
          .fill(0)
          .map((_, i) => ({
            key: `test${i}`,
            content: `test${i}`,
            href: `testhref${i}`,
          }))}
      />,
    );

    expect(wrapper.find(DropdownMenu).exists()).toBeFalsy();
  });
});
