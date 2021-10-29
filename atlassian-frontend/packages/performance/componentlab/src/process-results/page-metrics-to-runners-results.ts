import { RawSuiteResults, PageMetrics } from '../../types';

export default function pageMetricsToRunnersResults(
  pageMetrics: PageMetrics,
): RawSuiteResults {
  const rawSuiteResults: RawSuiteResults = {};
  for (const [testName, results] of Object.entries(pageMetrics)) {
    rawSuiteResults[testName] = {};
    for (const [runnerId, runs] of Object.entries(results)) {
      rawSuiteResults[testName][runnerId] = [];
      for (const run of runs) {
        rawSuiteResults[testName][runnerId].push({
          browser_js_event_listeners: {
            unit: 'listener',
            value: run.end.JSEventListeners! - run.start.JSEventListeners!,
          },
          browser_nodes: {
            unit: 'node',
            value: run.end.Nodes! - run.start.Nodes!,
          },
          browser_layout_count: {
            unit: 'layout',
            value: run.end.LayoutCount! - run.start.LayoutCount!,
          },
          browser_recalc_style_count: {
            unit: 'recalculation',
            value: run.end.RecalcStyleCount! - run.start.RecalcStyleCount!,
          },
          browser_js_heap_used: {
            unit: 'byte',
            value: run.end.JSHeapUsedSize! - run.start.JSHeapUsedSize!,
          },
          browser_js_heap_total_size: {
            unit: 'byte',
            value: run.end.JSHeapTotalSize!,
          },
        });
      }
    }
  }
  return rawSuiteResults;
}
