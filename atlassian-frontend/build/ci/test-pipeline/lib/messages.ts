import groupBy from 'lodash/groupBy';

import { Cache } from '@af/cache';
import { PackageInfo } from '@atlaskit/build-utils/tools';

import { Public, SkippedPackage } from './types';

function getSkippedPackagesByPipeline(skippedPackages: SkippedPackage[]) {
  if (!skippedPackages.length) {
    return [];
  }

  const skippedPackagesByPipeline = groupBy(
    skippedPackages,
    pkg => pkg.metadata.pipeline,
  );
  const skippedPackagesPipelines = Object.keys(skippedPackagesByPipeline);

  return skippedPackagesPipelines.map(pipeline => {
    const pkgNames = skippedPackagesByPipeline[pipeline]
      .map(pkg => pkg.name)
      .join(', ');

    return pipeline
      ? `(https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/${pipeline}) ${pkgNames} \n`
      : `(no pipeline) ${pkgNames} \n`;
  });
}

export function printTestResults(
  cache: Public<Cache>,
  testablePackages: PackageInfo[],
  changedPackagesInfo: PackageInfo[],
  failedPackages: PackageInfo[],
  skippedPackages: SkippedPackage[],
) {
  const testedPackageNames = testablePackages.map(pkg => pkg.name).join(', ');
  const failedPackageNames = failedPackages.map(pkg => pkg.name).join(', ');
  const skippedPackageNamesByPipeline = getSkippedPackagesByPipeline(
    skippedPackages,
  );

  cache.logger.info(
    `Tested ${testablePackages.length}/${changedPackagesInfo.length} packages: ${testedPackageNames}`,
  );
  const numSkipped = changedPackagesInfo.length - testablePackages.length;
  cache.logger.info(
    `Skipped test execution for ${numSkipped}/${changedPackagesInfo.length} cached packages:`,
  );
  skippedPackageNamesByPipeline.forEach(pipelineGroup => {
    cache.logger.info(`${pipelineGroup}`);
  });

  if (failedPackageNames.length > 0) {
    cache.logger.info(
      `Tests failed for ${failedPackages.length} packages: ${failedPackageNames}`,
    );
  }
}
