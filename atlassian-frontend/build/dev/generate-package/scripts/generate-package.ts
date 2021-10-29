import * as bolt from 'bolt';
import chalk from 'chalk';
import { ESLint } from 'eslint';
import path from 'path';

import { templatePackagePath } from '../lib/constants';
import { promptPackageInformation } from '../lib/prompt';
import { createPackageFromTemplate } from '../lib/create-package';

async function main() {
  // Get the root dir for the repo for later.
  const { dir: rootDir } = await bolt.getProject();

  // Ask user for package configuration information
  const packageInfo = await promptPackageInformation();

  if (!packageInfo) {
    process.exit(1);
  }

  const inputDir = path.join(rootDir, templatePackagePath);
  const outputDir = path.join(
    rootDir,
    `packages/${packageInfo.teamDir}/${packageInfo.packageDir}`,
  );

  await createPackageFromTemplate(inputDir, outputDir, packageInfo);

  // Make sure we're in the root of the project before running eslint.
  process.chdir(rootDir);

  // Run eslint --fix over the new package to clean up any formatting
  const lint = new ESLint({ fix: true });
  const lintResults = await lint.lintFiles(`${outputDir}/**/*.{ts,tsx}`);
  await ESLint.outputFixes(lintResults);

  console.log(
    chalk.bold.green(`✅ Generated package ${packageInfo.packageName}!`),
  );
}

main().catch(err => {
  console.log(chalk.red(err));
  process.exit(1);
});
