import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { EmojiInput } from './index';

describe('EmojiInput', () => {
  const TEST_ID = 'mood-selector';

  it('should render successfully', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <EmojiInput name={'big-mood'} testId={TEST_ID} />
      </CompassTestProvider>,
    );

    const input = getByTestId(TEST_ID);

    expect(input).not.toBeNull();
  });

  it('should render a checked radio input for the option corresponding to `value` if provided', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <EmojiInput name={'big-mood'} value={'4'} testId={TEST_ID} />
      </CompassTestProvider>,
    );

    const input = getByTestId('mood-selector.good.input');

    expect(input.getAttribute('checked')).not.toBe(null);
  });

  it('should fire a supplied `onChange` when clicked', () => {
    const onChangeSpy = jest.fn();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSpy(e.target.value);
    };

    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <EmojiInput name={'big-mood'} onChange={onChange} testId={TEST_ID} />
      </CompassTestProvider>,
    );

    const clickArea = getByTestId('mood-selector.great.click-area');

    act(() => {
      userEvent.click(clickArea);
    });

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenLastCalledWith('5');
  });
});
