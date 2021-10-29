import { ComponentLabBrowser, FilePath, LogLevel } from '../types';

import { v4 as uuid } from 'uuid';
import { createFsFromVolume, Volume } from 'memfs';
import { Union } from 'unionfs';
import path from 'path';
import nodeFs from 'fs';
import puppeteer from 'puppeteer';
import { createLogger } from './logger';
import { Logger } from 'winston';

import AwaitableDisposable from './AwaitableDisposable';
import createInputFile from './create-test-harness/create-input-file';
import createTestHarnessPage from './create-test-harness/create-test-harness-page';
import createWebpackConfig from './create-test-harness/create-webpack-config';
import runWebpack from './create-test-harness/run-webpack';
import runSuite from './run-suite';

import JSONReporterPlugin from '../plugins/reporters/JSONReporterPlugin';
import SocratesReporter from '../plugins/reporters/SocratesReporter';
import TraceFSReporter from '../plugins/reporters/TraceFSReporter';
import ResultsFSReporterPlugin from '../plugins/reporters/ResultsFSReporterPlugin';

let tornDown: boolean = false;
let workerDisposable: AwaitableDisposable;
let browser: puppeteer.Browser;
let logger: Logger;

const VALID_TEST_EXTNAMES = new Set(['.js', '.tsx']);

export async function setup(options: {
  browser: ComponentLabBrowser;
  logLevel: undefined | LogLevel;
}) {
  logger = createLogger({ logLevel: options.logLevel });

  try {
    browser =
      options.browser.type === 'launch'
        ? await puppeteer.launch({
            headless: options.browser.headless,
            args: [
              // works on Unix/Linux (not mac 😢)
              '--enable-thread-instruction-count',
              '--js-flags=--expose-gc',
            ].concat(options.browser.sandbox ? [] : ['--no-sandbox']),
          })
        : await puppeteer.connect({
            browserWSEndpoint: options.browser.browserWSUri,
          });
  } catch (e) {
    // e.g. if the remote browser is down
    throw new Error(e.message);
  }

  workerDisposable = new AwaitableDisposable(() => browser.close());
}

export function teardown() {
  tornDown = true;
  // TODO: figure out why JEST_WORKER_ID is undefined
  logger.debug('tearing down the worker: ' + process.env.JEST_WORKER_ID);
  return workerDisposable.dispose();
}

export async function processTest({
  testPath,
  runId,
  runTs,
  runnerPlugins,
  metricsPlugins,
  serverRoot,
  serverBaseUrl,
  tunnelUser,
  tunnelPassword,
}: {
  testPath: FilePath;
  runTs: string;
  runId: string;
  runnerPlugins: FilePath[];
  metricsPlugins: FilePath[];
  serverRoot: FilePath;
  serverBaseUrl: string;
  tunnelUser: string;
  tunnelPassword: string;
}) {
  if (!VALID_TEST_EXTNAMES.has(path.extname(testPath))) {
    throw new Error(
      `Expected component test ${testPath} to end with an extension in ${[
        ...VALID_TEST_EXTNAMES,
      ].join(', ')}`,
    );
  }
  logger.debug('processing: ' + testPath);

  const fs = new Union();
  const memoryFs = createFsFromVolume(new Volume());
  // @ts-ignore
  fs.use(nodeFs).use(memoryFs);

  const inputFile = await createInputFile({
    componentPath: testPath,
    fs,
    metricsPlugins,
    runnerPlugins,
    logger,
  });
  logger.info('inputFile: ' + inputFile);
  const suiteRunId = uuid();
  const outputDir = path.join(serverRoot, suiteRunId);
  const { compiler, outputFilepath } = await createWebpackConfig(
    inputFile,
    outputDir,
    fs,
    logger,
  );
  const testHarnessPagePath = path.dirname(outputFilepath) + '/index.html';
  logger.debug('testHarnessPagePath: ' + testHarnessPagePath);
  await runWebpack(compiler);
  createTestHarnessPage(outputFilepath, logger);
  const results = await runSuite({
    browser,
    tornDown,
    runId,
    runTs,
    suiteRunId,
    testPath,
    serverBaseUrl,
    tunnelUser,
    tunnelPassword,
    logger,
    metricsPluginsDir: metricsPlugins,
    runnerPluginsDir: runnerPlugins,
  });

  const reporters = [
    JSONReporterPlugin,
    TraceFSReporter,
    ResultsFSReporterPlugin,
    SocratesReporter,
  ];

  await Promise.all(
    reporters.map((reporter) => reporter.onSuiteComplete({ results, logger })),
  );

  return testPath;
}
