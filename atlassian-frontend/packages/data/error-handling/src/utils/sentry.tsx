import { Options } from '@sentry/types';
import bowser from 'bowser';
import { RavenOptions } from 'raven-js';

import sentryBrowser from './sentry-browser';
import sentryRaven from './sentry-raven';

//IE 11 is going away soon anyway so this line is dead code.
const isIE11 = () =>
  bowser
    .getParser(
      typeof navigator !== 'undefined' ? navigator.userAgent || '' : '',
    )
    .satisfies({ 'internet explorer': '~11' });

// IE11 error with new sentry browser sdk - https://jdog.jira-dev.com/browse/JFP-2406
// remove when IE11 is deprecated and switch to new sentry client
export const installGlobalHandler = (
  sentryUrl: string,
  config: Options | RavenOptions,
  getExtraContext: () => Object,
) =>
  isIE11()
    ? sentryRaven.installGlobalHandler(
        sentryUrl,
        config as RavenOptions,
        getExtraContext,
      )
    : sentryBrowser.installGlobalHandler(
        sentryUrl,
        config as Options,
        getExtraContext,
      );

// IE11 error with new sentry browser sdk - https://jdog.jira-dev.com/browse/JFP-2406
// remove when IE11 is deprecated and switch to new sentry client
export const captureException = (
  location: string,
  error: Error,
  details: {} = {},
) =>
  isIE11()
    ? sentryRaven.captureException(location, error, details)
    : sentryBrowser.captureException(location, error, details);
