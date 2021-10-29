import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { fireOperationalAnalytics } from '@atlassian/analytics-bridge';

import { FetchError } from './fetch-error';
import fireErrorAnalytics, {
  clearErrorAnalyticsClient,
  initialiseErrorAnalyticsClient,
  trackFetchErrors,
} from './fire-error-analytics';
import { captureException } from './sentry';

// @ts-ignore
global.__SERVER__ = false;

jest.mock('./sentry', () => ({
  captureException: jest.fn(),
}));

jest.mock('@atlassian/analytics-bridge', () => ({
  ...jest.requireActual<Object>('@atlassian/analytics-bridge'),
  fireOperationalAnalytics: jest.fn(),
}));

const mockOperationalEvent = jest.fn();

const mockAnalyticsWebClient = {
  sendOperationalEvent: mockOperationalEvent,
};

describe('fireErrorAnalytics', () => {
  const MOCK_ID = 'testId';
  const MOCK_FETCH_ERROR = new FetchError(401);
  const packageName = 'packageName';
  const meta = { id: 'someId', packageName };
  const actionSubject = 'packageName.someId';
  const action = 'failed';
  const attributes = { some: 'manualAttribute' };
  const errorInfo = {
    componentStack: 'some additional error info',
  };

  beforeEach(() => {
    clearErrorAnalyticsClient();
    jest.resetAllMocks();
  });

  test('should log an error in Sentry if there is one', () => {
    const newError = new Error('new error');
    initialiseErrorAnalyticsClient(mockAnalyticsWebClient);
    fireErrorAnalytics({
      error: newError,
      errorInfo,
      meta,
      attributes,
    });

    expect(captureException).toHaveBeenCalledTimes(1);
    expect(captureException).toHaveBeenCalledWith(actionSubject, newError, {
      ...attributes,
      packageName,
      errorInfo,
    });
  });

  test('should send sentry exception if analytics client is not initialised', () => {
    const otherAttributes = { another: 'analyticsAttribute ' };
    const clientUnitialisedError = new Error(
      "Analytics client hasn't been initialised, unable to fire error operational event",
    );
    const newError = new Error('new error');
    const newEvent = new UIAnalyticsEvent({
      payload: {
        action,
        attributes: otherAttributes,
      },
    });

    fireErrorAnalytics({
      error: newError,
      event: newEvent,
      meta,
      attributes,
    });

    expect(captureException).toHaveBeenCalledWith(
      actionSubject,
      clientUnitialisedError,
    );
  });

  test('should send analytics payload when sending error', () => {
    initialiseErrorAnalyticsClient(mockAnalyticsWebClient);
    const otherAttributes = { another: 'analyticsAttribute ' };
    const newError = new Error('new error');
    const newEvent = new UIAnalyticsEvent({
      payload: {
        action,
        attributes: otherAttributes,
      },
    });

    fireErrorAnalytics({
      error: newError,
      event: newEvent,
      meta,
      attributes,
    });

    expect(captureException).toHaveBeenCalledTimes(1);
    expect(captureException).toHaveBeenCalledWith(actionSubject, newError, {
      attributes: {
        ...otherAttributes,
        // this is here due to the fact that analytics-client auto-generates those
        // based on complicated logic of source detection
        // it's tested in analytics-bridge, no need to re-test it here
        namespaces: '',
      },
      ...attributes,
      packageName,
    });
  });

  test('should fire operational event if there is a proper Atlaskit event and web client is not initialised', () => {
    const newEvent = new UIAnalyticsEvent({
      payload: {
        action,
      },
    });
    newEvent.handlers = [jest.fn()];
    fireErrorAnalytics({
      event: newEvent,
      meta,
      attributes,
    });

    expect(fireOperationalAnalytics).toHaveBeenCalledTimes(1);
    expect(fireOperationalAnalytics).toHaveBeenCalledWith(
      newEvent,
      `${actionSubject} ${action}`,
      attributes,
    );
  });

  test('should fire operational event if there is a proper Atlaskit event', () => {
    initialiseErrorAnalyticsClient(mockAnalyticsWebClient);
    const newEvent = new UIAnalyticsEvent({
      payload: {
        action,
      },
    });
    newEvent.handlers = [jest.fn()];
    fireErrorAnalytics({
      event: newEvent,
      meta,
      attributes,
    });

    expect(fireOperationalAnalytics).toHaveBeenCalledTimes(1);
    expect(fireOperationalAnalytics).toHaveBeenCalledWith(
      newEvent,
      `${actionSubject} ${action}`,
      attributes,
    );
  });

  test('should fire operational event manually if there is no Atlaskit event', async () => {
    initialiseErrorAnalyticsClient(mockAnalyticsWebClient);
    await fireErrorAnalytics({ meta, attributes });

    expect(mockOperationalEvent).toHaveBeenCalledTimes(1);
    expect(mockOperationalEvent).toHaveBeenCalledWith({
      action,
      actionSubject,
      attributes,
      source: 'unknownErrorSource',
    });
  });

  test('Does not send FetchErrors to Sentry', () => {
    initialiseErrorAnalyticsClient(mockAnalyticsWebClient);
    trackFetchErrors({
      error: MOCK_FETCH_ERROR,
      id: MOCK_ID,
      packageName,
    });
    expect(captureException).toHaveBeenCalledTimes(0);
  });
});
