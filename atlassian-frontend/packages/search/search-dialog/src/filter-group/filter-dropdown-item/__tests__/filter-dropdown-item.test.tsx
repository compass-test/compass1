import React from 'react';
import { mount } from 'enzyme';
import FilterDropdownItem from '../filter-dropdown-item';
import Select from '@atlaskit/select';

jest.mock('@atlaskit/select');

describe('<FilterDropdownItem />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <FilterDropdownItem
        values={[
          { label: 'hello', value: 'hello' },
          { label: 'jdog', value: 'jdog' },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    const wrapper = mount(
      <FilterDropdownItem
        isLoading
        values={[
          { label: 'hello', value: 'hello' },
          { label: 'jdog', value: 'jdog' },
        ]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onChange when value changes', () => {
    const onChange = jest.fn();
    const values = [
      { label: 'hello', value: 'hello' },
      { label: 'jdog', value: 'jdog' },
    ];
    const wrapper = mount(
      <FilterDropdownItem values={values} onChange={onChange} />,
    );

    wrapper.find(Select).prop('onChange')!(values[0]);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(values[0].value);
  });
});
