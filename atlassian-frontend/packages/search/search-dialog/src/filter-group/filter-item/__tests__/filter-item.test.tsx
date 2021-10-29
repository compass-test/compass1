import React from 'react';
import { mount } from 'enzyme';
import FilterItem from '../filter-item';
import { Checkbox } from '@atlaskit/checkbox';
import { FilterColLabelText } from '../filter-item.styled';

jest.mock('@atlaskit/checkbox');

describe('<FilterItem />', () => {
  it('matches snapshot', () => {
    const wrapper = mount(
      <FilterItem
        value="some value"
        label="some label"
        icon={<div>I'm an icon</div>}
        LabelComponent={FilterColLabelText}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onChange when value changes', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <FilterItem
        value="some value"
        label="some label"
        icon={<div>I'm an icon</div>}
        onChange={onChange}
        LabelComponent={FilterColLabelText}
      />,
    );

    wrapper.find(Checkbox).prop('onChange')!({
      target: { checked: true, value: 'some value' },
    } as any);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('some value', true);

    wrapper.find(Checkbox).prop('onChange')!({
      target: { checked: false, value: 'some value' },
    } as any);
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith('some value', false);
  });
});
