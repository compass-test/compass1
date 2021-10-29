import { RawSuiteResults } from '../../types';

export default function mergeRunnersResults(
  ...toMerge: RawSuiteResults[]
): RawSuiteResults {
  const rawSuiteResults: RawSuiteResults = {};
  for (const r of toMerge) {
    for (const [testName, results] of Object.entries(r)) {
      if (rawSuiteResults[testName] == null) {
        rawSuiteResults[testName] = {};
      }
      for (const [runnerId, runs] of Object.entries(results)) {
        if (rawSuiteResults[testName][runnerId] == null) {
          rawSuiteResults[testName][runnerId] = [];
        }

        for (const [i, run] of runs.entries()) {
          if (rawSuiteResults[testName][runnerId][i] == null) {
            rawSuiteResults[testName][runnerId][i] = {};
          }
          Object.assign(rawSuiteResults[testName][runnerId][i], run);
        }
      }
    }
  }
  return rawSuiteResults;
}
