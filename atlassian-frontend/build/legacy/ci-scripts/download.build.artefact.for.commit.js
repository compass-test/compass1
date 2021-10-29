const path = require('path');

const { S3Wrapper } = require('@atlaskit/build-utils/s3');

const { BITBUCKET_COMMIT } = process.env;
const { AWS_ACCESS_KEY } = process.env;
const { AWS_SECRET_KEY } = process.env;

if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
  console.error(
    'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
  );
  console.error('These env variables need to be set to be able to s3');
  process.exit(1);
}

async function main(opts) {
  const {
    artefactPath,
    bucketName = 'atlaskit-artefacts',
    bucketRegion = 'ap-southeast-2',
  } = opts;
  const commitHash = BITBUCKET_COMMIT ? BITBUCKET_COMMIT.substring(0, 12) : '';
  const remotePathToFile = `${commitHash}/${artefactPath}`;
  const localFileName = path.basename(artefactPath);

  const downloadParams = {
    localFile: localFileName,

    s3Params: {
      Bucket: bucketName,
      Key: remotePathToFile,
    },
  };
  const s3WrapperOpts = {
    accessKey: AWS_ACCESS_KEY,
    secretKey: AWS_SECRET_KEY,
    region: bucketRegion,
  };

  const s3 = new S3Wrapper(s3WrapperOpts);

  return s3.downloadFile(downloadParams);
}

module.exports = main;

if (require.main === module) {
  if (process.argv.length !== 3) {
    console.error(
      `Usage ${path.basename(process.argv[1])} relative/path/on/s3`,
    );
    process.exit(1);
  }
  const artefactPath = process.argv[2];
  // Note: We don't currently support setting the bucketname or region via the command line
  // it will default to using the public bucket
  main({ artefactPath }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
