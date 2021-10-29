/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const CliTable = require('cli-table3');

const zScoreRejectionRegion = 1.645;
// Instructions to Interactive (ITI) is being calculated as
// the sum of the parse & compile instructions plus the
// execute/layout/paint instructions.
//
// * Execute/layout/paint is being measured by the RenderPlugin.
// * Parse/compile is being measured via trace events for
// v8.parseOnBackground, v8.compile, and v8.compileModule for
// the bundles.
//
// Instructions are not available on macOS so if you run
// ComponentLab locally and then this node script you will
// not compute ITI (instructions are null).

(() => {
  try {
    console.log(
      chalk.green(
        '=================== 🔬 ComponentLab Results ===================',
      ),
    );

    const changesResultDir = '.componentlab/results/changes';
    const baselineResultDir = '.componentlab/results/baseline';
    const hasChangesDir = fs.existsSync(
      path.join(process.cwd(), changesResultDir),
    );
    const hasBaselineDir = fs.existsSync(
      path.join(process.cwd(), baselineResultDir),
    );
    const table = new CliTable({
      style: { head: ['green'] },
      head: [
        'Suite path',
        'ITI baseline',
        'ITI changes',
        'ITI % difference',
        'Significant Difference',
      ],
    });
    let slimBaselineResults = [];
    let slimChangesResults = [];

    if (hasBaselineDir) {
      slimBaselineResults = processResults(baselineResultDir);
    }

    if (hasChangesDir) {
      slimChangesResults = processResults(changesResultDir);
    }

    if (slimBaselineResults.length > 0 && slimChangesResults.length > 0) {
      for (const changesResult of slimChangesResults) {
        for (const baselineResult of slimBaselineResults) {
          if (changesResult.suitePath === baselineResult.suitePath) {
            const percentChange = calculatePercentChange(
              baselineResult.iti,
              changesResult.iti,
            );
            let percent = `${percentChange.toFixed(1)}%`;
            if (percentChange < 0) {
              percent = chalk.green(percent);
            } else {
              percent = chalk.red(percent);
            }
            const zvalue = ZTest(
              baselineResult.data.runners.complete_render,
              changesResult.data.runners.complete_render,
            );
            table.push([
              changesResult.suitePath,
              baselineResult.iti,
              changesResult.iti,
              percent,
              Math.abs(zvalue) > zScoreRejectionRegion //abs because normal distribution
                ? 'Yes'
                : 'No',
            ]);
          }
        }
      }
    } else if (slimBaselineResults.length > 0) {
      for (const baselineResult of slimBaselineResults) {
        table.push([
          baselineResult.suitePath,
          baselineResult.iti,
          'N/A',
          'N/A',
          'N/A',
        ]);
      }
    }

    console.log('\n');
    console.log(table.toString());
    if (
      slimBaselineResults.length > 0 &&
      !slimBaselineResults[0].areInstructionsAvailable
    ) {
      console.log(
        chalk.red(
          '\nCannot compute Instructions to Interactive (ITI).  Instructions are not available on this platform.',
        ),
      );
    }
  } catch (e) {
    console.error(e);
    console.error('Failed to read performance results.');
    process.exit(1);
  }
})();

function calculatePercentChange(baselineResultITI, changesResultITI) {
  return ((changesResultITI - baselineResultITI) / baselineResultITI) * 100;
}

function processResults(resultsDir) {
  const slimResults = [];
  let areInstructionsAvailable = true;
  const entries = fs
    .readdirSync(path.join(process.cwd(), resultsDir))
    .filter((file) => file !== '.DS_Store')
    .map((file) => {
      const results = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), resultsDir, file)),
      );

      let parseCompileInstructions = null;
      let instructionsToInteractive = null;

      if (
        results.suiteMetrics &&
        results.suiteMetrics.parse_compile_instructions
      ) {
        // get parse/compile instructions
        parseCompileInstructions =
          results.suiteMetrics.parse_compile_instructions.value;
      }

      // get execute(render/layout/paint) instructions
      const executeInstructionsMean = results.data.runners.complete_render.mean;

      if (
        executeInstructionsMean === null &&
        parseCompileInstructions === null
      ) {
        areInstructionsAvailable = false;
      } else {
        // calculate ITI
        instructionsToInteractive = (
          parseCompileInstructions + executeInstructionsMean
        ).toFixed(1);
      }

      slimResults.push({
        suitePath: results.suitePath,
        iti: instructionsToInteractive,
        areInstructionsAvailable,
        data: results.data,
      });

      return file;
    })
    .join('\n')
    .toString();

  console.log('\nprocessed the following files: ');
  console.log(entries);

  return slimResults;
}
/**
 * Function that calculates the z value for a two sample Z-test
 * NULL HYPOTHESIS - There is no significant difference between the means
 * HYPOTHESIS - There is a significant difference
 */
function ZTest(baselineData, changesData) {
  const meanDifference = baselineData.mean - changesData.mean;
  const standardErrorDifference = Math.sqrt(
    baselineData.stddev ** 2 / baselineData.samplesize +
      changesData.stddev ** 2 / changesData.samplesize,
  );
  const expectedDifference = 0; // Might expect one branch to be larger than the other
  const zResult =
    (meanDifference - expectedDifference) / standardErrorDifference;
  return zResult;
}

module.exports = ZTest;
