import React from 'react';

import type { default as CoordinationClient } from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';
import { fireEvent, render, wait } from '@testing-library/react';
import userEvents from '@testing-library/user-event';

import { mockCoordinationClient } from '../../../../helpers/coordination-client';
import { ChangeBoardContextProvider } from '../../../common/utils/changeboard-context';
import { createMockProviders } from '../../utils/test-helpers';

import ChangeBoardBanner from './index';

const TEST_IDS = {
  CHANGEBOARD_BANNER: 'notifications__changeboarding',
};

const asPromise = (client: CoordinationClient) => {
  return new Promise<CoordinationClient>((resolve) => {
    resolve(client);
  });
};

const renderChangeBoard = (
  element: JSX.Element,
  client?: CoordinationClient | Promise<CoordinationClient>,
  messageId?: string,
) => {
  const { MockProviders, onAnalyticEventFired } = createMockProviders({
    shouldTrackAnalyticsPayload: (payload) =>
      payload.actionSubject === 'changeBoardingBanner',
    coordinationClient: client,
    changeBoardMessageId: messageId,
  });
  const result = render(
    <MockProviders>
      <ChangeBoardContextProvider>{element}</ChangeBoardContextProvider>
    </MockProviders>,
  );
  return {
    result,
    onAnalyticErrorFired: onAnalyticEventFired,
  };
};

const createMockCoordinationClient = (
  startResponse: boolean | Error,
  stopResponse: boolean | Error,
) => {
  const mockStartFn = jest.fn().mockImplementation(() => {
    if (startResponse instanceof Error) {
      return Promise.reject(startResponse);
    } else {
      return Promise.resolve(startResponse);
    }
  });
  const mockStopFn = jest.fn().mockImplementation(() => {
    if (stopResponse instanceof Error) {
      return Promise.reject(stopResponse);
    } else {
      return Promise.resolve(stopResponse);
    }
  });
  const client = mockCoordinationClient({
    startFn: mockStartFn,
    stopFn: mockStopFn,
  });
  return { client, mockStartFn, mockStopFn };
};

describe('ChangeBoard banner', () => {
  describe('no render scenarios', () => {
    it('should not render if a client is not provided', () => {
      const {
        result: { container, queryByTestId },
        onAnalyticErrorFired,
      } = renderChangeBoard(
        <ChangeBoardBanner />,
        undefined,
        'mock-message-id',
      );
      expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
      expect(container.innerHTML).toEqual('');
    });
    it('should not render if client is provided but a messageId is not provided', () => {
      const { client, mockStartFn } = createMockCoordinationClient(true, true);
      const {
        result: { container, queryByTestId },
        onAnalyticErrorFired,
      } = renderChangeBoard(<ChangeBoardBanner />, client);
      expect(mockStartFn).toHaveBeenCalledTimes(0);
      expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
      expect(container.innerHTML).toEqual('');
    });
    it('should not render if client promise is provided but a messageId is not provided', async () => {
      const { client, mockStartFn } = createMockCoordinationClient(true, true);
      const {
        result: { container, queryByTestId },
        onAnalyticErrorFired,
      } = renderChangeBoard(<ChangeBoardBanner />, asPromise(client));
      await Promise.resolve();
      expect(mockStartFn).toHaveBeenCalledTimes(0);
      expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
      expect(container.innerHTML).toEqual('');
    });
  });

  describe('starting the banner', () => {
    describe.each([
      [false, 'returns client as a normal object'],
      [true, 'returns client as a promise'],
    ])(`%s - %s`, (returnClientAsPromise) => {
      it('should call start and show the dismissable banner', async () => {
        const { client, mockStartFn } = createMockCoordinationClient(
          true,
          true,
        );
        const {
          result: { queryByTestId },
          onAnalyticErrorFired,
        } = renderChangeBoard(
          <ChangeBoardBanner />,
          returnClientAsPromise ? asPromise(client) : client,
          'mock-message-id',
        );

        await wait(() => {
          expect(mockStartFn).toHaveBeenCalledWith('mock-message-id');
        });
        const changeboardContainer = queryByTestId(TEST_IDS.CHANGEBOARD_BANNER);
        expect(changeboardContainer).toBeInTheDocument();
        expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      });
      it('should show nothing if call to start falsy', async () => {
        const { client, mockStartFn } = createMockCoordinationClient(
          false,
          true,
        );
        const {
          result: { container, queryByTestId },
          onAnalyticErrorFired,
        } = renderChangeBoard(
          <ChangeBoardBanner />,
          returnClientAsPromise ? asPromise(client) : client,
          'mock-message-id',
        );

        await wait(() => {
          expect(mockStartFn).toHaveBeenCalledWith('mock-message-id');
        });
        expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
        expect(container.innerHTML).toEqual('');
        expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      });

      it('should show nothing if call to start fails', async () => {
        const { client, mockStartFn } = createMockCoordinationClient(
          new Error('Start failed mock error'),
          true,
        );
        const {
          result: { container, queryByTestId },
          onAnalyticErrorFired,
        } = renderChangeBoard(
          <ChangeBoardBanner />,
          returnClientAsPromise ? asPromise(client) : client,
          'mock-message-id',
        );

        await wait(() => {
          expect(mockStartFn).toHaveBeenCalledWith('mock-message-id');
        });
        expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
        expect(container.innerHTML).toEqual('');
        expect(onAnalyticErrorFired.mock.calls[0][0]).toEqual({
          action: 'failedToStart',
          actionSubject: 'changeBoardingBanner',
          attributes: {
            categoryFilter: 'direct',
            errorName: 'Error',
            product: 'unset',
            readStateFilter: 'any',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'operational',
          tenantIdType: 'none',
        });
      });
    });
  });

  describe('dismissing the banner', () => {
    describe.each([
      [false, 'returns client as a normal object'],
      [true, 'returns client as a promise'],
    ])(`%s - %s`, (returnClientAsPromise) => {
      it.skip('should dismiss the banner and call "stop"', async () => {
        const {
          client,
          mockStartFn,
          mockStopFn,
        } = createMockCoordinationClient(true, true);
        const {
          result: { findByTestId, queryByTestId, getByText },
          onAnalyticErrorFired,
        } = renderChangeBoard(
          <ChangeBoardBanner />,
          returnClientAsPromise ? asPromise(client) : client,
          'mock-message-id',
        );

        // Wait for the banner to appear
        await wait(() => {
          expect(mockStartFn).toHaveBeenCalledWith('mock-message-id');
        });
        const changeboardContainer = await findByTestId(
          TEST_IDS.CHANGEBOARD_BANNER,
        );
        // Click dismiss
        const actionButton = getByText('OK');
        userEvents.click(actionButton);

        await wait(() => {
          expect(mockStopFn).toHaveBeenCalledWith('mock-message-id');
        });
        fireEvent.transitionEnd(changeboardContainer);
        await wait(() => {
          expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
        });
        expect(onAnalyticErrorFired).toHaveBeenCalledTimes(0);
      });

      it('should dismiss the banner even if "stop" fails', async () => {
        const {
          client,
          mockStartFn,
          mockStopFn,
        } = createMockCoordinationClient(
          true,
          new Error('Stop failed mock error'),
        );
        const {
          result: { findByTestId, queryByTestId, getByText },
          onAnalyticErrorFired,
        } = renderChangeBoard(
          <ChangeBoardBanner />,
          returnClientAsPromise ? asPromise(client) : client,
          'mock-message-id',
        );

        // Wait for the banner to appear
        await wait(() => {
          expect(mockStartFn).toHaveBeenCalledWith('mock-message-id');
        });
        const changeboardContainer = await findByTestId(
          TEST_IDS.CHANGEBOARD_BANNER,
        );

        // Click dismiss
        const actionButton = getByText('OK');
        userEvents.click(actionButton);

        await wait(() => {
          expect(mockStopFn).toHaveBeenCalledWith('mock-message-id');
        });
        fireEvent.transitionEnd(changeboardContainer);
        await wait(() => {
          expect(queryByTestId(TEST_IDS.CHANGEBOARD_BANNER)).toBeNull();
        });
        expect(onAnalyticErrorFired.mock.calls[0][0]).toEqual({
          action: 'failedToStop',
          actionSubject: 'changeBoardingBanner',
          attributes: {
            categoryFilter: 'direct',
            errorName: 'Error',
            readStateFilter: 'any',
            product: 'unset',
            userHourOfDay: expect.any(Number),
          },
          eventType: 'operational',
          tenantIdType: 'none',
        });
      });
    });
  });
});
