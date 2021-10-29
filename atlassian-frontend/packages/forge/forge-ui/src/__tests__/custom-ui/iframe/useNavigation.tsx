jest.mock('../../../custom-ui/iframe/navigate');

import { navigate } from '../../../custom-ui/iframe/navigate';

import React, { useEffect } from 'react';

import { act, fireEvent, render, wait } from '@testing-library/react';

import {
  useNavigation,
  getLinkType,
  getAnalyticsAttributes,
} from '../../../custom-ui/iframe/useNavigation';
import { NavigatePayload } from '../../../custom-ui/useBridge';
import AnalyticsListener from '@atlaskit/analytics-next/AnalyticsListener';

const ExternalLinkModal = ({
  onNavigateRef,
}: {
  onNavigateRef: { current: (payload: NavigatePayload) => Promise<void> };
}) => {
  const { onNavigate, getModalJsx } = useNavigation({
    extension: { properties: { title: 'my extension' } },
  });

  useEffect(() => {
    onNavigateRef.current = onNavigate;
  }, [onNavigateRef, onNavigate]);

  return <div>{getModalJsx()}</div>;
};

function asMockedFunction<T extends (...args: any[]) => any>(
  fn: T,
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}

const mockNavigate = asMockedFunction(navigate);

describe('useNavigation', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('immediately navigates for a trusted link', async () => {
    const onNavigateRef: {
      current: (payload: NavigatePayload) => Promise<void>;
    } = {
      current: undefined!,
    };
    render(<ExternalLinkModal onNavigateRef={onNavigateRef} />);

    act(() => {
      onNavigateRef.current({ url: '/browse', type: 'same-tab' });
    });

    expect(mockNavigate).toHaveBeenCalledWith('/browse', 'same-tab', undefined);
  });

  it('confirms an external link', async () => {
    const onNavigateRef: {
      current: (payload: NavigatePayload) => Promise<void>;
    } = {
      current: undefined!,
    };
    const onAnalyticsEvent = jest.fn();
    const view = render(
      <AnalyticsListener channel="forge-ui" onEvent={onAnalyticsEvent}>
        <ExternalLinkModal onNavigateRef={onNavigateRef} />
      </AnalyticsListener>,
    );

    act(() => {
      onNavigateRef.current({
        url: 'https://example.com?abcd',
        type: 'same-tab',
      });
    });

    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          eventType: 'ui',
          data: {
            action: 'viewed',
            actionSubject: 'externalLinkModal',
            attributes: {
              queryStringSize: 4,
              url: 'https://example.com?abcd',
            },
          },
        }),
      }),
      'forge-ui',
    );

    // Confirm the modal
    const continueButton = await view.findByText('Continue');
    fireEvent.click(continueButton);

    expect(mockNavigate).toHaveBeenCalledWith(
      'https://example.com?abcd',
      'same-tab',
      undefined,
    );

    await wait(() => {
      expect(onAnalyticsEvent).toHaveBeenCalledTimes(2);
    });

    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          eventType: 'ui',
          data: {
            action: 'approved',
            actionSubject: 'externalLinkModal',
            attributes: {
              queryStringSize: 4,
              url: 'https://example.com?abcd',
            },
          },
        }),
      }),
      'forge-ui',
    );
  });

  it('cancels an external link', async () => {
    const onNavigateRef: {
      current: (payload: NavigatePayload) => Promise<void>;
    } = {
      current: undefined!,
    };
    const onAnalyticsEvent = jest.fn();
    const view = render(
      <AnalyticsListener channel="forge-ui" onEvent={onAnalyticsEvent}>
        <ExternalLinkModal onNavigateRef={onNavigateRef} />
      </AnalyticsListener>,
    );

    act(() => {
      onNavigateRef
        .current({
          url: 'https://example.com?abcdef',
          type: 'same-tab',
        })
        .catch(() => {
          // ignore expected cancellation rejection
        });
    });

    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          eventType: 'ui',
          data: {
            action: 'viewed',
            actionSubject: 'externalLinkModal',
            attributes: {
              queryStringSize: 6,
              url: 'https://example.com?abcdef',
            },
          },
        }),
      }),
      'forge-ui',
    );

    // Cancel the modal
    const cancelButton = await view.findByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockNavigate).not.toHaveBeenCalled();

    expect(onAnalyticsEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          eventType: 'ui',
          data: {
            action: 'cancelled',
            actionSubject: 'externalLinkModal',
            attributes: {
              queryStringSize: 6,
              url: 'https://example.com?abcdef',
            },
          },
        }),
      }),
      'forge-ui',
    );
  });

  it('rejects invalid links', async () => {
    const onNavigateRef: {
      current: (payload: NavigatePayload) => Promise<void>;
    } = {
      current: undefined!,
    };
    render(<ExternalLinkModal onNavigateRef={onNavigateRef} />);

    await expect(() =>
      onNavigateRef.current({
        url: 'javascript:alert()',
        type: 'same-tab',
      }),
    ).rejects.toThrow('navigate link is invalid: javascript:alert()');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

describe('getLinkType', () => {
  test.each([
    ['http://example.com', 'external'],
    ['https://example.com', 'external'],
    ['https://example.atlassian.net/browse/ISSUE-1', 'external'],
    ['/browse/ISSUE-1', 'trusted'],
    ['javscript://alert("hi")', 'invalid'],
    ['javscript:alert()', 'invalid'],
    ['//example.com', 'invalid'],
    ['%2F%2Feww.com', 'invalid'],
  ])('%s is %s', (url: string, expectedType: string) => {
    expect(getLinkType(url)).toBe(expectedType);
  });
});

describe('getAnalyticsAttributes', () => {
  test.each([
    ['http://test.atlassian.net/issues', 0],
    ['http://test.atlassian.net/issues?', 0],
    ['http://test.atlassian.net/issues?q', 1],
    ['http://test.atlassian.net/issues/?filter=1234', 11],
    ['https://test.atlassian.net/issues/?filter=1234#fragment', 11],
    ['https://example.com?data=abcd1234', 13],
  ])('%s %d', (url: string, expectedQueryStringLength: number) => {
    expect(getAnalyticsAttributes(url)).toStrictEqual({
      url,
      queryStringSize: expectedQueryStringLength,
    });
  });
});
