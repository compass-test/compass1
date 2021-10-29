import React, { ComponentProps } from 'react';
import { shallow } from 'enzyme';
import { JiraAdvancedSearchLink } from '../jira-advanced-search-link';

describe('<JiraAdvancedSearchLink />', () => {
  const onClick = jest.fn();
  const commonProps: ComponentProps<typeof JiraAdvancedSearchLink> = {
    href: 'https://some/href',
    dataTestId: 'mock-data-test-id',
    onClick,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render matches snapshot', () => {
    const wrapper = shallow(<JiraAdvancedSearchLink {...commonProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick handler is called with the right category', () => {
    const wrapper = shallow(<JiraAdvancedSearchLink {...commonProps} />);

    expect(onClick).toBeCalledTimes(0);
    const mockEvent = ({
      preventDefault: jest.fn(),
    } as any) as React.MouseEvent;
    wrapper.simulate('click', mockEvent);

    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith(commonProps.href, mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });
});
