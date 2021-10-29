#!/usr/bin/env node
const chalk = require('chalk');
const meow = require('meow');

const { getEntryPoints, getPackages } = require('./utils/entrypoints');
const { printHowToReadStats } = require('./utils/how-to-read-stats');
const measure = require('./measure');

const c = meow(
  `
    Usage
        $ measure <[paths]>

      Options
        --analyze               Opens bundle analyzer report
        --baseline              The base or target branch to use as a baseline to run the tool - default to master
        --entryPoints           Run the tool for each entrypoints per package
        --json                  Outputs measure stats as json
        --lint                  Lint mode fails build if size has been increased beyond threshold (except if used with s3 flag)
        --s3                    Run S3 flow
        --updateSnapshot        Update measure snapshots
      
      Examples
        $ measure editor-core editor-common
        $ measure editor-core --updateSnapshot
        $ measure editor-core --analyze
        $ measure button badge --entryPoints
        $ measure button --baseline=develop

      How to read stats
      
      ${printHowToReadStats()}
`,
  {
    flags: {
      analyze: {
        type: 'boolean',
        default: false,
      },
      baseline: {
        type: 'string',
        default: 'master',
      },
      entryPoints: {
        type: 'boolean',
        default: false,
      },
      json: {
        type: 'boolean',
        default: false,
      },
      lint: {
        type: 'boolean',
        default: false,
      },
      s3: {
        type: 'boolean',
        default: false,
      },
      updateSnapshot: {
        type: 'boolean',
        default: false,
      },
    },
  },
);
const paths = c.input;
const { entryPoints, baseline } = c.flags;
const { CI } = process.env;

if (!CI && baseline === 'master') {
  console.warn(
    chalk.yellow(
      `It looks like you are running the tool locally, by default it compares to ${baseline}, feel free to modify it using --baseline=develop`,
    ),
  );
}
if (paths && paths.length > 0) {
  resolvePaths(paths, entryPoints).then(resolvedPaths => {
    if (resolvedPaths.length > 0) {
      executeMeasure(resolvedPaths, c).then(handleMeasureResult);
    } else {
      logInvalidUse(
        `Pattern "${paths}" did not match any paths or packages.
         If you are measuring an entrypoint, add the "--entryPoints" flag.`,
      );
    }
  });
} else {
  logInvalidUse('No paths specified, no packages to measure');
}

async function resolvePaths(pathsToPackage, entryPointsFlag) {
  if (entryPointsFlag) {
    return getEntryPoints(pathsToPackage);
  }
  return getPackages(pathsToPackage);
}

async function executeMeasure(
  pathsToPackage,
  cParam,
  errors = [],
  results = [],
) {
  const path = pathsToPackage.pop();
  try {
    const result = await measure(
      path,
      cParam.flags.analyze,
      cParam.flags.baseline,
      cParam.flags.entryPoints,
      cParam.flags.json,
      cParam.flags.lint,
      cParam.flags.updateSnapshot,
      cParam.flags.s3,
    );
    results.push(result);
  } catch (error) {
    errors.push(error);
  }

  if (pathsToPackage.length > 0) {
    return executeMeasure(pathsToPackage, cParam, errors, results);
  }
  return { errors, results };
}

function handleMeasureResult({ errors, results }) {
  const allPassed =
    results.reduce((overall, result) => overall + result, 0) === results.length;
  if (errors.length > 0) {
    console.log(
      chalk.red('\nBundle size build failed with the following errors:'),
    );

    errors.forEach(error => {
      console.log(`  ${chalk.red(error)}`);
    });

    logInvalidUse();
    process.exit(1);
  } else {
    if (!c.flags.s3) {
      console.warn(
        chalk.yellow(
          'The measure tool now stores ratchet files in s3, you can still run it locally, but the data maybe inaccurate.',
        ),
      );
    }
    if (c.flags.updateSnapshot) {
      console.log(chalk.green('Updated bundle size snapshots'));
    } else if (allPassed) {
      console.log(chalk.green('No significant bundle size changes detected'));
    }
    console.log();

    process.exit(0);
  }
}

function logInvalidUse(message = '') {
  console.log(
    chalk.yellow(`\n  ${message}\n`),
    chalk.dim(
      `  Run ${chalk.yellow(
        'yarn measure --help',
      )} for more information on how to use this tool\n`,
    ),
  );
}
