import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { ImageRadio } from './index';

describe('ImageRadio', () => {
  const RADIO_TEST_ID = 'radio';
  const INPUT_TEST_ID = 'radio.input';
  const IMAGE_TEST_ID = 'image';
  const CLICK_AREA_TEST_ID = 'radio.click-area';

  const image = <div data-testid={IMAGE_TEST_ID}>Test image</div>;

  it('should render successfully', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ImageRadio
          name={'foo'}
          image={image}
          value={'5'}
          testId={RADIO_TEST_ID}
        />
      </CompassTestProvider>,
    );

    const radio = getByTestId(RADIO_TEST_ID);

    expect(radio).not.toBeNull();
  });

  it('should apply the `name` prop to the underlying radio input', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ImageRadio
          name={'foo'}
          image={image}
          value={'5'}
          testId={RADIO_TEST_ID}
        />
      </CompassTestProvider>,
    );

    const input = getByTestId(INPUT_TEST_ID);

    expect(input.getAttribute('name')).toBe('foo');
  });

  it('should render a checked radio input when the `currentValue` matches the radio `value`', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ImageRadio
          name={'foo'}
          image={image}
          value={'5'}
          currentValue={'5'}
          // We need an `onChange` here to go along with the internal `checked`
          // property application to prevent rendering a read-only field.
          onChange={() => {}}
          testId={RADIO_TEST_ID}
        />
      </CompassTestProvider>,
    );

    const input = getByTestId(INPUT_TEST_ID);

    expect(input.getAttribute('checked')).not.toBe(null);
  });

  it("should render an unchecked radio input when the `currentValue` doesn't match the radio `value`", () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ImageRadio
          name={'foo'}
          image={image}
          value={'5'}
          currentValue={'4'}
          // We need an `onChange` here to go along with the internal `checked`
          // property application to prevent rendering a read-only field.
          onChange={() => {}}
          testId={RADIO_TEST_ID}
        />
      </CompassTestProvider>,
    );

    const input = getByTestId(INPUT_TEST_ID);

    expect(input.getAttribute('checked')).toBe(null);
  });

  it('should display a label when the `label` prop is provided', () => {
    const { getByText } = render(
      <CompassTestProvider locale="en">
        <ImageRadio name={'foo'} image={image} value={'5'} label={'Label'} />
      </CompassTestProvider>,
    );

    const label = getByText('Label');

    expect(label).not.toBeNull();
  });

  it('should fire a supplied `onChange` when clicked', () => {
    const onChangeSpy = jest.fn();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSpy(e.target.value);
    };

    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <ImageRadio
          name={'foo'}
          image={image}
          value={'5'}
          onChange={onChange}
          testId={RADIO_TEST_ID}
        />
      </CompassTestProvider>,
    );

    const clickArea = getByTestId(CLICK_AREA_TEST_ID);

    act(() => {
      userEvent.click(clickArea);
    });

    expect(onChangeSpy).toHaveBeenCalledTimes(1);
    expect(onChangeSpy).toHaveBeenLastCalledWith('5');
  });
});
