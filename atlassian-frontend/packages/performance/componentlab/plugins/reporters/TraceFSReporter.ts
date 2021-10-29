import { ReporterPlugin } from '../../types';

import fs from 'fs';
import path from 'path';
import mkdirp from 'make-dir';
const traceDir = './traces/componentlab';

const TraceFSReporter: ReporterPlugin = {
  async onSuiteComplete({ logger, results }) {
    await mkdirp(traceDir);
    for (const runnerId of Object.keys(results.trace)) {
      const filePath = path.join(
        traceDir,
        results.suiteRunId + '_' + runnerId + '.json',
      );
      await fs.promises.writeFile(filePath, results.trace[runnerId]);
      logger.info(`Wrote trace to ${filePath}`);
    }
  },
};

export default TraceFSReporter;
