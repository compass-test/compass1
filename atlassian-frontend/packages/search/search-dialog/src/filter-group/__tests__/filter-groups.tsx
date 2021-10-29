import React from 'react';
import { shallow } from 'enzyme';
import { ColumnFilterGroup, RowFilterGroup } from '../filter-groups';

describe('<ColumnFilterGroup />', () => {
  it('matches snapshot when not loading', () => {
    const wrapper = shallow(
      <ColumnFilterGroup title="title text" isLoading={false}>
        <input type="checkbox" />
      </ColumnFilterGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when not loading with multiple children', () => {
    const wrapper = shallow(
      <ColumnFilterGroup title="title text" isLoading={false}>
        <input type="checkbox" />
        <input type="checkbox" />
      </ColumnFilterGroup>,
    );

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    const wrapper = shallow(
      <ColumnFilterGroup title="title text" isLoading>
        <input type="checkbox" />
      </ColumnFilterGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('is empty when no children are present', () => {
    const wrapper = shallow(
      <ColumnFilterGroup title="title text" isLoading={false} />,
    );

    expect(wrapper.children().length).toBe(1); // there is one title child component
  });
});

describe('<RowFilterGroup />', () => {
  it('matches snapshot when not loading', () => {
    const wrapper = shallow(
      <RowFilterGroup title="title text" isLoading={false}>
        <input type="checkbox" />
      </RowFilterGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when not loading with multiple children', () => {
    const wrapper = shallow(
      <RowFilterGroup title="title text" isLoading={false}>
        <input type="checkbox" />
        <input type="checkbox" />
      </RowFilterGroup>,
    );

    expect(wrapper.find('input')).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    const wrapper = shallow(
      <RowFilterGroup title="title text" isLoading>
        <input type="checkbox" />
      </RowFilterGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('is empty when no children are present', () => {
    const wrapper = shallow(
      <RowFilterGroup title="title text" isLoading={false} />,
    );

    expect(wrapper.children().length).toBe(2); // one title component and one row container
  });
});
