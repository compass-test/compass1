import { getGlobPackagesForTools } from '@atlaskit/build-utils/tools';

import { returnSplitPackagesForBundleSize } from '../lib/split';

const {
  BITBUCKET_PARALLEL_STEP,
  BITBUCKET_PARALLEL_STEP_COUNT,
  CHANGED_PACKAGES,
} = process.env;

const chunksSplit = Number(BITBUCKET_PARALLEL_STEP_COUNT);
const step = Number(BITBUCKET_PARALLEL_STEP);

async function main() {
  const globPackagesForBundleSize =
    CHANGED_PACKAGES ||
    ((await getGlobPackagesForTools(
      ['bundlesize'],
      undefined,
      true,
    )) as string);

  await returnSplitPackagesForBundleSize(
    globPackagesForBundleSize,
    step,
    chunksSplit,
  );
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
