import { SuiteResults, ReporterPlugin } from '../../types';
import { Logger } from 'winston';
import omit from 'lodash/omit';

const JSONReporterPlugin: ReporterPlugin = {
  onSuiteComplete({
    results,
    logger,
  }: {
    results: SuiteResults;
    logger: Logger;
  }) {
    logger.debug('results: ' + JSON.stringify(omit(results, 'trace'), null, 2));
  },
};

export default JSONReporterPlugin;
