import {
  FilePath,
  RawSuiteResults,
  SuiteResults,
  PageMetrics,
  SuiteMetrics,
  TestResults,
  RunnerToTrace,
} from '../types';

import { Logger } from 'winston';
import { URL } from 'url';
import createDeferred from 'p-defer';
import chalk from 'chalk';
import puppeteer from 'puppeteer';
import path from 'path';

import mergeRunnersResults from './process-results/merge-runners-results';
import pageMetricsToRunnersResults from './process-results/page-metrics-to-runners-results';
import applyMetric from './process-results/apply-metric';
import parseTrace from './process-results/parse-trace';
import { TornDownError } from './errors';

import { END_MARKER, MARKER_PREFIX, MARGIN_OF_ERROR } from './constants';
import * as confidence from './process-results/calculate-confidence-interval';

const MAX_ATTEMPT = 5;
const MAX_RUNS = 1000;
const MIN_RUNS = 0;
const INITIAL_RUNS = 31;

export default async function runSuite({
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
  metricsPluginsDir,
  runnerPluginsDir,
}: {
  browser: puppeteer.Browser;
  tornDown: boolean;
  runId: string;
  runTs: string;
  suiteRunId: string;
  testPath: FilePath;
  serverBaseUrl: string;
  tunnelUser: string;
  tunnelPassword: string;
  logger: Logger;
  metricsPluginsDir: FilePath[];
  runnerPluginsDir: FilePath[];
}): Promise<SuiteResults> {
  const suitePath = path.relative(process.cwd(), testPath);
  const testindex = 0; //TODO FIX FOR MULTIPLE EXPORTS
  logger.debug('Puppeteer: Launching...');

  const page = await browser.newPage();
  page.authenticate({
    username: tunnelUser,
    password: tunnelPassword,
  });
  assertNotTornDown(tornDown);
  const end = createDeferred<void>();

  // capture console output
  page.on('console', async (message) => {
    const messageType = message.type().substr(0, 3).toUpperCase();
    const colors = {
      // @ts-ignore
      LOG: (text) => text,
      ERR: chalk.red,
      WAR: chalk.yellow,
      INF: chalk.cyan,
    };
    // @ts-ignore
    const color = colors[messageType] || chalk.blue;
    logger.debug(color(`PAGE LOG: ${messageType} ${message.text()}`));
  });

  const pageMetrics: PageMetrics = {};
  page.on('metrics', ({ title, metrics }) => {
    if (title === END_MARKER) {
      end.resolve();
      return;
    }

    if (!title.startsWith(MARKER_PREFIX)) {
      return;
    }

    applyMetric(pageMetrics, title, metrics);
  });

  let error;
  page.on('pageerror', (err) => {
    logger.debug(chalk.red(err.message));
    end.reject(err);
    error = err;
  });

  let results: SuiteResults;
  let suiteMetrics: SuiteMetrics = {
    parse_compile_instructions: null,
  };
  let browserResults: {
    componentName: string | null | undefined;
    metrics: RawSuiteResults;
    title: string | null | undefined;
  } = { componentName: null, metrics: {}, title: null };
  let traceSamples: RunnerToTrace = {};
  let runnerAccumulator: TestResults = {
    name: '',
    runners: {},
  };

  for (const runnerNum in runnerPluginsDir) {
    let marginOfError = 5;
    let runs = INITIAL_RUNS;
    let maxAttempts = 0;
    let initial = true;
    let accumulator: TestResults = {
      name: '',
      runners: {},
    };
    while (
      runs < MAX_RUNS &&
      runs > MIN_RUNS &&
      marginOfError > MARGIN_OF_ERROR &&
      maxAttempts++ < MAX_ATTEMPT
    ) {
      await page.tracing.start({
        categories: [
          'blink',
          'blink.user_timing',
          'devtools.timeline',
          'cc',
          'gpu',
          'toplevel',
        ],
        // @ts-ignore This is okay.
        path: null,
      });

      assertNotTornDown(tornDown);
      await page.goto(
        new URL(suiteRunId + '/index.html', serverBaseUrl).toString(),
      );
      assertNotTornDown(tornDown);

      let pagetrace;
      await page.evaluate(`run(${runs}, ${testindex}, ${runnerNum})`);
      try {
        // account for requestIdleCallback
        await end.promise;
        assertNotTornDown(tornDown);

        // @ts-ignore
        browserResults = await page.evaluate('__results__');
      } finally {
        logger.debug('cleaning up ...');
        if (!browser.isConnected()) {
          // eslint-disable-next-line no-unsafe-finally
          throw new Error('browser is not connected');
        }
        pagetrace = await page.tracing.stop();
      }

      if (error != null) {
        throw error;
      }

      const { rawSuiteResults, parseCompileInstructions } = parseTrace(
        pagetrace,
        logger,
      );

      if (parseCompileInstructions !== null) {
        suiteMetrics = {
          parse_compile_instructions: {
            unit: 'instruction',
            value: parseCompileInstructions,
          },
        };
      }

      const rawSuiteResultsMerged = mergeRunnersResults(
        pageMetricsToRunnersResults(pageMetrics),
        browserResults.metrics,
        rawSuiteResults,
      );

      let testResults = Object.entries(rawSuiteResultsMerged).map(
        ([name, runners]) => ({
          name,
          runners,
        }),
      );

      let runnerPluginId = Object.keys(testResults[0].runners)[+runnerNum];
      let suitename = testResults[0].name;

      runnerAccumulator.name = suitename;

      if (initial) {
        traceSamples[runnerPluginId] = pagetrace;
        initial = false;
      }

      if (
        Object.keys(accumulator).length > 0 &&
        accumulator.runners[runnerPluginId]
      ) {
        accumulator.runners[runnerPluginId].push(
          ...testResults[0].runners[runnerPluginId],
        );
      } else {
        accumulator = Object.entries(rawSuiteResultsMerged).map(
          ([name, runners]) => ({
            name,
            runners,
          }),
        )[0];
      }
      let stats = confidence.calculateConfidenceIntervalPerRunner(
        +runnerNum,
        accumulator,
        logger,
      );
      runnerAccumulator.runners[runnerPluginId] =
        accumulator.runners[runnerPluginId];

      let newestimate = confidence.calculateSampleSize(stats, logger);
      let newruns = newestimate - stats.samplesize;
      runs = newruns;
      marginOfError = stats.marginOfError;
    }
  }
  let stats = confidence.getPerfStats();
  results = {
    componentName: browserResults.componentName || null,
    runId,
    runTs,
    suitePath: suitePath,
    suiteRunId,
    suiteMetrics,
    testResults: [runnerAccumulator],
    title: browserResults.title || null,
    trace: traceSamples,
    data: stats,
  };

  logger.debug(
    'PERFORMANCE STATS: ' + JSON.stringify(confidence.getPerfStats(), null, 2),
  );
  return results;
}

function assertNotTornDown(tornDown: boolean) {
  if (tornDown) {
    throw new TornDownError();
  }
}
