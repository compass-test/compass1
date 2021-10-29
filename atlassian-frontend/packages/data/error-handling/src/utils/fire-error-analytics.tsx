declare const __SERVER__: boolean;

import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';

import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import {
  AnalyticsAttributes,
  extractAWCDataFromEvent,
  fireOperationalAnalytics,
} from '@atlassian/analytics-bridge';

import { FetchError } from './fetch-error';
import { captureException } from './sentry';

interface AnalyticsMeta {
  id: string;
  packageName: string;
}

// it's a workaround since React doesn't provide native types for this
interface ErrorInfo {
  componentStack: string;
}

export interface AnalyticsPayload {
  event?: UIAnalyticsEvent;
  error?: Error;
  errorInfo?: ErrorInfo;
  meta: AnalyticsMeta;
  attributes?: AnalyticsAttributes;
}

// At the time of writing, @atlassiansox/analytics-web-client did not publish types,
// if it now does that you should use those types instead (check https://experimentation-platform.atlassian.net/browse/MEP-1586)
interface AnalyticsWebClient {
  sendOperationalEvent: (event: Object) => void;
}

let analyticsClient: AnalyticsWebClient | undefined;

export const initialiseErrorAnalyticsClient = (client: AnalyticsWebClient) => {
  analyticsClient = client;
};

//This method exists only for testing, there shouldn't be any reason for this to be used outside of tests
export const clearErrorAnalyticsClient = () => {
  analyticsClient = undefined;
};

const fireErrorAnalytics = ({
  event,
  error,
  errorInfo,
  meta,
  attributes,
}: AnalyticsPayload) => {
  const { id, packageName } = meta;

  if (__SERVER__) {
    if (error) {
      throw error;
    } else {
      const payload = event && extractAWCDataFromEvent(event).payload;
      throw new Error(
        JSON.stringify({ event: payload, errorInfo, meta, attributes }),
      );
    }
  }

  const fullAnalyticsId = `${packageName}.${id}`;
  if (error) {
    const details = omitBy({ ...attributes, packageName, errorInfo }, isEmpty);

    if (event && event.context) {
      const fullEvent = extractAWCDataFromEvent(event);
      captureException(fullAnalyticsId, error, {
        ...details,
        ...fullEvent.payload,
      });
    } else {
      captureException(fullAnalyticsId, error, details);
    }
  }

  if (event && event.clone && event.handlers && event.handlers.length > 0) {
    const attrs: AnalyticsAttributes = attributes || {};
    fireOperationalAnalytics(event, `${fullAnalyticsId} failed`, attrs);
  } else {
    //Allow this to pass in a promise so that we can avoid blocking render for firing these events.
    if (analyticsClient && analyticsClient.sendOperationalEvent) {
      const gasV3Event = {
        action: 'failed',
        actionSubject: fullAnalyticsId,
        source: 'unknownErrorSource',
        attributes,
      };
      analyticsClient.sendOperationalEvent(gasV3Event);
    } else {
      const analyticsClientUninitialisedError = new Error(
        "Analytics client hasn't been initialised, unable to fire error operational event",
      );
      captureException(fullAnalyticsId, analyticsClientUninitialisedError);
    }
  }
};

interface FetchErrorPayload {
  error: FetchError;
  id: string;
  packageName: string;
}

export const trackFetchErrors = async ({
  error,
  id,
  packageName,
}: FetchErrorPayload) => {
  if (error.statusCode) {
    const { statusCode } = error;
    let statusCodeGroup;

    if (statusCode >= 300 && statusCode < 400) {
      statusCodeGroup = '3xx';
    } else if (statusCode >= 400 && statusCode < 500) {
      statusCodeGroup = '4xx';
    } else if (statusCode >= 500 && statusCode < 600) {
      statusCodeGroup = '5xx';
    } else {
      statusCodeGroup = 'unknown';
    }

    await fireErrorAnalytics({
      meta: {
        id,
        packageName,
      },
      attributes: {
        statusCodeGroup,
      },
    });
  } else {
    await fireErrorAnalytics({
      error,
      meta: {
        id,
        packageName,
      },
    });
  }
};

export default fireErrorAnalytics;
