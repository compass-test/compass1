import React from 'react';
import { shallow, mount } from 'enzyme';
import { LinkComponent, LinkComponentProps } from '@atlassian/search-dialog';
import { Props, AdvancedSearchLink } from '../advanced-search-link';

describe('<AdvancedSearchLink />', () => {
  const createDummyComponent = (
    onMount: () => void = () => {},
  ): LinkComponent => {
    return class DummyComponent extends React.Component<LinkComponentProps> {
      componentDidMount() {
        onMount();
      }

      render() {
        return <div />;
      }
    };
  };

  const defaultProps: Props = {
    href: 'www.atlassian.com',
    isKeyboardHighlighted: false,
    onClick: () => {},
  };

  it('AdvancedSearchLink matches snapshot', () => {
    const wrapper = shallow(<AdvancedSearchLink {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('AdvancedSearchLink matches snapshot when keyboard highlighted', () => {
    const wrapper = shallow(
      <AdvancedSearchLink {...defaultProps} isKeyboardHighlighted />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('AdvancedSearchLink matches snapshot with custom component', () => {
    const wrapper = shallow(
      <AdvancedSearchLink
        {...defaultProps}
        linkComponent={createDummyComponent()}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('AdvancedSearchLink does not remount linkComponent when prop is updated but linkComponent is not', () => {
    const onMount = jest.fn();
    const DummyComponent = createDummyComponent(onMount);

    const wrapper = mount(
      <AdvancedSearchLink {...defaultProps} linkComponent={DummyComponent} />,
    );

    expect(onMount).toBeCalledTimes(1);

    wrapper.setProps({
      href: 'some/new/url',
      linkComponent: DummyComponent,
    });

    wrapper.update();

    expect(onMount).toBeCalledTimes(1);
  });

  it('AdvancedSearchLink does generate a new linkComponent when prop is updated and AdvancedSearchLink is updated', () => {
    const onMount = jest.fn();
    const DummyComponent = createDummyComponent(onMount);
    const NewDummyComponent = createDummyComponent(onMount);

    const wrapper = mount(
      <AdvancedSearchLink {...defaultProps} linkComponent={DummyComponent} />,
    );

    expect(onMount).toBeCalledTimes(1);

    wrapper.setProps({
      linkComponent: NewDummyComponent,
    });

    wrapper.update();

    expect(onMount).toBeCalledTimes(2);
  });
});
