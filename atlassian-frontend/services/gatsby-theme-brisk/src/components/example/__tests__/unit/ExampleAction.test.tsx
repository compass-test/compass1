import React from 'react';

import { act, fireEvent, render } from '@testing-library/react';
import JiraTestSessionIcon from '@atlaskit/icon/glyph/jira/test-session';

import ExampleAction from '../../actions/ExampleAction';

const TEST_LABEL =
  'The aria-label attribute is used to define a string that labels the current element. The tooltip, also known as infotip or hint, is a common graphical user interface element in which, when hovering over a screen element or component, a text box displays information about that element.';

const TEST_ID = 'test';

const TEST_ICON = <JiraTestSessionIcon label="TEST_ICON" />;

const TEST_COMPONENT = (
  <ExampleAction icon={TEST_ICON} label={TEST_LABEL} testId={TEST_ID} />
);

describe('Example action button', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be labelled correctly for screen-readers', () => {
    const { getByTestId } = render(TEST_COMPONENT);

    const actionButton = getByTestId(TEST_ID);
    expect(actionButton).toHaveAttribute('aria-label', TEST_LABEL);
  });

  it('should have a tooltip for sighted users', () => {
    const { getByTestId } = render(TEST_COMPONENT);

    const actionButton = getByTestId(TEST_ID);

    fireEvent.mouseOver(actionButton);
    act(() => {
      jest.runAllTimers();
    });

    const actionTooltip = getByTestId(`${TEST_ID}-tooltip`);
    expect(actionTooltip.textContent).toEqual(TEST_LABEL);
  });

  it('should perform the correct action on click', () => {
    const onClick = jest.fn();

    const { getByTestId } = render(
      <ExampleAction
        icon={TEST_ICON}
        label={TEST_LABEL}
        testId={TEST_ID}
        onClick={onClick}
      />,
    );

    const actionButton = getByTestId(TEST_ID);

    expect(onClick).toBeCalledTimes(0);
    fireEvent.click(actionButton);
    expect(onClick).toBeCalledTimes(1);
  });

  it('should pass through other properties to the button', () => {
    const onMouseOver = jest.fn();

    const { getByTestId } = render(
      <ExampleAction
        icon={TEST_ICON}
        label={TEST_LABEL}
        testId={TEST_ID}
        aria-expanded={true}
        data-test={42}
        onMouseOver={onMouseOver}
        onFocus={onMouseOver}
      />,
    );

    const actionButton = getByTestId(TEST_ID);

    expect(actionButton).toHaveAttribute('aria-expanded', 'true');
    expect(actionButton).toHaveAttribute('data-test', '42');

    expect(onMouseOver).toBeCalledTimes(0);
    fireEvent.mouseOver(actionButton);
    expect(onMouseOver).toBeCalledTimes(1);
    fireEvent.focus(actionButton);
    expect(onMouseOver).toBeCalledTimes(2);
  });
});
