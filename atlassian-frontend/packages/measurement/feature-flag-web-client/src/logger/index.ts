import LoggerWrapper from './LoggerWrapper';
import type { LoggerOptions, LoggerType, LogLevel } from './types';

export type { LoggerOptions, LoggerType, LogLevel };

let logger: LoggerWrapper;

export default (options?: LoggerOptions): LoggerType => {
  if (!logger) {
    logger = new LoggerWrapper(options);
  }
  return logger;
};
