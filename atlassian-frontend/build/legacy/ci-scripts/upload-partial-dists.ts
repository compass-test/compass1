/* eslint-disable no-console */
import spawndamnit from 'spawndamnit';
import globby from 'globby';
import { S3Wrapper } from '@atlaskit/build-utils/s3';

import { getChangedPackagesFromChangesets } from './branch-deploy';

const cwd = process.cwd();
const args = process.argv.slice(2);
/* Returns the value of a flag passed in on the cli i.e `--foo bar` would return 'bar' */
const getValFlag = (flag: string) => args[args.indexOf(flag) + 1];
const getBoolFlag = (flag: string) => args.includes(flag);

const distType = getValFlag('--distType');
const dryFlag = getBoolFlag('--dry');

/**
 * This script is used to upload "partial dists" of packages so that we can build branch deploys
 * in parallel. The distType flag decides which subdirectories of a package should be tar'ed up.
 * ('all' will tar everything in dist and is used to capture everything except types)
 *
 * Usage:
 *  (cd build/legacy/ci-scripts && yarn upload-partial-dists --distType all) # uploads all dist/* dirs
 *  (cd build/legacy/ci-scripts && yarn upload-partial-dists --distType types) # uploads just dist/types dirs
 */

const distTypes = ['types', 'all'];
if (distType && !distTypes.includes(distType)) {
  console.error('Invalid distType provided, must be one of: ', distTypes);
  process.exit(1);
}

async function main() {
  const distDir = distType === 'all' ? '*' : distType;
  const changedPackages = await getChangedPackagesFromChangesets(cwd);
  const tarDirs = await globby(
    changedPackages
      .map(pkg => {
        const dirs = [`${pkg.relativeDir}/dist/${distDir}`];
        if (distType === 'all') {
          // Entry points
          dirs.push(`${pkg.relativeDir}/*/package.json`);
        }
        return dirs;
      })
      // @ts-ignore
      .flat(),
    { cwd },
  );
  const tarFile = `${distType}.tar.gz`;
  // c - create and archive, v - verbose, z gzip archive, f - read from a file(s)
  // we pass fileMock to make sure we never try to zip nothing!
  const tarFlags = ['-cvzf', `./${tarFile}`, ...tarDirs, 'fileMock.js'];
  console.log(`executing: tar ${tarFlags.join(' ')}`);

  if (!dryFlag) {
    await spawndamnit('tar', tarFlags, {
      stdio: 'inherit',
      cwd,
    });
  }

  console.log('Uploading');
  if (!process.env.BITBUCKET_COMMIT) {
    throw new Error('BITBUCKET_COMMIT variable not set');
  }
  const bitbucketCommit = String(process.env.BITBUCKET_COMMIT);
  const commitHash = bitbucketCommit.substring(0, 12);
  const bucketPath = `partial-dists/${commitHash}/${tarFile}`;
  // partial dists are published to private bucket so that we don't accidentally expose any code.
  const bucketName = 'atlassian-frontend-private-us-east';
  const bucketRegion = 'us-east-1';
  const s3WrapperOpts = {
    region: bucketRegion,
  };
  const s3 = new S3Wrapper(s3WrapperOpts);
  await s3.uploadFile({
    localFile: tarFile,
    s3Params: {
      Bucket: bucketName,
      Key: bucketPath,
    },
  });
  const artefactUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/${bucketPath}`;
  console.log(`Artefact URL (note: not public): ${artefactUrl}`);
  console.log('Done');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
