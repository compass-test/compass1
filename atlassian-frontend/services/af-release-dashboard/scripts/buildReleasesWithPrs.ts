/* eslint-disable no-console */
import fse from 'fs-extra';
import { promises as fsp } from 'fs';

import { RELEASES_JSON_DIR, RELEASES_JSON_PATH } from './constants';
import { mapReleaseMetadataToPayload } from './utils/map-metadata-to-entity';
import { getReleaseNames } from './utils/get-releases-names';
import { getPRsInReleases } from './utils/get-prs-in-releases';

const main = async () => {
  const releaseNames = (await getReleaseNames()).slice(0, 1);
  console.log('Sorted release names: ', releaseNames);
  const releasesWithPRs = await getPRsInReleases(releaseNames);
  const releaseEntity = mapReleaseMetadataToPayload(releasesWithPRs);
  console.log(
    'Sorted releases with pull request data: ',
    JSON.stringify(releaseEntity, null, 2),
  );
  console.log('Writing releases dataset to local file...');
  await fse.mkdirp(RELEASES_JSON_DIR);
  await fsp.writeFile(
    RELEASES_JSON_PATH,
    JSON.stringify({ releases: releaseEntity }),
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
