import { Severity } from '@sentry/types';

import { NoticeType } from '../components/Notice/noticeTypes';

export interface ReportErrorOptions {
  severity?: Severity;
  sentryIngore?: boolean;
}

export interface ErrorUtils {
  reportError(error: Error, options?: ReportErrorOptions): void;
  notifyUser(errorNotice: NoticeType, errorDetails?: string): Promise<void>;
}
