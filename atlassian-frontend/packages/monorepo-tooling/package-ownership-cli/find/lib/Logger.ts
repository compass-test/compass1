import chalk from 'chalk';

export class Logger {
  private static errors: string[] = [];
  private static verbose: boolean = false;

  static setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  static log(...args: any[]) {
    if (this.verbose) {
      console.log(chalk.yellow('[DEBUG]'), ...args);
    }
  }

  /** Add an error to be printed at the end. Log now if --verbose is set. */
  static addError(error: string) {
    this.errors.push(error);
    if (this.verbose) {
      console.error(chalk.red('[ERROR]', error));
    }
  }

  /** Print all errors for the user */
  static printErrors() {
    if (!this.verbose) {
      console.error(this.errors.map(error => chalk.red(error)).join('\n'));
    }
  }

  /** Log error and exit with code */
  static exit(message?: string, code: number = 1) {
    if (message) {
      console.error(
        chalk`{red {bold ${message}}\nUse the {bold --help} flag for more information}`,
      );
    }
    process.exit(code);
  }
}
