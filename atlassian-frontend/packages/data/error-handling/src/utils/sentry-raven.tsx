// This is the only file that should directly import Raven.
// eslint-disable-next-line no-restricted-imports
import { Event, Exception } from '@sentry/types';
import Raven, { RavenOptions } from 'raven-js';

const getAppNames = (line: string) => {
  const re = /(?:src\/entry|src|assets)\/([^,./]+)/g;

  const appNames = [];
  let appName = re.exec(line);
  while (appName) {
    appNames.push(appName[1]);
    appName = re.exec(line);
  }

  return appNames;
};

const addAppTags = (tagsObj: { [key: string]: boolean }, appNames: string[]) =>
  appNames.reduce((acc, appName) => {
    acc[`app.${appName}`] = true;
    return acc;
  }, tagsObj);

// Sentry interface has: stacktrace->frames->function
const getStackTraceFromData = (data: Exception): (string | undefined)[] => {
  if (data.stacktrace && data.stacktrace.frames) {
    return data.stacktrace.frames.map((frame) => frame.function);
  }
  return [];
};

// Evaluate in the future whether this function can be deprecated in favour of just using culprit for tagging
const getStackTraceFromDataWrapper = (data: Event) => {
  //TODO SDENG-1607 I think this code might be a bit buggy, it's impossible to get the types right here.
  //Making them work will require a significant logic refactor that I'll attempt after completing the move.
  let stackTrace: any;

  if (data && data.exception && data.exception.values) {
    stackTrace = data.exception.values.map((value) => {
      return value && value.stacktrace
        ? getStackTraceFromData(value)
        : undefined;
    });
  } else if (data && data.stacktrace) {
    stackTrace = getStackTraceFromData(data);
  } else {
    stackTrace = [];
  }

  return stackTrace;
};

const addAppNameTagToData = (data: Event) => {
  const appTagsFromTransaction = addAppTags(
    {},
    getAppNames(data.transaction || ''),
  );
  const appTagsFromStackTrace = getStackTraceFromDataWrapper(data).reduce(
    (acc: { [key: string]: boolean }, stackFrame: string) =>
      addAppTags(acc, getAppNames(stackFrame)),
    {},
  );
  const hasAppTags =
    Object.keys(appTagsFromTransaction).length > 0 ||
    Object.keys(appTagsFromStackTrace).length > 0;

  const appTags = hasAppTags
    ? {
        ...appTagsFromTransaction,
        ...appTagsFromStackTrace,
      }
    : {
        'app.unknown': true,
      };

  return {
    ...data,
    tags: {
      ...data.tags,
      ...appTags,
    },
  };
};

const installGlobalHandler = (
  sentryUrl: string,
  config: RavenOptions,
  getExtraContext: () => Object,
) => {
  // Check for isSetup() to be defensive in case two fragments are loaded in the same page, we
  // don't want duplicated error reports
  if (Raven.isSetup()) {
    return;
  }
  const extraDataCallback = config.dataCallback || (() => {});
  const defaultConfig = {
    dataCallback: (data: Event) => {
      // Yes, we're mutating the argument, but at this point in the error handling lifecycle
      // immutability is not important and it simplifies the logic
      let updatedData: Event = data;
      updatedData = extraDataCallback(updatedData);
      // This adds our tags to the data sent to sentry
      return addAppNameTagToData(updatedData);
    },
    // See https://docs.sentry.io/clients/javascript/config/ for options
    autoBreadcrumbs: false,
  };

  Raven.config(sentryUrl, {
    ...defaultConfig,
    ...config,
  }).install();

  let context = {};
  try {
    context = getExtraContext();
  } catch (e) {
    Raven.captureException(e);
  }
  Raven.setExtraContext(context);

  window.addEventListener('unhandledrejection', (ev) => {
    Raven.captureException(ev.reason);
  });
};

const captureException = (location: string, error: Error, details: {} = {}) => {
  Raven.captureException(error, { logger: location, extra: details });
};

export default {
  installGlobalHandler,
  captureException,
};
