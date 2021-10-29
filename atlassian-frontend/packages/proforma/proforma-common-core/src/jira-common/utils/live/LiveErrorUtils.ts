/* eslint-disable no-console */
import * as Sentry from '@sentry/browser';

import { NoticeType } from '../../components/Notice/noticeTypes';
import { BrowserUtils } from '../BrowserUtils';
import { ErrorUtils, ReportErrorOptions } from '../ErrorUtils';

export class LiveErrorUtils implements ErrorUtils {
  private readonly moduleName?: string;

  private readonly browserUtils: BrowserUtils;

  public constructor(browserUtils: BrowserUtils, moduleName?: string) {
    this.browserUtils = browserUtils;
    this.moduleName = moduleName;
  }

  public reportError(error: Error, options?: ReportErrorOptions): void {
    const errorPrefix = `Proforma${
      this.moduleName ? `(${this.moduleName})` : ''
    }: `;
    const severity = options?.severity
      ? options.severity
      : Sentry.Severity.Error;

    // 1) Log error in console
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

    // 2) Send error to sentry
    // if (!options?.sentryIngore) {
    //   Sentry.configureScope((scope): void => {
    //     scope.setLevel(severity);
    //   });
    //   Sentry.captureException(error);
    // }
  }

  public notifyUser(
    errorNotice: NoticeType,
    errorDetails?: string,
  ): Promise<void> {
    return this.browserUtils
      .showNotice(errorNotice, undefined, errorDetails)
      .then(() => {});
  }
}
