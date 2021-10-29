import React from 'react';

import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import { Disclosure } from '../../../../common/ui/disclosure';

import { ExpandingCard } from './index';

describe('ExpandingCard', () => {
  afterEach(() => jest.clearAllMocks());

  const DetailContent = () => <div data-testid="detail">Detail</div>;

  it('should render successfully', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard heading={'Foo'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const disclosure = getByTestId('foo');

    expect(disclosure).not.toBeNull();
  });

  it('should render heading text', () => {
    const { queryByText } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard heading={'Sample heading'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const heading = queryByText('Sample heading');

    expect(heading).not.toBeNull();
  });

  it('should render summary text when supplied', () => {
    const { queryByText } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard
            heading={'Foo'}
            secondaryText={'Secondary text'}
            details={DetailContent}
          />
        </Disclosure>
      </CompassTestProvider>,
    );

    const secondaryText = queryByText('Secondary text');

    expect(secondaryText).not.toBeNull();
  });

  it('should render an icon when supplied', () => {
    const Icon = () => <div data-testid="icon">Icon</div>;

    const { findByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard
            heading={'Foo'}
            icon={<Icon />}
            details={DetailContent}
          />
        </Disclosure>
      </CompassTestProvider>,
    );

    const icon = findByTestId('icon');

    expect(icon).not.toBeNull();
  });

  it('should apply a `testId` specified on the accompanying `Disclosure`', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard heading={'Foo'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const disclosure = getByTestId('foo');
    const toggle = getByTestId('foo.toggle');

    expect(disclosure).not.toBeNull();
    expect(toggle).not.toBeNull();
  });

  it('should auto-expand in response to `expanded` set to `true` on the accompanying `Disclosure`', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure expanded={true}>
          <ExpandingCard heading={'Foo'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const detail = getByTestId('detail');

    expect(detail).not.toBeNull();
  });

  it('should toggle visibility of the detail content when the toggle button is clicked', () => {
    const { getByTestId, queryByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard heading={'Foo'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const toggle = getByTestId('foo.toggle');
    let detail = queryByTestId('detail');

    expect(detail).toBeNull();

    act(() => {
      userEvent.click(toggle);
    });

    detail = queryByTestId('detail');

    expect(detail).not.toBeNull();

    act(() => {
      userEvent.click(toggle);
    });

    detail = queryByTestId('detail');

    expect(detail).toBeNull();
  });

  it('should apply id, testId, and ARIA properties to the disclosure and toggle button', () => {
    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure id={'foo'} label={'label'} testId={'bar'}>
          <ExpandingCard heading={'Foo'} details={DetailContent} />
        </Disclosure>
      </CompassTestProvider>,
    );

    const disclosure = getByTestId('bar');
    const toggle = getByTestId('bar.toggle');

    expect(disclosure.getAttribute('id')).toBe('foo');

    expect(toggle.getAttribute('aria-controls')).toBe('foo');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    // We've already asserted testId props by virtue of `getByTestId', so we're
    // just doubling up here.
    expect(disclosure.getAttribute('data-testid')).toBe('bar');
    expect(toggle.getAttribute('data-testid')).toBe('bar.toggle');

    act(() => {
      userEvent.click(toggle);
    });

    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('label');
  });

  it('should invoke custom onToggle implementation with proper isExpanded value', () => {
    const onToggle = jest.fn(
      (
        e: React.MouseEvent<HTMLElement>,
        analyticsEvent: UIAnalyticsEvent,
        isExpanded: boolean,
      ) => {},
    );

    const { getByTestId } = render(
      <CompassTestProvider locale="en">
        <Disclosure testId={'foo'}>
          <ExpandingCard
            heading={'Foo'}
            details={DetailContent}
            onToggle={onToggle}
          />
        </Disclosure>
      </CompassTestProvider>,
    );

    const toggle = getByTestId('foo.toggle');

    // Expand the card
    act(() => {
      userEvent.click(toggle);
    });

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      true,
    );

    // Collapse the card
    act(() => {
      userEvent.click(toggle);
    });

    expect(onToggle).toHaveBeenCalledTimes(2);
    expect(onToggle).toHaveBeenLastCalledWith(
      expect.anything(),
      expect.anything(),
      false,
    );
  });
});
