import React, { FC, MouseEventHandler, ReactNode } from 'react';

import { act, fireEvent, render } from '@testing-library/react';

import ClickCopyAnchor, {
  reducer,
  extractURLWithHash,
  ActionTypes,
  COPY_INFO,
  COPY_COMPLETED,
  COPY_CONFIRM_TIMEOUT,
} from '../../click-copy-anchor';

describe('ClickCopyAnchor - Component', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  it('should render an anchor with children by default', () => {
    const { getByTestId } = render(
      <ClickCopyAnchor href={`#hello-world`} testId={'click-copy-anchor'}>
        Hello World
      </ClickCopyAnchor>,
    );

    expect(getByTestId('click-copy-anchor').tagName).toEqual('A');
    expect(getByTestId('click-copy-anchor').textContent).toEqual('Hello World');
  });

  it('should show copy info on hover', () => {
    const { getByTestId, queryByText, queryAllByText } = render(
      <ClickCopyAnchor href={`#hello-world`} testId={'click-copy-anchor'}>
        Hello World
      </ClickCopyAnchor>,
    );

    expect(queryByText(COPY_INFO)).toBeNull();
    expect(queryByText(COPY_COMPLETED)).toBeNull();

    const anchorEl = getByTestId('click-copy-anchor');
    fireEvent.mouseEnter(anchorEl);
    expect(queryAllByText(COPY_INFO)).toHaveLength(1);
  });

  it('should show copy confirm on click', () => {
    const { getByTestId, queryByText, queryAllByText } = render(
      <ClickCopyAnchor href={`#hello-world`} testId={'click-copy-anchor'}>
        Hello World
      </ClickCopyAnchor>,
    );

    expect(queryByText(COPY_INFO)).toBeNull();
    expect(queryByText(COPY_COMPLETED)).toBeNull();

    const anchorEl = getByTestId('click-copy-anchor');
    fireEvent.click(anchorEl);
    expect(queryAllByText(COPY_COMPLETED)).toHaveLength(1);
  });

  it('copy confirm should disappear in 3s', async () => {
    jest.useFakeTimers();

    const { getByTestId, queryByText, queryAllByText, getByText } = render(
      <ClickCopyAnchor href={`#hello-world`} testId={'click-copy-anchor'}>
        Hello World
      </ClickCopyAnchor>,
    );

    expect(queryByText(COPY_INFO)).toBeNull();
    expect(queryByText(COPY_COMPLETED)).toBeNull();

    const anchorEl = getByTestId('click-copy-anchor');
    fireEvent.click(anchorEl);
    expect(queryAllByText(COPY_COMPLETED)).toHaveLength(1);

    act(() => jest.advanceTimersByTime(COPY_CONFIRM_TIMEOUT));
    expect(queryByText(COPY_COMPLETED)).toBeNull();
  });
});

/*
  reducer test tests for the obvious now but might be helpful
  in the future if we run into complex state shape and cases
*/
describe('ClickCopyAnchor - Reducer', () => {
  const initialState = {
    shouldShowCopyInfo: false,
    shouldShowCopyConfirm: false,
  };

  it('should update the right end state for OnCLick action', () => {
    const state = reducer(initialState, { type: ActionTypes.OnClick });
    expect(state.shouldShowCopyInfo).toEqual(false);
    expect(state.shouldShowCopyConfirm).toEqual(true);
  });

  it('should update the right end state for OnMouseEnter action', () => {
    const state = reducer(initialState, { type: ActionTypes.OnMouseEnter });
    expect(state.shouldShowCopyInfo).toEqual(true);
    expect(state.shouldShowCopyConfirm).toEqual(false);
  });

  it('should update the right end state for OnMouseLeave action', () => {
    const state = reducer(initialState, { type: ActionTypes.OnMouseLeave });
    expect(state.shouldShowCopyInfo).toEqual(false);
    expect(state.shouldShowCopyConfirm).toEqual(false);
  });

  it('should update the right end state for DismissCopyConfirm action', () => {
    const state = reducer(initialState, {
      type: ActionTypes.DismissCopyConfirm,
    });
    expect(state.shouldShowCopyInfo).toEqual(false);
    expect(state.shouldShowCopyConfirm).toEqual(false);
  });
});

describe('ClickCopyAnchor - Utilities', () => {
  it('should extract the right URL with anchor hash', () => {
    // mock window location for testing
    const mockWindow = {
      location: {
        href: 'http://booya.boo/',
        hash: '#my-old-heading-hash',
      },
    };

    let extractedURL = extractURLWithHash(mockWindow as Window, '#new-hash');
    expect(extractedURL).toEqual('http://booya.boo/#new-hash');

    mockWindow.location = {
      href: 'http://booya.boo/',
      hash: '',
    };

    extractedURL = extractURLWithHash(mockWindow as Window, '#new-hash');
    expect(extractedURL).toEqual('http://booya.boo/#new-hash');
  });
});
