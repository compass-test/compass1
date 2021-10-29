import React from 'react';

import { Metrics as PuppeteerMetrics } from 'puppeteer';

export type FilePath = string;
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type Awaitable<T> = T | Promise<T>;
import { Logger } from 'winston';

export type ComponentLabBrowser =
  | {
      type: 'launch';
      headless: boolean;
      sandbox: boolean;
    }
  | {
      type: 'remote';
      browserWSUri: string;
    };

export type Metric = {
  unit: string;
  value: number;
};

export type RunnerPlugin = {
  id: string;
  name: string;
  run(RunOpts: {
    element: React.ReactElement<unknown>;
    container: HTMLElement;
  }): Awaitable<void>;
};

export type MetricsPlugin = {
  id: string;
  name: string;
  measure(MeasureOpts: {
    element: React.ReactElement<unknown>;
    container: HTMLElement;
  }): Awaitable<Metric>;
};

export type ReporterPlugin = {
  onSuiteComplete(SuiteCompleteOpts: {
    results: SuiteResults;
    logger: Logger;
  }): Awaitable<void>;
};

export interface IAwaitableDisposable {
  dispose(): Promise<unknown>;
}

type RunnerResult = {
  [metricPluginId: string]: Metric | null;
};

export type SuiteMetrics = {
  [suiteMetricId: string]: Metric | null;
} | null;

export type RunnersResults = {
  [runnerPluginId: string]: RunnerResult[];
};

export type TestResults = {
  name: string | null;
  runners: RunnersResults;
};

export type RawSuiteResults = {
  [testName: string]: RunnersResults;
};

export type PerfToStats = {
  suite: string | null;
  runners: RunnertoStat;
};

export type RunnertoStat = {
  [runnerId: string]: ConfidenceIntervalStats;
};

export type RunnerToTrace = {
  [runnerId: string]: Buffer;
};

export type ConfidenceIntervalStats = {
  confidenceIntervalUpperBound: number | null;
  mean: number | null;
  samplesize: number;
  variance: number | null;
  stddev: number | null;
  marginOfError: number;
};

export type SuiteResults = {
  title: string | null;
  componentName: string | null;
  suitePath: FilePath;
  suiteMetrics: SuiteMetrics | null;
  trace: RunnerToTrace;
  testResults: TestResults[];
  suiteRunId: string;
  runId: string;
  runTs: string;
  data: PerfToStats;
};

export type PageMetrics = GenericMetrics<PuppeteerMetrics>;

export type GenericMetrics<TMetric> = {
  [testName: string]: {
    [runnerPluginId: string]: { [event: string]: TMetric }[];
  };
};

export type ChromeTrace = {
  traceEvents: ChromeTraceEvent[];
};

// From https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#heading=h.uxpopqvbjezh
interface BaseChromeTraceEvent {
  args: {
    data?: {
      requestId?: string;
      url?: string;
    };
  };
  name: string;
  cat: string;
  ph: string;
  // Thread id
  tid: number;
  // Tracing clock timestamp
  ts: number;
  ticount?: number;
  tidelta?: number;
}

export interface ChromeCompleteEvent extends BaseChromeTraceEvent {
  ph: 'X';
  // Tracing clock duration
  dur?: number;
  tidelta?: number;
}

export interface ChromeMarkEvent extends BaseChromeTraceEvent {
  ph: 'R';
}

export type ChromeTraceEvent = ChromeCompleteEvent | ChromeMarkEvent;
