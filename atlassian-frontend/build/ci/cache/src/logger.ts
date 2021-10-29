import fs from 'fs';

import chalk from 'chalk';

export type LogLevel = 'trace' | 'verbose' | 'info' | 'warn' | 'error' | 'off';

const levels: LogLevel[] = ['trace', 'verbose', 'info', 'warn', 'error'];

export class Logger {
  private logLevelNum: number;

  constructor(logLevel: LogLevel, private logFilepath?: string) {
    this.logLevelNum = logLevel === 'off' ? 100 : levels.indexOf(logLevel);
    if (this.logLevelNum === -1) {
      throw new Error(`Invalid log level "${logLevel}"`);
    }
  }

  trace(msg: any, packageName?: string) {
    this.log(msg, 'trace', packageName);
  }
  verbose(msg: any, packageName?: string) {
    this.log(msg, 'verbose', packageName);
  }
  info(msg: any, packageName?: string) {
    this.log(msg, 'info', packageName);
  }
  warn(msg: any, packageName?: string) {
    this.log(msg, 'warn', packageName);
  }
  error(msg: any, packageName?: string) {
    this.log(msg, 'error', packageName);
  }

  profile(name: string, packageName?: string, level: LogLevel = 'verbose') {
    const start = Date.now();

    return {
      stop: (suffix: string = '') => {
        const time = (Date.now() - start).toFixed(0) + 'ms';
        this.log(
          `${name}${suffix} took ${chalk.blue(time)}`,
          level,
          packageName,
        );
        return time;
      },
    };
  }

  private log(msg: any, logLevel: LogLevel, packageName?: string) {
    const prefix = chalk.yellow(
      'cache' + (packageName ? ` (${packageName})` : ''),
    );
    const levelNum = levels.indexOf(logLevel);
    if (levelNum >= this.logLevelNum) {
      const fullMsg = `${prefix}: ${msg}`;
      if (this.logFilepath) {
        fs.appendFileSync(this.logFilepath, `${fullMsg}\n`);
        if (logLevel === 'error') {
          // Still print errors out to the console
          console.log(fullMsg);
        }
      } else {
        console.log(fullMsg);
      }
    }
  }
}
