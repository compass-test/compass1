/* eslint-disable no-alert */
/* eslint-disable no-console */
import * as Sentry from '@sentry/browser';

import { NoticeType } from '@atlassian/proforma-common-core/jira-common';
import {
  BrowserUtils,
  ErrorUtils,
  ReportErrorOptions,
} from '@atlassian/proforma-common-core/jira-common-utils';

export class MockErrorUtils implements ErrorUtils {
  private readonly browserUtils: BrowserUtils;

  public constructor(browserUtils: BrowserUtils) {
    this.browserUtils = browserUtils;
  }

  public reportError = (error: Error, options: ReportErrorOptions): void => {
    const errorPrefix = `ProForma: `;
    const severity = options?.severity
      ? options.severity
      : Sentry.Severity.Error;
    switch (severity) {
      case Sentry.Severity.Warning:
        console.warn(errorPrefix, error);
        break;
      case Sentry.Severity.Info:
        console.info(errorPrefix, error);
        break;
      default:
        console.error(errorPrefix, error);
        break;
    }
  };

  public notifyUser = (
    errorNotice: NoticeType,
    errorDetails?: string,
  ): Promise<void> => {
    return this.browserUtils
      .showNotice(errorNotice, undefined, errorDetails)
      .then(() => {});
  };
}
