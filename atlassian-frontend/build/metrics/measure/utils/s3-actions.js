const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const axios = require('axios');

const { S3Wrapper } = require('@atlaskit/build-utils/s3');

const masterStatsFolder = createDir('./.masterBundleSize');
const currentStatsFolder = createDir('./.currentBundleSize');

const { BITBUCKET_COMMIT } = process.env;
const { AWS_ACCESS_KEY } = process.env;
const { AWS_SECRET_KEY } = process.env;
const BUCKET_NAME = 'atlaskit-artefacts';
const BUCKET_REGION = 'ap-southeast-2';

function createDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch (err) {
    if (err.code === 'EEXIST') {
      return dir;
    }
    console.log(err);
    process.exit(0);
  }
  return dir;
}

function isAWSAccessible() {
  if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !BITBUCKET_COMMIT) {
    console.error(
      chalk.red(
        'AWS_ACCESS_KEY, AWS_SECRET_KEY or BITBUCKET_COMMIT are missing',
      ),
    );
    console.error(
      chalk.red('These env variables need to be set to be able to s3'),
    );
    return false;
  }
  return true;
}

/**
 * This function downloads files from S3 and create ratchet file into a given download location.
 * This does not use S3 commands instead uses http get to fetch ratchet file from S3.
 * This is designed to enable local dev loop without AWS credentials to access data on S3.
 **/
async function downloadFromS3ForLocal(
  branch /*: string */,
  commit /*: string */ = '',
  downloadToFolder /*: string */,
  packageName /*: string */,
) {
  const ratchetFile = `${packageName}-bundle-size-ratchet.json`;
  const ratchetFilePath = commit ? `${commit}/${ratchetFile}` : ratchetFile;
  const output = `${downloadToFolder}/${ratchetFile}`;
  const ratchetFileUrl = `https://s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${branch}/bundleSize/${ratchetFilePath}`;

  try {
    const response = await axios({
      url: ratchetFileUrl,
      method: 'get',
    });
    fs.writeFileSync(output, JSON.stringify(response.data), 'utf-8');
  } catch (err) {
    const branchOrCommitMsg = commit ? `${branch} on commit ${commit}` : branch;
    if (err.response.status === 403 || err.response.status === 404) {
      console.error(
        chalk.red(
          `Could not find file ${ratchetFile} on s3 for ${branchOrCommitMsg},\nit is likely that you are adding a new package to the repository.\nIt should be handled by the CI script, if it is not please run the custom build 'push-bundle-size-to-s3' from your branch.`,
        ),
      );
      process.exit(0);
    } else {
      console.error(chalk.red(`${err}`));
      process.exit(1);
    }
  }
}

async function downloadFromS3(
  branch /*: string */,
  commit /*: string */ = '',
  downloadToFolder /*: string */,
  packageName /*: string */,
) {
  if (!isAWSAccessible()) {
    process.exit(1);
  }

  const ratchetFile = `${packageName}-bundle-size-ratchet.json`;
  const ratchetFilePath = commit ? `${commit}/${ratchetFile}` : ratchetFile;
  const bucketPath = `${branch}/bundleSize/${ratchetFilePath}`;

  console.log(chalk.blue(`bucket: ${bucketPath}`));
  try {
    const params = {
      localFile: `${downloadToFolder}/${ratchetFile}`,

      s3Params: {
        Bucket: BUCKET_NAME,
        Key: bucketPath,
      },
    };

    const s3 = new S3Wrapper();

    await s3.downloadFile(params);
  } catch (err) {
    // We recently changed the S3 library and the error thrown by the lib has changed.
    // This particular error only occurs when the ratchet file does not exist on S3.
    // The error returned by the library has only the two standards fields `message` and `name`.
    if (err.message.includes('status code 404')) {
      const branchOrCommitMsg = commit
        ? `${branch} on commit ${commit}`
        : branch;
      console.warn(
        chalk.yellow(`Could not find file ${ratchetFile} on s3 for ${branchOrCommitMsg},\nit is likely that you are adding a new package to the repository.
        Don't worry, we will create and upload ratchet file for this pkg.`),
      );
      throw new Error(
        `Ratchet file for this ${packageName} was not found in s3 bucket`,
      );
    } else {
      console.error(chalk.red(`${err}`));
      process.exit(1);
    }
  }
}

async function uploadToS3(
  branch /*: string */,
  commit /*: string */ = '',
  pathToFile /*: string */,
) {
  if (!isAWSAccessible()) {
    process.exit(1);
  }

  if (!fs.accessSync(path.resolve(pathToFile))) {
    chalk.red(
      `Could not find file: ${path.basename(
        pathToFile,
      )} from ${process.cwd()} for ${commit ? branch - commit : branch}`,
    );
  }
  const fileName = path.basename(pathToFile);
  const filePath = commit ? `${commit}/${fileName}` : fileName;
  const bucketPath = `${branch}/bundleSize/${filePath}`;

  const params = {
    localFile: pathToFile,

    s3Params: {
      Bucket: BUCKET_NAME,
      Key: bucketPath,
    },
  };

  const s3 = new S3Wrapper();

  await s3.uploadFile(params);

  const publicUrl = `https://s3-${BUCKET_REGION}.amazonaws.com/${BUCKET_NAME}/${branch}/bundleSize/${filePath}`;
  console.log(chalk.green('Successfully published to', publicUrl));
}

module.exports = {
  currentStatsFolder,
  downloadFromS3,
  downloadFromS3ForLocal,
  masterStatsFolder,
  uploadToS3,
};
