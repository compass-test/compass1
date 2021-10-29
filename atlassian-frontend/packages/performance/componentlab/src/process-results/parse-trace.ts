import { Logger } from 'winston';
import {
  RawSuiteResults,
  GenericMetrics,
  ChromeTrace,
  ChromeTraceEvent,
  ChromeMarkEvent,
  ChromeCompleteEvent,
} from '../../types';
import nullthrows from 'nullthrows';
import { END_MARKER, MARKER_PREFIX } from '../constants';
import applyMetric from './apply-metric';

const GC_EVENT_NAMES = new Set(['MinorGC', 'MajorGC', 'BlinkGC.AtomicPhase']);
const PARSE_COMPILE_EVENT_NAMES = new Set([
  'v8.parseOnBackground',
  'v8.compile',
  'v8.compileModule',
]);

export default function parseTrace(traceBuffer: Buffer, logger: Logger) {
  const trace: ChromeTrace = JSON.parse(traceBuffer.toString());
  const traceMetrics: GenericMetrics<ChromeMarkEvent> = {};

  const parseCompileInstructions = computeParseCompileInstructions(
    trace,
    logger,
  );

  for (const traceEntry of trace.traceEvents.filter(
    (traceEvent) =>
      traceEvent.cat === 'blink.user_timing' &&
      traceEvent.name.startsWith(MARKER_PREFIX) &&
      traceEvent.name !== END_MARKER &&
      traceEvent.ph === 'R',
  )) {
    applyMetric(traceMetrics, traceEntry.name, traceEntry);
  }

  const rawSuiteResults: RawSuiteResults = {};
  for (const [testName, results] of Object.entries(traceMetrics)) {
    rawSuiteResults[testName] = {};
    for (const [runnerId, runs] of Object.entries(results)) {
      rawSuiteResults[testName][runnerId] = [];
      for (const run of runs) {
        const gcEvents = getEventsInRange(
          trace,
          run.start.tid,
          run.start.ts,
          run.end.ts,
        ).filter(function (event): event is ChromeCompleteEvent {
          return event.ph === 'X' && GC_EVENT_NAMES.has(event.name);
        });

        // Because these events belong to the same thread:
        //   * They shouldn't overlap
        //   * ts + dur should not extend beyond run.end.ts
        // so simply sum their durations.
        // TODO: Assert this expectation?
        const timeSpentInGc = gcEvents.reduce((memo, event) => {
          return memo + nullthrows(event.dur);
        }, 0);

        let instructions;
        if (run.start.ticount != null) {
          const tiSpentInGc = gcEvents.reduce((memo, event) => {
            return memo + nullthrows(event.tidelta);
          }, 0);

          instructions = {
            unit: 'instruction',
            value:
              nullthrows(run.end.ticount) -
              nullthrows(run.start.ticount) -
              tiSpentInGc,
          };
        } else {
          instructions = null;
        }

        rawSuiteResults[testName][runnerId].push({
          instructions,
          duration: {
            unit: 'microsecond',
            value: run.end.ts - run.start.ts - timeSpentInGc,
          },
        });
      }
    }
  }
  return {
    rawSuiteResults,
    parseCompileInstructions,
  };
}

function getEventsInRange(
  trace: ChromeTrace,
  tid: number,
  startTs: number,
  endTs: number,
): ChromeTraceEvent[] {
  // TODO: Index this for perf
  return trace.traceEvents.filter(
    (event) => event.tid === tid && event.ts >= startTs && event.ts < endTs,
  );
}

function computeParseCompileInstructions(trace: ChromeTrace, logger: Logger) {
  // We only want to calculate parse/compile for bundles.
  // ComponentLab has some inline scripts in the harness so
  // exclude those by filtering out events that don't have a
  // URL.
  const parseCompileEvents: ChromeTraceEvent[] = trace.traceEvents.filter(
    (traceEvent) =>
      traceEvent.args?.data?.url !== '' &&
      PARSE_COMPILE_EVENT_NAMES.has(traceEvent.name) &&
      traceEvent.ticount !== undefined &&
      traceEvent.ticount > 0,
  );

  let parseCompileInstructions: number | null = null;
  if (parseCompileEvents.length > 0) {
    parseCompileInstructions = parseCompileEvents.reduce((acc, event) => {
      return acc + nullthrows(event.ticount);
    }, 0);
  }

  return parseCompileInstructions;
}
