import React from 'react';
import { SearchInput } from '../search-input';
import { SearchInputField, ArrowIconWrapper } from '../search-input.styled';
import { shallow, mount } from 'enzyme';
import { _themes as themes } from '../../theme';

jest.mock('../search-input.styled', () =>
  Object.assign({}, jest.requireActual('../search-input.styled'), {
    HiddenTooltip: () => <div />,
  }),
);

const theme = themes.default;

describe('<SearchInput />', () => {
  it('snapshot with placeholder', () => {
    const wrapper = shallow(
      <SearchInput
        value=""
        isExpanded
        placeholder="placeholder"
        theme={theme}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot expanded', () => {
    const wrapper = shallow(<SearchInput value="" isExpanded theme={theme} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot explicitly collapsed', () => {
    const wrapper = shallow(
      <SearchInput value="" isExpanded={false} theme={theme} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('snapshot with value set', () => {
    const wrapper = shallow(
      <SearchInput value="value is here" isExpanded theme={theme} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('correctly calls onInput when input is entered', () => {
    const callback = jest.fn();
    const wrapper = shallow(
      <SearchInput value="" isExpanded onInput={callback} theme={theme} />,
    );

    wrapper.find(SearchInputField).prop('onInput')!({
      currentTarget: { value: 'a' },
    } as any);

    expect(callback).toBeCalled();
    expect(callback.mock.calls[0][0]).toBe('a');
  });

  it('correctly calls onEnter when enter is pressed', () => {
    const callback = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = shallow(
      <SearchInput value="" isExpanded onEnter={callback} theme={theme} />,
    );

    wrapper.find(SearchInputField).prop('onKeyDown')!({
      preventDefault,
      key: 'Enter',
    } as any);

    expect(callback).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
  });

  it('does not call onEnter when enter is pressed but the event has defaultPrevented', () => {
    const callback = jest.fn();
    const preventDefault = jest.fn();
    const wrapper = shallow(
      <SearchInput value="" isExpanded onEnter={callback} theme={theme} />,
    );

    wrapper.find(SearchInputField).prop('onKeyDown')!({
      preventDefault,
      key: 'Enter',
      defaultPrevented: true,
    } as any);

    expect(callback).not.toBeCalled();
    expect(preventDefault).not.toBeCalled();
  });

  it('does not render more than 500 characters', () => {
    const spy = jest.spyOn(console, 'warn');
    spy.mockImplementation(() => {});

    const wrapper = mount(<SearchInput value="" isExpanded theme={theme} />);

    expect(
      (wrapper.find(SearchInputField).getDOMNode() as HTMLInputElement)
        .maxLength,
    ).toBe(500);

    spy.mockReset();
  });

  it('calls close when the back button is pressed', () => {
    const onBack = jest.fn();
    const wrapper = shallow(
      <SearchInput value="" isExpanded theme={theme} onBack={onBack} />,
    );

    wrapper.find(ArrowIconWrapper).first().simulate('click');
    expect(onBack).toHaveBeenCalled();
  });
});
