import chalk from 'chalk';
import meow from 'meow';
import { ValidationError, ErrorType, Command } from './types';
import * as pushCmd from './commands/push';
import * as cloneProductRepoCmd from './commands/clone-product-repo';

// prettier-ignore
const HELP_MSG = `
  🚀 Atlassian Frontend branch deploy product integrator™ 🚀

  ${chalk.green('Commands')}

  ${chalk.yellow.bold('help')}                  Show help information for a command
  ${chalk.yellow.bold('push')}                  Installs an atlassian frontend branch deploy and pushes it to a product repo
  ${chalk.yellow.bold('clone-product-repo')}    Clone and checkout a product repo outside of atlassian-frontend to be used by 'push'


  ${chalk.green('Global options')}
    ${chalk.yellow('--dryRun')}     Performs a dry run, does not perform actual git commands or fetch requests
`;

class CliValidationError extends Error implements ValidationError {
  type: ErrorType = 'cli';
}

type CommandImpl = {
  run: (inputs: string[], flags: {}) => Promise<unknown>;
  helpMsg: string;
};

const commandMap: Record<Command, CommandImpl> = {
  push: {
    run: (inputs: string[], flags: {}) =>
      pushCmd.push(inputs[0], inputs[1], flags),
    helpMsg: pushCmd.HELP_MSG,
  },
  'clone-product-repo': {
    run: (_, flags: {}) => cloneProductRepoCmd.checkoutProductRepo(flags),
    helpMsg: cloneProductRepoCmd.HELP_MSG,
  },
};

export async function run() {
  const cli = meow(HELP_MSG, {
    autoHelp: false,
    // Do not include unspecified boolean flags in result so subcommand validation on invalid flags
    // does not incorrectly trigger
    booleanDefault: undefined,
    flags: {
      branchPrefix: {
        type: 'string',
      },
      afBranchName: {
        type: 'string',
      },
      packageEngine: {
        type: 'string',
      },
      afCommitHash: {
        type: 'string',
      },
      packages: {
        type: 'string',
      },
      dedupe: {
        type: 'boolean',
      },
      cmd: {
        type: 'string',
      },
      dryRun: {
        type: 'boolean',
      },
      productCiPlanUrl: {
        type: 'string',
      },
      shallow: {
        type: 'boolean',
      },
      overrideCommit: {
        type: 'boolean',
      },
      ci: {
        type: 'boolean',
      },
    },
  });

  let [command, ...inputs] = cli.input;

  if (command === 'help') {
    cli.flags.help = true;
    command = inputs[0];
  }

  try {
    if (command == null) {
      // This exits with non-zero exit status
      cli.showHelp();
      return;
    }

    if (!Object.keys(commandMap).includes(command)) {
      throw new CliValidationError('Invalid command');
    }

    let commandImpl = commandMap[command as Command];
    if (cli.flags.help) {
      console.log(commandImpl.helpMsg);
      process.exit(1);
    }
    return await commandImpl.run(inputs, cli.flags);
  } catch (e) {
    if (e.type === 'cli') {
      console.error(chalk.red(e.message));
      cli.showHelp(2);
    } else if (Object.keys(commandMap).includes(e.type)) {
      const commandImpl = commandMap[e.type as Command];
      console.error(chalk.red(e.message));
      console.log(commandImpl.helpMsg);
      process.exit(2);
    }

    console.error(chalk.red(e));

    if (/you need to resolve your current index/.test(e.message)) {
      console.error(
        `\n${chalk.red('Run `git merge --abort` to cancel a previous merge')}`,
      );
    }
    process.exit(1);
  }
}
