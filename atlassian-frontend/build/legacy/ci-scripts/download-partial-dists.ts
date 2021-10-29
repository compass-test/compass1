/* eslint-disable no-console */
import * as path from 'path';
import { S3Wrapper } from '@atlaskit/build-utils/s3';

/**
 * Script that downloads all the partial dists created during branch builds. Partial dists will be
 * downloaded to the root of the repo as `all.tar.gz`, etc
 * 'all' is the catchall partial dist that we use for everything except types
 *
 * Usage: (cd build/legacy/ci-scripts && yarn download-partial-dists
 */
// all includes cjs/esm/es2019 whereas types is types only
const distTypes = ['types', 'all'];

async function main() {
  if (!process.env.BITBUCKET_COMMIT) {
    throw new Error('BITBUCKET_COMMIT variable not set');
  }
  const bitbucketCommit = String(process.env.BITBUCKET_COMMIT); // will be 'undefined' if not defined
  const commitHash = bitbucketCommit.substring(0, 12);
  const partialDistFiles = distTypes.map(
    distType => `partial-dists/${commitHash}/${distType}.tar.gz`,
  );
  console.log(`Downloading: ${partialDistFiles.join(', ')} in parallel`);

  const bucketName = 'atlassian-frontend-private-us-east';
  const bucketRegion = 'us-east-1';
  const s3WrapperOpts = {
    region: bucketRegion,
  };
  const s3 = new S3Wrapper(s3WrapperOpts);

  const downloadPromises = partialDistFiles.map(partialDistFile => {
    const downloadParams = {
      localFile: path.basename(partialDistFile),

      s3Params: {
        Bucket: bucketName,
        Key: partialDistFile,
      },
    };
    return s3.downloadFile(downloadParams);
  });
  await Promise.all(downloadPromises);
  console.log('Download complete');

  console.log('Done');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
