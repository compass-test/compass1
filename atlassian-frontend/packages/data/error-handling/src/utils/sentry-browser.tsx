// This is the only file that should directly import Raven.
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { Event, EventHint, Integration, Options } from '@sentry/types';
import uniq from 'lodash/uniq';

const getFragmentNames = (stackTrace: string) => {
  const re = /(?:src\/entry|src|assets)\/([^,./]+)/g;

  const fragmentNames = [];

  let fragmentName = re.exec(stackTrace);
  while (fragmentName) {
    fragmentNames.push(fragmentName[1]);
    fragmentName = re.exec(stackTrace);
  }

  const distinctfragmentNames = uniq(fragmentNames);

  return distinctfragmentNames;
};

// Add custom tags based on stack trace
const getTaggedData = (data: any, hint: any): any => {
  if (!hint) {
    return data;
  }

  const exception = hint.originalException || hint.syntheticException;
  if (!exception) {
    return data;
  }

  const stackTrace: string = exception.stack;
  if (!stackTrace) {
    return data;
  }

  const taggedData = data;

  const fragmentNames = getFragmentNames(stackTrace);

  if (!fragmentNames.length) {
    taggedData.tags = { ...taggedData.tags, fragment: 'unknown' };
  } else {
    taggedData.tags = { ...taggedData.tags, fragment: fragmentNames[0] };

    if (fragmentNames.length > 1) {
      taggedData.extra = {
        ...taggedData.extra,
        allRelevantFragments: fragmentNames,
      };
    }
  }

  return taggedData;
};

// https://docs.sentry.io/platforms/javascript/#removing-an-integration
const getFilteredIntegrations = (integrations: Integration[]): Integration[] =>
  integrations.filter(({ name }) => name !== 'Breadcrumbs');

const installGlobalHandler = (
  sentryUrl: string,
  config: Options,
  getExtraContext: () => Object,
) => {
  // Check for sentry already enabled to be defensive in case two fragments are loaded in the same page, we
  // don't want duplicated error reports
  const sentryClient = Sentry.getCurrentHub().getClient();
  if (sentryClient && sentryClient.getOptions().enabled) {
    return;
  }

  const defaultConfig = {
    dsn: sentryUrl,
    environment: process.env.NODE_ENV,

    // This adds our tags to the data sent to sentry
    beforeSend: (
      event: Event,
      hint: EventHint,
    ): PromiseLike<Event | null> | Event | null => {
      // Yes, we're mutating the argument, but at this point in the error handling lifecycle
      // immutability is not important and it simplifies the logic
      // Event type is documented here: https://github.com/getsentry/sentry-javascript/blob/master/packages/types/src/event.ts
      let updatedData: PromiseLike<Event | null> | Event | null;
      const extraBeforeSend = config.beforeSend || (() => null);
      updatedData = extraBeforeSend(event, hint);
      updatedData = getTaggedData(updatedData, hint);
      return updatedData;
    },
    //Integration typing doesn't seem to work well so I'm just typing it to any
    integrations: (integrations: Integration[]): any => [
      ...getFilteredIntegrations(integrations),
      new Integrations.Dedupe(),
      new Integrations.ExtraErrorData(),
      new Integrations.Transaction(),
      new Integrations.CaptureConsole({
        levels: ['error'],
      }),
      // not supporting the case where config.integrations is a function that returns an array
      ...(config.integrations && config.integrations instanceof Array
        ? config.integrations
        : []),
    ],
  };

  // Because we don't want to completely override the platform defaults remove them from the config object.
  // They've been integrated into the defaultConfig above.
  config.beforeSend = undefined;
  config.integrations = undefined;

  Sentry.init({
    ...defaultConfig,
    ...config,
  });

  try {
    Sentry.setExtras(getExtraContext());
  } catch (e) {
    Sentry.captureException(e);
  }
};

type Details = {
  [key: string]: string;
};

// structured tags that we send to Sentry
// everything else from details object will go into "extras"
const tags = ['packageName'];
const captureException = (
  location: string,
  error: Error,
  details: Details | void = undefined,
) => {
  Sentry.configureScope((scope) => {
    scope.setTag('logger', location);

    if (details) {
      Object.keys(details).forEach((key) => {
        if (tags.includes(key)) {
          scope.setTag(key, details[key]);
        } else {
          scope.setExtra(key, details[key]);
        }
      });
    }
  });

  Sentry.captureException(error);
};

export default {
  installGlobalHandler,
  captureException,
};
