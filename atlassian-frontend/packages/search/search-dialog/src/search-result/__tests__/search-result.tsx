import React, { ComponentProps, PropsWithChildren } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SearchResult } from '../search-result';
import { ResultTitleContainer } from '../search-result.styled';
import { useKeyboardNavigation } from '../../search-keyboard';

jest.mock('../search-result.styled', () => {
  return {
    ResultTitleContainer: ({ children }: PropsWithChildren<{}>) => children,
    ResultLabel: ({ children }: PropsWithChildren<{}>) => children,
    ResultDetail: () => 'div',
    IconContainer: () => 'div',
    ReturnIconContainer: () => 'div',
    ResultLink: () => 'div',
  };
});

jest.mock('../../search-keyboard', () => ({
  useKeyboardNavigation: jest.fn(),
}));

describe('<SearchResult />', () => {
  const updateWrapper = (wrapper: ReactWrapper) => {
    wrapper
      .setProps({
        someProp: 'changed',
      })
      .update();
  };

  const DummyLinkComponent: React.FunctionComponent = ({
    children,
    ...rest
  }) => <a {...rest}>{children}</a>;

  beforeEach(() => {
    jest.clearAllMocks();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
  });

  const defaultProps: ComponentProps<typeof SearchResult> = {
    href: 'www.atlassian.com',
    title: 'dinosaurs',
    containerDetail: 'jurassic period',
    timeDetail: <div>last updated 145m years ago</div>,
    icon: <div>Icon</div>,
  };

  it('SearchResult matches snapshot', () => {
    const wrapper = mount(<SearchResult {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('SearchResult matches snapshot when highlighted', () => {
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const wrapper = mount(<SearchResult {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('SearchResult matches snapshot with custom component', () => {
    const wrapper = mount(
      <SearchResult {...defaultProps} linkComponent={DummyLinkComponent} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('SearchResult generates a label prefix when supplied', () => {
    const wrapper = mount(<SearchResult {...defaultProps} label="Hello" />);
    expect(wrapper.find(ResultTitleContainer)).toMatchSnapshot();
  });

  it('onSelect is called when a search result is clicked', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <SearchResult
        {...defaultProps}
        linkComponent={DummyLinkComponent}
        onSelect={onSelect}
      />,
    );

    wrapper.simulate('click');
    expect(onSelect).toHaveBeenCalled();
  });

  it('SearchResult calls onHighlighted when highlighted', () => {
    const onHighlighted = jest.fn();

    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
    const wrapper = mount(
      <SearchResult {...defaultProps} onHighlighted={onHighlighted} />,
    );

    expect(onHighlighted).toBeCalledTimes(0);
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    updateWrapper(wrapper);

    expect(onHighlighted).toBeCalledTimes(1);
  });

  it('SearchResult calls onHighlighted when highlighted on mount', () => {
    const onHighlighted = jest.fn();

    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    mount(<SearchResult {...defaultProps} onHighlighted={onHighlighted} />);

    expect(onHighlighted).toBeCalledTimes(1);
  });

  it('SearchResult does not call onHighlighted when unhighlighted', () => {
    const onHighlighted = jest.fn();

    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const wrapper = mount(
      <SearchResult {...defaultProps} onHighlighted={onHighlighted} />,
    );

    onHighlighted.mockReset();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([false]);
    updateWrapper(wrapper);

    expect(onHighlighted).toBeCalledTimes(0);
  });

  it('SearchResult does not call onHighlighted when highlight does not change', () => {
    const onHighlighted = jest.fn();

    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    const wrapper = mount(
      <SearchResult {...defaultProps} onHighlighted={onHighlighted} />,
    );

    onHighlighted.mockReset();
    (useKeyboardNavigation as jest.Mock).mockReturnValue([true]);
    updateWrapper(wrapper);

    expect(onHighlighted).toBeCalledTimes(0);
  });
});
