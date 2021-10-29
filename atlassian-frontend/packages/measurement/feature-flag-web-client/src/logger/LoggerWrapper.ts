import { version } from '../util/version';

import { LoggerOptions, LoggerType, LogLevel } from './types';

const getDefaultLogLevel = () => LogLevel.INFO;
export const MESSAGE_PREFIX = `@atlassiansox/feature-flag-web-client@${version} -`;

export default class LoggerWrapper implements LoggerType {
  private isEnabled: boolean;
  private logger: LoggerType;
  private logLevel: LogLevel;

  constructor(options: LoggerOptions = {}) {
    this.isEnabled = options.enabled !== undefined ? options.enabled : true;
    this.logger = options.logger || console;
    this.logLevel = options.level || getDefaultLogLevel();
  }

  debug(...data: any[]) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.logger.debug(MESSAGE_PREFIX, ...data);
    }
  }

  info(...data: any[]) {
    if (this.shouldLog(LogLevel.INFO)) {
      this.logger.info(MESSAGE_PREFIX, ...data);
    }
  }

  log(...data: any[]) {
    if (this.shouldLog(LogLevel.LOG)) {
      this.logger.log(MESSAGE_PREFIX, ...data);
    }
  }

  warn(...data: any[]) {
    if (this.shouldLog(LogLevel.WARN)) {
      this.logger.warn(MESSAGE_PREFIX, ...data);
    }
  }

  error(...data: any[]) {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.logger.error(MESSAGE_PREFIX, ...data);
    }
  }

  private shouldLog(checkLevel: LogLevel): boolean {
    return this.isEnabled && checkLevel >= this.logLevel;
  }
}
