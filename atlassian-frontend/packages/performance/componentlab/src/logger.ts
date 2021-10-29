import { LogLevel } from '../types';

import winston from 'winston';
import compact from 'lodash/compact';

// See https://github.com/winstonjs/winston#formats
const interactiveFormat = winston.format.printf(({ level, label, message }) => {
  return compact([level, label == null ? null : `[${label}]`, message]).join(
    ' ',
  );
});

export function createLogger({
  logLevel = 'info',
}: {
  logLevel: undefined | LogLevel;
}) {
  return winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      ...compact([
        process.env.CI == null ? winston.format.colorize() : null,
        interactiveFormat,
      ]),
    ),
    transports: new winston.transports.Console(),
  });
}
