import React from 'react';
import { mount } from 'enzyme';
import waitForExpect from 'wait-for-expect';

import asDataProvider from '../../as-data-provider';
import { AnalyticsListener } from '@atlaskit/analytics-next';

const RESOLVED_VALUE = {};
const EXPECTED_ERROR_VALUE = 'ERROR';

const failedEventObject = {
  hasFired: true,
  payload: {
    action: 'failed',
    actionSubject: 'atlassianSwitcherDataProvider',
    actionSubjectId: 'test',
    attributes: {
      provider: 'test',
      outdated: false,
      reason: {
        name: 'Unknown',
        status: undefined,
      },
    },
    eventType: 'operational',
  },
};
const retryEventFailedObject = (count: number) => ({
  hasFired: true,
  payload: {
    action: 'retried',
    actionSubject: 'atlassianSwitcherDataProvider',
    actionSubjectId: 'test',
    attributes: {
      provider: 'test',
      outdated: false,
      reason: {
        name: 'Unknown',
        status: undefined,
      },
      retryCount: count,
    },
    eventType: 'operational',
  },
});
describe('as-data-provider', () => {
  const childrenPropMock = jest.fn(() => null);

  afterEach(() => {
    childrenPropMock.mockClear();
  });

  it('should start from loading state then transition to complete', async () => {
    expect.assertions(4);

    const resolvedPromise = Promise.resolve(RESOLVED_VALUE);

    const DataProvider = asDataProvider('test', () => resolvedPromise);

    mount(<DataProvider>{childrenPropMock}</DataProvider>);

    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: null,
      status: 'loading',
    });

    await resolvedPromise;
    await new Promise((r) => setTimeout(r, 0));
    expect(childrenPropMock).toHaveBeenCalledTimes(2);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: RESOLVED_VALUE,
      status: 'complete',
    });
  });

  it('should start from complete state and update with fresh value', async () => {
    expect.assertions(4);

    const CACHED_VALUE = 'CACHED';
    const resolvedPromise = Promise.resolve(RESOLVED_VALUE);

    const DataProvider = asDataProvider(
      'test',
      () => resolvedPromise,
      () => CACHED_VALUE,
    );

    mount(<DataProvider>{childrenPropMock}</DataProvider>);

    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: CACHED_VALUE,
      status: 'complete',
    });

    await resolvedPromise;
    await new Promise((r) => setTimeout(r, 0));
    expect(childrenPropMock).toHaveBeenCalledTimes(2);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: RESOLVED_VALUE,
      status: 'complete',
    });
  });

  // Error state

  it('should start from complete state and NOT transition to error state', async () => {
    expect.assertions(3);

    const CACHED_VALUE = 'CACHED';
    const rejectedPromise = Promise.reject(EXPECTED_ERROR_VALUE);

    const DataProvider = asDataProvider(
      'test',
      () => rejectedPromise,
      () => CACHED_VALUE,
    );

    mount(<DataProvider>{childrenPropMock}</DataProvider>);

    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: CACHED_VALUE,
      status: 'complete',
    });

    try {
      await rejectedPromise;
    } catch (e) {}

    expect(childrenPropMock).toHaveBeenCalledTimes(1); // no subsequent call expected
  });

  it('should start from loading state then transition to error state', async () => {
    expect.assertions(4);

    const rejectedPromise = Promise.reject(EXPECTED_ERROR_VALUE);

    const DataProvider = asDataProvider('test', () => rejectedPromise);
    mount(<DataProvider>{childrenPropMock}</DataProvider>);

    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: null,
      status: 'loading',
    });

    try {
      await rejectedPromise;
    } catch (e) {}

    await waitForExpect(() => {
      expect(childrenPropMock).toHaveBeenCalledTimes(2);
      expect(childrenPropMock).toHaveBeenLastCalledWith({
        data: null,
        status: 'error',
        error: EXPECTED_ERROR_VALUE,
      });
    });
  });

  // Unmounted

  it('should not transition to a different anything if unmounted', async () => {
    expect.assertions(3);

    const resolvedPromise = Promise.resolve(RESOLVED_VALUE);

    const DataProvider = asDataProvider('test', () => resolvedPromise);

    mount(<DataProvider>{childrenPropMock}</DataProvider>).unmount();

    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock).toHaveBeenLastCalledWith({
      data: null,
      status: 'loading',
    });

    await resolvedPromise;
    expect(childrenPropMock).toHaveBeenCalledTimes(1);
  });

  // Events

  it('should fire receivedResult event', async () => {
    expect.assertions(2);

    const onEvent = jest.fn();
    const resolvedPromise = Promise.resolve();

    const DataProvider = asDataProvider('test', () => resolvedPromise);

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    );

    await resolvedPromise;
    await new Promise((r) => setTimeout(r, 0));
    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent.mock.calls[0][0]).toMatchObject({
      hasFired: true,
      payload: {
        action: 'receivedResult',
        actionSubject: 'atlassianSwitcherDataProvider',
        actionSubjectId: 'test',
        attributes: { outdated: false },
        eventType: 'operational',
      },
    });
  });

  it('should fire failed event', async () => {
    expect.assertions(2);

    const onEvent = jest.fn();
    const rejectedPromise = Promise.reject();

    const DataProvider = asDataProvider('test', () => rejectedPromise);

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    );

    try {
      await rejectedPromise;
    } catch (e) {}

    await waitForExpect(() => {
      expect(onEvent).toHaveBeenCalledTimes(1);
      expect(onEvent.mock.calls[0][0]).toEqual(
        expect.objectContaining(failedEventObject),
      );
    });
  });

  it('should fire receivedResult event with outdated attribute', async () => {
    expect.assertions(2);

    const onEvent = jest.fn();
    const resolvedPromise = Promise.resolve();

    const DataProvider = asDataProvider('test', () => resolvedPromise);

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    ).unmount();

    await resolvedPromise;
    await new Promise((r) => setTimeout(r, 0));
    expect(onEvent).toHaveBeenCalledTimes(1);
    expect(onEvent.mock.calls[0][0]).toMatchObject({
      hasFired: true,
      payload: {
        attributes: {
          provider: 'test',
          outdated: true,
        },
      },
    });
  });

  it('should fire retried events', async () => {
    const onEvent = jest.fn();
    const rejectedPromise = Promise.reject();

    const DataProvider = asDataProvider(
      'test',
      () => rejectedPromise,
      undefined,
      {
        shouldRetryOnException: () => true,
        intervalsMS: [50, 200, 1000],
      },
    );

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    );

    await waitForExpect(() => {
      expect(onEvent).toHaveBeenCalledTimes(4);
    });

    expect(onEvent.mock.calls[0][0]).toEqual(
      expect.objectContaining(retryEventFailedObject(1)),
    );
    expect(onEvent.mock.calls[1][0]).toEqual(
      expect.objectContaining(retryEventFailedObject(2)),
    );
    expect(onEvent.mock.calls[2][0]).toEqual(
      expect.objectContaining(retryEventFailedObject(3)),
    );
    expect(onEvent.mock.calls[3][0]).toEqual(
      expect.objectContaining(failedEventObject),
    );
  });
  it('should not retry if exception not in filter', async () => {
    const onEvent = jest.fn();
    let rejectedPromiseCount = 0;
    const rejectedPromise = () => {
      rejectedPromiseCount++;
      return Promise.reject();
    };

    const DataProvider = asDataProvider(
      'test',
      () => rejectedPromise(),
      undefined,
      {
        shouldRetryOnException: () => rejectedPromiseCount < 2,
        intervalsMS: [50, 200, 1000],
      },
    );

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    );

    await waitForExpect(() => {
      expect(onEvent).toHaveBeenCalledTimes(2);
    });

    expect(onEvent.mock.calls[0][0]).toEqual(
      expect.objectContaining(retryEventFailedObject(1)),
    );
    expect(onEvent.mock.calls[1][0]).toEqual(
      expect.objectContaining(failedEventObject),
    );
  });
  it('should fire retried events', async () => {
    const onEvent = jest.fn();
    const rejectedPromise = Promise.reject();

    const DataProvider = asDataProvider(
      'test',
      () => rejectedPromise,
      undefined,
      {
        shouldRetryOnException: () => true,
        intervalsMS: [50, 200, 1000],
        customErrorToReason: () => ({ name: 'error', status: 999 }),
      },
    );

    mount(
      <AnalyticsListener onEvent={onEvent} channel="*">
        <DataProvider>{childrenPropMock}</DataProvider>
      </AnalyticsListener>,
    );

    await waitForExpect(() => {
      expect(onEvent).toHaveBeenCalledTimes(4);
    });

    const retryEvent = retryEventFailedObject(1);
    expect(onEvent.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        ...retryEvent,
        payload: {
          ...retryEvent.payload,
          attributes: {
            provider: 'test',
            outdated: false,
            reason: { name: 'error', status: 999 },
            retryCount: 1,
          },
        },
      }),
    );
  });
});
