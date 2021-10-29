import chunk = require('lodash/chunk');
import shuffle = require('lodash/shuffle');

export async function returnSplitPackagesForBundleSize(
  packages: string,
  step: number,
  step_counts: number,
) {
  // In case, it is one non-parallel step, the step will be NaN`.
  if (Number.isNaN(step)) {
    console.log(packages);
  } else {
    // Shuffle the array based on Fisher-Yates (aka Knuth) Shuffle to make sure the permutation have almost the same probability.
    // We are doing it to make sure the distribution is not related to the team folder.
    const packagesForBundleSize = shuffle(packages.split(' '));
    // Split all packages based on number of parallel steps.
    const splitPackagesForBundleSize = chunk(
      packagesForBundleSize,
      Math.floor(packagesForBundleSize.length / step_counts),
    );
    console.log(
      ((splitPackagesForBundleSize[step] as unknown) as string[]).join(' '),
    );
  }
}
