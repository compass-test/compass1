import meow from 'meow';
import chalk from 'chalk';
import path from 'path';
import calculate from './calculate';
import backfill from './backfill';
import remote from './remote';
import { Config } from './types';

export async function run() {
  const cli = meow(
    `
    ${chalk.green('Usage')}
        $ repo-stats <path>
    ${chalk.green('Options')}
        ${chalk.yellow(
          '--config, -c   ',
        )} Change the path to the config file [Default: './repo-stats.config.js']
        ${chalk.yellow(
          '--timestamp, -t',
        )} Set the timestamp for when statistics are calulated to (seconds)
        ${chalk.yellow(
          '--backfill, -b ',
        )} Get statistics from past versions of the repository [Default: false]
        ${chalk.yellow(
          '--remote, -r ',
        )} Get statistics from remote repository instead of path [Default: false]
        ${chalk.yellow(
          '--dry-run, -d  ',
        )} Save statistics to a file instead of sending them [Default: false]
    ${chalk.green('Examples')}
        ${chalk.dim('$ repo-stats . --dry-run')}
    `,
    {
      flags: {
        config: {
          type: 'string',
          default: './repo-stats.config.js',
          alias: 'c',
        },
        timestamp: {
          type: 'string',
          alias: 't',
        },
        backfill: {
          type: 'boolean',
          alias: 'b',
        },
        remote: {
          type: 'boolean',
          alias: 'r',
        },
        dryRun: {
          type: 'boolean',
          alias: 'd',
        },
      },
    },
  );

  const pathInput = cli.input[0] || '';
  const targetPath = path.resolve(process.cwd(), pathInput);

  const cliOptions = { ...cli.flags, extraArgs: cli.input.slice(1) } as {
    config: string;
    timestamp: string;
    backfill: boolean;
    remote: boolean;
    dryRun: boolean;
    extraArgs: any;
  };

  const defaultConfig: Omit<
    Config,
    'product' | 'repository' | 'extras' | 'timestamp'
  > = {
    prod: false,
    recent: 2592000,
    workspaces: false,
    backfill: {
      enabled: false,
      days: 30,
      period: 1,
    },
    remote: false,
    dryRun: false,
  };

  const configFile = require(path.resolve(process.cwd(), cliOptions.config));

  // check require product is set
  if (typeof configFile.product !== 'string' || configFile.product === '') {
    throw new Error('product is required in config file');
  }

  // check required repository is set
  if (
    (cliOptions.backfill || cliOptions.remote) &&
    (typeof configFile.repository !== 'string' || configFile.repository === '')
  ) {
    throw new Error(
      'repository is required in config file when running backfill or remote',
    );
  }

  // check only one of backfill and remote is set
  if (cliOptions.backfill && cliOptions.remote) {
    throw new Error('only one of backfill or remote flag can be true');
  }

  const config: Config = {
    product: configFile.product,
    repository: configFile.repository,
    prod: configFile.prod || defaultConfig.prod,
    recent: configFile.recent || defaultConfig.recent,
    workspaces: configFile.workspaces || defaultConfig.workspaces,
    extras: configFile.extras,
    backfill: {
      enabled: cliOptions.backfill || defaultConfig.backfill.enabled,
      days:
        (configFile.backfill && configFile.backfill.days) ||
        defaultConfig.backfill.days,
      period:
        (configFile.backfill && configFile.backfill.period) ||
        defaultConfig.backfill.period,
    },
    timestamp: cliOptions.timestamp
      ? parseInt(cliOptions.timestamp, 10)
      : undefined,
    remote: cliOptions.remote || defaultConfig.remote,
    dryRun: cliOptions.dryRun || defaultConfig.dryRun,
  };

  if (config.backfill.enabled) {
    await backfill(targetPath, config);
  } else if (config.remote) {
    await remote(targetPath, config);
  } else {
    await calculate(targetPath, config);
  }
}

if (require.main === module) {
  run().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
