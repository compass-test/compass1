#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const ora = require('ora');
const webpack = require('webpack');
const { getBranchName, getMergeBase } = require('@atlaskit/build-utils/git');

const { fExists, fDeleteIfExist } = require('./utils/fs');
const { filesRegex } = require('./utils/entrypoints');
const {
  buildStats,
  createAtlassianFrontendStatsGroups,
  diff,
  clearStats,
} = require('./utils/stats');
const { buildCacheGroups, createWebpackConfig } = require('./utils/webpack');
const { prepareForPrint } = require('./utils/print');
const { printReport } = require('./reporters/console');

const {
  masterStatsFolder,
  currentStatsFolder,
  uploadToS3,
  downloadFromS3,
  downloadFromS3ForLocal,
} = require('./utils/s3-actions');

const { returnMissingPkgBasedOn } = require('./utils/error.js');

const { BITBUCKET_BRANCH, TARGET_BRANCH, CI, BITBUCKET_COMMIT } = process.env;

function fWriteStats(pathTo, content) {
  fs.writeFileSync(
    pathTo,
    JSON.stringify(clearStats(content), null, 2),
    'utf8',
  );
}

function getBundleCheckResult(pathTo, stats) {
  let prevStats;
  if (fExists(pathTo)) {
    prevStats = JSON.parse(fs.readFileSync(pathTo, 'utf8'));
  }

  const statsWithDiff = prevStats ? diff(prevStats, stats) : stats;
  const statsExceededSizeLimit = statsWithDiff.filter(stat => stat.isTooBig);
  const passedBundleSizeCheck = !statsExceededSizeLimit.length;

  return { passedBundleSizeCheck, statsWithDiff, statsExceededSizeLimit };
}

function webpackCompilerRun(configs) {
  /**
   * Run both main and combined builds in parallel.
   */
  return new Promise((resolve, reject) => {
    const compiler = webpack(configs);
    // eslint-disable-next-line consistent-return
    compiler.run(err => {
      if (err) {
        reject(err);
        return console.error(chalk.red(err));
      }
      resolve();
    });
  });
}

module.exports = async function main(
  filePath /*: string */,
  isAnalyze /*: boolean */,
  baseline /*: string */,
  isEntryPoint /*: boolean */,
  isJson /*: boolean */,
  isLint /*: boolean */,
  updateSnapshot /*: boolean */,
  s3 /*: boolean */,
) {
  const bitbucketBranch =
    CI && s3 && BITBUCKET_BRANCH ? BITBUCKET_BRANCH : await getBranchName(); // On custom build, BITBUCKET_BRANCH is not defined.
  const targetBranch =
    CI && s3 && TARGET_BRANCH ? TARGET_BRANCH : baseline || bitbucketBranch;
  let mergeBaseCommit =
    targetBranch !== bitbucketBranch && CI && s3
      ? await getMergeBase(targetBranch, 'HEAD')
      : BITBUCKET_COMMIT || '';
  // We don't need the full commit as we used it to store / identify files.
  mergeBaseCommit = mergeBaseCommit.substring(0, 10);

  let filePathToMeasure = filePath;
  if (filePathToMeasure.match(filesRegex)) {
    [filePathToMeasure] = filePathToMeasure.split(filesRegex);
  }
  const measureOutputPath = path.join(filePathToMeasure, '.measure-output');
  const sanitizedfilePathToMeasure = filePathToMeasure.replace('/', '__');
  const shorterFilePath = filePathToMeasure.split(path.sep).pop();
  const measureCompiledOutputPath = path.join(
    measureOutputPath,
    sanitizedfilePathToMeasure,
  );
  const dirs = filePathToMeasure.split(path.sep);
  // example: `/Users/<userName>/atlassian-frontend/packages/<team>/<packageName>/src/<entryPath>`
  // So we found `src` and the element before will be always the packageName.
  const pkgNameIndex = dirs.findIndex(elem => elem.includes('src')) - 1;
  const packageName =
    pkgNameIndex >= 0 ? dirs[pkgNameIndex] : dirs[dirs.length - 1];

  const atlassianFrontendPackagesDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'packages',
  );

  fDeleteIfExist(measureOutputPath);

  const compilingMessage =
    packageName === shorterFilePath
      ? `"${packageName}"`
      : `"${packageName}" > "${shorterFilePath}"`;

  const spinner = ora(chalk.cyan(`\nCompiling ${compilingMessage}\n`)).start();

  if (!fExists(filePath)) {
    spinner.fail(chalk.red(`File "${filePath}" doesn't exist.`));
    process.exit(1);
  }

  // Async indicates group's combined size of all code-splits.
  const mainStatsGroups = [
    {
      name: 'Source code',
      group: true,
      stats: [
        {
          id: 'src.main',
          name: 'main',
          fileName: 'main.js',
        },
        {
          id: 'src.async',
          name: 'async',
          fileName: 'main_async.js',
          cacheGroup: {
            name: 'main_async',
            test: module =>
              module.context && module.context.includes(filePathToMeasure),
            enforce: true,
            chunks: 'async',
          },
        },
      ],
    },
    {
      name: 'External Dependencies',
      group: true,
      stats: [
        {
          id: 'node_modules.main',
          name: 'node_modules [main]',
          fileName: 'node_modules.js',
          cacheGroup: {
            name: 'node_modules',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            chunks: 'all',
            priority: -5,
          },
        },
        {
          id: 'node_modules.async',
          name: 'node_modules [async]',
          fileName: 'node_modules_async.js',
          cacheGroup: {
            name: 'node_modules_async',
            test: /[\\/]node_modules[\\/]/,
            enforce: true,
            chunks: 'async',
            priority: 4,
          },
        },
      ],
    },
    {
      name: 'Atlassian Frontend Dependencies',
      group: true,
      stats: createAtlassianFrontendStatsGroups(
        atlassianFrontendPackagesDir,
        path.relative(atlassianFrontendPackagesDir, filePathToMeasure),
        bitbucketBranch,
        targetBranch,
        mergeBaseCommit,
      ),
    },
  ];

  const combinedStatsGroups = [
    {
      name: 'Combined',
      group: true,
      stats: [
        {
          threshold: 0.01,
          id: 'combined.main',
          name: 'main',
          fileName: 'combined_sync.js',
        },
        {
          threshold: 0.02,
          id: 'combined.async',
          name: 'async',
          fileName: 'combined_async.js',
          cacheGroup: {
            name: 'combined_async',
            enforce: true,
            chunks: 'async',
          },
        },
      ],
    },
  ];

  /**
   * Main config for detailed breakdown of dependencies, includes:
   * - main bundle: which is src of provided package
   * - node_modules bundle: includes all external dependencies
   * - package groups bundles: e.g. design-system, media, editor, etc...
   */
  const mainConfig = await createWebpackConfig({
    outputDir: measureCompiledOutputPath,
    entryPoint: { main: filePathToMeasure },
    optimization: {
      splitChunks: {
        cacheGroups: buildCacheGroups(mainStatsGroups),
      },
    },
    isAnalyze,
  });

  /**
   * Config for a combined build. Used to better approximate bundle
   * size since gzip size is highly affected by the size of the input.
   */
  const combinedConfig = await createWebpackConfig({
    outputDir: measureCompiledOutputPath,
    entryPoint: { combined_sync: filePathToMeasure },
    optimization: {
      splitChunks: {
        cacheGroups: buildCacheGroups(combinedStatsGroups),
      },
    },
  });

  /**
   * Run both main and combined builds in parallel.
   */
  await webpackCompilerRun([mainConfig, combinedConfig]);
  const joinedStatsGroups = [...mainStatsGroups, ...combinedStatsGroups];
  const stats = buildStats(
    measureCompiledOutputPath,
    joinedStatsGroups,
    bitbucketBranch,
    targetBranch,
    mergeBaseCommit,
  );
  // Cleanup measure output directory
  if (!isAnalyze) {
    fDeleteIfExist(measureOutputPath);
  }

  // All the things for S3 flow is under this condition
  const fileName = filePathToMeasure
    .split('packages/')
    .pop()
    .replace(/\//g, '-');

  let masterStatsFilePath = path.join(
    masterStatsFolder,
    `${fileName}-bundle-size-ratchet.json`,
  );
  const currentStatsFilePath = path.join(
    currentStatsFolder,
    `${fileName}-bundle-size.json`,
  );
  if (updateSnapshot) {
    // Store file into folder for S3
    fWriteStats(masterStatsFilePath, stats);
    if (CI) {
      // Upload to s3 masterStats using mergeBaseCommit - in case of custom build where no `mergeBaseCommit`, it will default to `BITBUCKET_COMMIT` commit.
      await uploadToS3(bitbucketBranch, mergeBaseCommit, masterStatsFilePath);
      // Upload to s3 masterStats using an empty mergeBaseCommit - it will upload only packages.
      await uploadToS3(bitbucketBranch, '', masterStatsFilePath);
    }
  } else if (CI) {
    try {
      // TODO: we now reverted to not use the mergBaseCommit as part of https://product-fabric.atlassian.net/browse/AFP-2520
      await downloadFromS3(targetBranch, '', masterStatsFolder, fileName);
      // await downloadFromS3(
      //   targetBranch,
      //   mergeBaseCommit,
      //   masterStatsFolder,
      //   fileName,
      // ).catch(async () =>
      //   // We are fetching the second time in case of the mergeBaseCommit does not exist or ratchet file doesn’t exist for this commit.
      //   // We should fallback to the target branch one.
      //   downloadFromS3(targetBranch, '', masterStatsFolder, fileName),
      // );
    } catch (err) {
      const errorMessage = `${err}`;
      if (errorMessage.includes('not found in s3 bucket')) {
        const missingPkg = returnMissingPkgBasedOn(errorMessage);
        masterStatsFilePath = path.join(
          masterStatsFolder,
          `${missingPkg}-bundle-size-ratchet.json`,
        );
        fWriteStats(masterStatsFilePath, stats);
        await uploadToS3(targetBranch, '', masterStatsFilePath);
      } else {
        throw err;
      }
    }
  } else {
    await downloadFromS3ForLocal(targetBranch, '', masterStatsFolder, fileName);
  }

  const results = getBundleCheckResult(masterStatsFilePath, stats);
  chalk.cyan(`Writing current build stats to "${currentStatsFilePath}"`);
  fWriteStats(currentStatsFilePath, results.statsWithDiff);
  if (results.passedBundleSizeCheck) {
    spinner.succeed(
      chalk.cyan(`Module  ${compilingMessage} passed bundle size check`),
    );
  } else {
    spinner.fail(
      chalk.red(`Module  ${compilingMessage} has exceeded size limit!`),
    );
  }

  if (isJson) {
    return console.log(JSON.stringify(stats, null, 2));
  }

  if ((!isLint || !results.passedBundleSizeCheck) && !isEntryPoint) {
    printReport(prepareForPrint(joinedStatsGroups, results.statsWithDiff));
  }

  if (results.statsExceededSizeLimit.length && isLint && !s3) {
    throw new Error(`✖ – Module ${compilingMessage} has exceeded size limit!`);
  }

  // For s3, we always pass the bundle check.;
  // eslint-disable-next-line no-nested-ternary
  return s3 ? 0 : results.passedBundleSizeCheck ? 1 : 0;
};
