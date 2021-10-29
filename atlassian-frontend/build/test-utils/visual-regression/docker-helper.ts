/* eslint-disable global-require */
import compose from 'docker-compose';
import path from 'path';
import ip from 'ip';
import { execSync as exec } from 'child_process';
import semver from 'semver';

const cwd = path.join(__dirname);
const log = true;

const PRODUCTION_VR_IMAGE_NAME = 'atlassian-frontend-vr';

// Change this when you're attemting to update the VR docker image
const VR_IMAGE_NAME = PRODUCTION_VR_IMAGE_NAME;
const UPGRADE_IN_PROGRESS = VR_IMAGE_NAME !== PRODUCTION_VR_IMAGE_NAME;

const dockerDomain = UPGRADE_IN_PROGRESS
  ? 'docker.atl-paas.net'
  : 'docker.atl-paas.net/sox';

// SOX compliant image name
export const dockerImageName = `${dockerDomain}/atlassian/${VR_IMAGE_NAME}`;

// Non-SOX compliant image name
export const legacyDockerImageName = 'atlassianlabs/atlaskit-mk-2-vr';

process.env.HOST_IP = ip.address();

interface DockerImage {
  repository: string;
  tag: string;
}

export async function login() {
  try {
    console.info('\nLogin to docker.atl-paas.net ...');
    const dockerLogin = `docker login docker.atl-paas.net`;
    exec(dockerLogin).toString();
  } catch (err) {
    err.message = `Something went wrong when logging into docker.atl-paas.net. Please consult go/docker-login or ask in #build-engineering for help.\n${err.message}`;
    throw err;
  }
}

export async function startDocker() {
  console.info('Starting docker ...');
  try {
    await compose.upAll({ cwd, log });
  } catch (err) {
    err.message = `docker-compose up failed. Visit go/ak-vr-setup and ask in #atlassian-frontend for help.\n${err.message}`;
    throw err;
  }
}

export async function stopDocker(): Promise<any> {
  console.info('Stopping docker ...');
  return compose.stop({ cwd, log });
}

// We only care about the major version for comparison.
// Removing both latest-v and latest just in case an RC was mislabelled.
const convertVersionTagToSemverMajor = (version: string) =>
  `${version.replace('latest-v', '').replace('latest', '0')}.0.0`;

export async function getDockerImages(): Promise<DockerImage[]> {
  const images = exec(`docker images`).toString().trim().split('\n');

  // Discard column titles: `REPOSITORY    TAG    IMAGE ID    CREATED    SIZE`.
  images.shift();

  return images
    .map(line =>
      line
        .split('  ')
        .filter(Boolean)
        .map(item => item.trim()),
    )
    .map(([repository, tag]) => ({ repository, tag }))
    .filter(({ tag }) => tag !== '<none>');
}

// Docker images are fetched via `getDockerImages`.
export async function getImagesByName(
  dockerImages: DockerImage[],
  imageName: string,
) {
  return dockerImages.filter(({ repository }) => repository === imageName);
}

// We now identify the VR docker image tag by the major version.
// This alias can point to whichever semver version is the latest.
// ex: docker.atl-paas.net/sox/atlassian/atlassian-frontend-vr:latest-v2 => 2.1.2.
export const getRemoteImageVersion = () =>
  require('@atlaskit/pipelines-docker-image/package.json').version.split(
    '.',
  )[0];

export async function getLocalImageVersion(images: DockerImage[]) {
  const localVRImages = await getImagesByName(images, dockerImageName);

  localVRImages.sort(({ tag: a }, { tag: b }) =>
    semver.compare(
      convertVersionTagToSemverMajor(b),
      convertVersionTagToSemverMajor(a),
    ),
  );

  const localVRImage = localVRImages[0];

  if (!localVRImage) {
    return undefined;
  }

  // We now tag the VR docker image by latest-vxx (RCs use -v0).
  return localVRImage.tag.replace('latest-v', '');
}

export const isSameVersion = (
  localVersion: string | undefined,
  remoteVersion: string,
  isReleaseCandidate: boolean = false,
) => {
  if (isReleaseCandidate) {
    return localVersion === '0';
  }
  return localVersion ? remoteVersion === localVersion : false;
};

// For migration we delete non-sox compliant images that may pre-exist on the users system.
export async function deleteLegacyAtlaskitImages(images: DockerImage[]) {
  const localAkVrImages = await getImagesByName(images, legacyDockerImageName);
  if (localAkVrImages.length) {
    console.info('Found legacy Atlaskit VR image(s) ...');
    for (const image of localAkVrImages) {
      const imageToDelete = `docker rmi -f ${image.repository}:${image.tag}`;
      console.info(`Deleting ${imageToDelete} ...`);
      exec(imageToDelete).toString();
    }
  }
}

export async function enforceLatestImages() {
  // Get the locally available docker images
  const dockerImages = await getDockerImages();
  // Delete superseded images (if found)
  await deleteLegacyAtlaskitImages(dockerImages);

  console.info('Validating local image is up to date...');

  // Check what is the latest VR image available.
  const prodVersion = await getRemoteImageVersion();
  console.info(
    `Latest remote (production) docker image version tag: latest-v${prodVersion}`,
  );

  // Check what is the current local VR image.
  const localVersion = await getLocalImageVersion(dockerImages);
  const isLatest = localVersion
    ? await isSameVersion(localVersion, prodVersion, UPGRADE_IN_PROGRESS)
    : false;

  const versionTag = `latest-v${
    UPGRADE_IN_PROGRESS ? localVersion : prodVersion
  }`;

  if (isLatest) {
    console.info(
      `Local version is ${
        UPGRADE_IN_PROGRESS ? 'a release candidate' : 'up to date'
      }. Image used: ${dockerImageName}:${localVersion}`,
    );
  } else {
    if (UPGRADE_IN_PROGRESS) {
      console.info(
        `Image upgrade in progress. Building release candidate docker image: ${dockerImageName} ...`,
      );
    } else {
      console.info(
        `Local version tag is ${localVersion ? 'stale:' : 'missing.'}`,
        localVersion ? `latest-v${localVersion}` : '',
      );
      if (localVersion) {
        console.info('Replacing outdated docker image with latest ...');
      } else {
        console.info('Building latest docker image ...');
      }
    }

    // Let's pull the latest image first.
    let cmdResponse: any;
    cmdResponse = exec(
      `docker pull ${dockerImageName}:${versionTag}`,
    ).toString();
    if (cmdResponse) {
      console.info(
        `\tSuccessfully pulled image: ${dockerImageName}:${versionTag}\n`,
      );
      console.log(cmdResponse);
    }

    // Trigger deletion(s)
    await compose.down({ cwd, log });

    // If an error is thrown it's logged automatically via stderr.
    // This will only contain a string if the command succeeds with stdout.
    cmdResponse = exec(
      `docker rmi -f visual-regression_chromium:latest`,
    ).toString();
    if (cmdResponse) {
      console.info('\tDeleted image: visual-regression_chromium:latest\n');
      console.log(cmdResponse);
    }

    // Delete the stale version
    if (localVersion && localVersion !== '0') {
      cmdResponse = exec(
        `docker rmi -f ${dockerImageName}:latest-v${localVersion}`,
      ).toString();
      if (cmdResponse) {
        console.info(`\tDeleted image: ${dockerImageName}:${localVersion}\n`);
        console.log(cmdResponse);
      }
    }
  }
}
