import { LogLevel } from '../types';

import fs from 'fs';
import globby from 'globby';
import path from 'path';
import yargs from 'yargs';
import runComponentLab from './ComponentLab';
import { createLogger } from './logger';
import nullthrows from 'nullthrows';
import { AbortController } from 'abort-controller';

const METRICS_PLUGIN_DIR = path.join(__dirname, '../plugins/metrics');
const RUNNER_PLUGIN_DIR = path.join(__dirname, '../plugins/runners');

const logLevelValues: ReadonlyArray<LogLevel> = [
  'debug',
  'info',
  'warn',
  'error',
];

const abortController = new AbortController();

async function main() {
  const argv = yargs
    .options({
      launch: {
        describe:
          'Launch a local version of Chromium. Required if browser-ws-uri is not set',
        type: 'boolean',
        conflicts: 'browser-ws-uri',
      },
      'launch-headless': {
        describe:
          'Launch a local version of Chromium in headless mode. Requires launch to be set',
        implies: 'launch',
        type: 'boolean',
      },
      'launch-sandbox': {
        describe:
          'Launch a local version of Chromium with a sandbox. Requires launch to be set',
        implies: 'launch',
        type: 'boolean',
        default: true,
      },
      'browser-ws-uri': {
        describe:
          'Websocket uri for a remote browser. Required if launch is not set',
        type: 'string',
        conflicts: 'launch',
      },
      'log-level': {
        choices: logLevelValues,
        default: 'info' as const,
      },
    })
    .strict().argv;

  if (argv.launch == null && argv['browser-ws-uri'] == null) {
    throw new Error('Either --launch or --browser-ws-uri must be set.');
  }

  const logger = createLogger({ logLevel: argv['log-level'] });
  const [metricsPlugins, runnerPlugins, tests] = await Promise.all([
    fs.promises.readdir(METRICS_PLUGIN_DIR),
    fs.promises.readdir(RUNNER_PLUGIN_DIR),
    globby(
      (argv._.length > 0 ? argv._ : ['**/__perf__/**.{js,tsx}']).concat([
        '!**/node_modules/**',
      ]),
      {
        absolute: true,
      },
    ),
  ]);
  const browser = argv.launch
    ? {
        type: 'launch' as const,
        headless: Boolean(argv['launch-headless']),
        sandbox: argv['launch-sandbox'],
      }
    : {
        type: 'remote' as const,
        browserWSUri: nullthrows(argv['browser-ws-uri']),
      };

  await runComponentLab({
    browser,
    logger,
    metricsPlugins: metricsPlugins.map((p) => path.join(METRICS_PLUGIN_DIR, p)),
    runnerPlugins: runnerPlugins.map((p) => path.join(RUNNER_PLUGIN_DIR, p)),
    tests,
    signal: abortController.signal,
  });
}

process.on('SIGINT', () => {
  abortController.abort();
  process.exit(1);
});

process.on('uncaughtException', (reason) => {
  exitWithError(reason);
});

process.on('unhandledRejection', (reason) => {
  exitWithError(reason);
});

main().catch(exitWithError);

function exitWithError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}
