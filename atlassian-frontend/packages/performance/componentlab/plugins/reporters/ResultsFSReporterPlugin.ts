import { SuiteResults, ReporterPlugin } from '../../types';
import { Logger } from 'winston';
import fs from 'fs';
import path from 'path';
import omit from 'lodash/omit';
import mkdirp from 'make-dir';

const ResultsFSReporterPlugin: ReporterPlugin = {
  async onSuiteComplete({
    results,
    logger,
  }: {
    results: SuiteResults;
    logger: Logger;
  }) {
    const jsonResults = JSON.stringify(omit(results, 'trace'), null, 2);
    const branchType = process.env.CL_BRANCH_TYPE
      ? '/' + process.env.CL_BRANCH_TYPE
      : '/baseline';
    const resultsDir = './.componentlab/results' + branchType;
    await mkdirp(resultsDir);
    const filePath = path.join(resultsDir, results.suiteRunId + '.json');
    await fs.promises.writeFile(filePath, jsonResults);
    logger.info(`Wrote results to ${filePath}`);
  },
};

export default ResultsFSReporterPlugin;
