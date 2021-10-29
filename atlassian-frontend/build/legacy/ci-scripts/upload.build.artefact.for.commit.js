const fs = require('fs');
const path = require('path');

const { S3Wrapper } = require('@atlaskit/build-utils/s3');

/**
 * Uploads the build artefact located at `artefactPath` to our s3 bucket under the prefix
 * of `${BITBUCKET_COMMIT}/${s3PathPrefix}.
 * `isDir` must be set if `artefactPath` points to a directory.
 */
async function main(opts) {
  const {
    artefactPath,
    s3PathPrefix,
    bucketName = 'atlaskit-artefacts',
    bucketRegion = 'ap-southeast-2',
    isDir = false,
  } = opts;
  const { BITBUCKET_COMMIT } = process.env;
  const { AWS_ACCESS_KEY } = process.env;
  const { AWS_SECRET_KEY } = process.env;

  if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
    throw new Error(
      'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing.\nThese env variables need to be set to be able to s3',
    );
  }

  if (!artefactPath) {
    throw new Error(
      `Usage upload.build.artefact.for.commit.js path/to/file/to/upload [path/on/s3]\n'Note: You only need the path for the (optional) second arg, not the basename'`,
    );
  }

  const pathToFile = path.resolve(artefactPath);
  const fileName = path.basename(pathToFile);
  const commitHash = BITBUCKET_COMMIT ? BITBUCKET_COMMIT.substring(0, 12) : '';
  let outputPath = s3PathPrefix || '';

  if (!fs.existsSync(pathToFile)) {
    throw new Error(`Could not find file: ${pathToFile} from ${process.cwd()}`);
  }

  if (outputPath && !outputPath.endsWith('/')) {
    outputPath += '/';
  }
  const bucketPath = `${commitHash}/${outputPath}${fileName}`;
  const s3WrapperOpts = {
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    region: bucketRegion,
  };

  const s3 = new S3Wrapper(s3WrapperOpts);

  if (isDir) {
    await s3.uploadDir({
      localDir: pathToFile,
      s3Params: {
        Bucket: bucketName,
        Prefix: bucketPath,
      },
    });
  } else {
    await s3.uploadFile({
      localFile: pathToFile,
      s3Params: {
        Bucket: bucketName,
        Key: bucketPath,
      },
    });
  }

  const publicUrl = `https://s3-${bucketRegion}.amazonaws.com/${bucketName}/${bucketPath}`;
  console.log('Successfully published to', publicUrl);
  console.log('You can also fetch this file again by running:');
  console.log(
    `BITBUCKET_COMMIT=${commitHash} node ./build/legacy/ci-scripts/download.build.artefact.for.commit.js ${outputPath}${fileName}`,
  );

  return publicUrl;
}

module.exports = main;

if (require.main === module) {
  // Note: we don't expose a way to set the bucketName or bucketRegion in this script when run from cmd line yet
  // that means calling from cli will always upload to the public bucket
  const [artefactPath, s3PathPrefix, isDir] = process.argv.slice(2);
  main({ artefactPath, s3PathPrefix, isDir }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
