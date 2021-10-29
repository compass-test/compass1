import React from 'react';

import { render } from '@testing-library/react';

import PeopleMenuTrigger, {
  PeopleMenuTriggerSSR,
} from '../../PeopleMenuTrigger';

describe('PeopleMenuTrigger', () => {
  let defaultProps: any;

  const renderComponent = (overrideProps = {}) => {
    defaultProps = {
      isVisible: false,
      isHighlighted: false,
      triggerProps: {},
      onClick: jest.fn(),
      onMouseEnter: jest.fn(),
      isSelected: false,
      peopleText: undefined,
    };

    return render(<PeopleMenuTrigger {...defaultProps} {...overrideProps} />);
  };

  describe('peopleText', () => {
    it('When isVisible=true, should accept custom peopleText prop', () => {
      const { getByText } = renderComponent({
        isVisible: true,
      });

      expect(getByText('People')).toBeInTheDocument();

      const { getByText: getByText2 } = renderComponent({
        peopleText: 'Hello World',
        isVisible: true,
      });

      expect(getByText2('Hello World')).toBeInTheDocument();
    });

    it('When isVisible=false, should accept custom peopleText prop', () => {
      const { getByText } = renderComponent({
        isVisible: false,
      });

      expect(getByText('People')).toBeInTheDocument();

      const { getByText: getByText2 } = renderComponent({
        peopleText: 'Hello World',
        isVisible: false,
      });

      expect(getByText2('Hello World')).toBeInTheDocument();
    });
  });
});

describe('PeopleMenuTriggerSSR', () => {
  it('Should accept custom peopleText prop', () => {
    const { getByText } = render(<PeopleMenuTriggerSSR />);
    expect(getByText('People')).toBeInTheDocument();

    const { getByText: getByText2 } = render(
      <PeopleMenuTriggerSSR peopleText="Hello World" />,
    );
    expect(getByText2('Hello World')).toBeInTheDocument();
  });
});
