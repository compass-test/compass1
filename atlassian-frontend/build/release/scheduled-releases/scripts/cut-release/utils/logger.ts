import chalk from 'chalk';

export class Logger {
  public start(message: string) {
    console.log(chalk.bgBlack.whiteBright(message));
  }

  public finish(message: string) {
    console.log(chalk.bold.blueBright(message));
  }

  public success(message: string) {
    console.log(chalk.bold.greenBright(message));
  }

  public failure(message: string) {
    console.log(chalk.bold.redBright(message));
  }

  public async task(
    taskDescription: string,
    task: () => Promise<any>,
    outcome?: string,
  ) {
    console.log(chalk.white(`👷‍♂️Started ${taskDescription}...`));
    try {
      await task();
      const successText = outcome || taskDescription;
      this.success(`✅ ${successText} succeeded!`);
    } catch (err) {
      this.failure(`❌ ${taskDescription} failed!`);
      console.error(chalk.red(err && err.stack));
      throw err;
    }
  }
}
