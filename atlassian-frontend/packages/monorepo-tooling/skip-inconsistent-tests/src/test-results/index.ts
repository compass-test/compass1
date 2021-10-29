import path from 'path';

import { readdir } from 'fs-extra';

import { TEST_REPORT_DIR } from '../constants';
import { loadReport, writeReport } from '../io/reports';

import {
  parseFailureTests,
  shouldUseThresholdProtection,
} from './parse-failures';
import { getFailurePercentage } from './percentage';

export default async function main(
  dirPath = TEST_REPORT_DIR,
  subsetOfPackages = false,
  verbose = false,
) {
  console.log('Read reports from directory:\n', path.resolve(dirPath));
  console.log(
    `Mode: verbose: ${verbose}, subset of packages: ${subsetOfPackages}`,
  );
  let files: string[] = [];
  let abortMessage = '';
  try {
    files = await readdir(dirPath);
  } catch (error) {
    abortMessage = 'Failed to read from directory. Aborting prematurely.';
  }
  if (!files.length) {
    abortMessage = 'No reports found. Aborting prematurely.';
  }
  if (abortMessage) {
    console.log(abortMessage);
    return;
  }
  if (verbose) {
    console.log(`\t${files.join('\n\t')}\n---`);
  }
  await Promise.all(
    files.map(async file => {
      const extension = path.extname(file);
      const name = path.basename(file, extension);
      if (extension === '.xml') {
        let data: string | undefined;
        try {
          data = await loadReport<string>(`${dirPath}/${file}`);
        } catch (error) {
          console.log(error);
          return;
        }
        if (!data) {
          console.warn(`Ignoring empty report for ${file}`);
          return;
        }
        console.log(`Parsing ${file}`);
        const results = await parseFailureTests(data, false);
        const failurePercentage = getFailurePercentage(
          file,
          results,
          shouldUseThresholdProtection(subsetOfPackages),
        );
        if (failurePercentage === '0%') {
          // Abort early if there aren't any failures
          return;
        }

        const outputFilePath = `${dirPath}/${name}.json`;
        console.log(
          `Converting ${file}.\n\tTest failure percentage: ${failurePercentage}`,
        );
        return writeReport(outputFilePath, results.skippableTestCases);
      }
    }),
  );
  console.log('All reports converted to JSON (if applicable).');
}

if (require.main === module) {
  if (process.argv.length < 3) {
    console.error(
      `Must provide path to reports directory containing JUnit XML files.`,
    );
    process.exit(1);
  } else {
    const [, , reportsPath, ...packagePaths] = process.argv;
    const subsetOfPackages = !!packagePaths.length;
    const verbose = true;
    main(reportsPath, subsetOfPackages, verbose).catch(err => {
      console.error(err);
      process.exit(1);
    });
  }
}
