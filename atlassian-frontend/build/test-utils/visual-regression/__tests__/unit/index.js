import {
  isSameVersion,
  getLocalImageVersion,
  getDockerImages,
  getImagesByName,
  deleteLegacyAtlaskitImages,
  legacyDockerImageName,
  dockerImageName,
} from '../../docker-helper';

let mockImages = `REPOSITORY    TAG    IMAGE ID    CREATED    SIZE`;
let dockerImages = [];

jest.mock('child_process', () => {
  return {
    execSync: jest.fn(command => {
      if (command === 'docker images') {
        return mockImages;
      }
      if (command.includes('docker rmi -f')) {
        mockImages = `REPOSITORY    TAG    IMAGE ID    CREATED    SIZE`;
        return mockImages;
      }
      return '';
    }),
  };
});

describe('deleteLegacyAtlaskitImages', () => {
  test('should delete legacy AK VR images', async () => {
    mockImages = `
      REPOSITORY                 TAG      IMAGE ID      CREATED       SIZE
      ${legacyDockerImageName}   2.0.0    b98b50bdcd92  3 months ago  881MB
      ${legacyDockerImageName}   2.0.2    b98b503gcd91  4 months ago  801MB
    `;
    dockerImages = await getDockerImages();
    let images = await getImagesByName(dockerImages, legacyDockerImageName);
    expect(images).toHaveLength(2);
    await deleteLegacyAtlaskitImages(dockerImages);
    // We need to get again the array of images after deleting them.
    dockerImages = await getDockerImages();
    images = await getImagesByName(dockerImages, legacyDockerImageName);
    expect(images).toHaveLength(0);
  });
});

describe('getLocalImageVersion', () => {
  test('returns undefined for empty image list', async () => {
    dockerImages = await getDockerImages();
    const latestVersion = await getLocalImageVersion(dockerImages);
    expect(latestVersion).toBeUndefined();
  });

  test(`returns tag of ${dockerImageName} image`, async () => {
    mockImages = `
      REPOSITORY             TAG              IMAGE ID      CREATED       SIZE
      ${dockerImageName}     latest-v2        b98b50bdcd9a  2 months ago  861MB
    `;
    dockerImages = await getDockerImages();
    const latestVersion = await getLocalImageVersion(dockerImages);
    expect(latestVersion).toBe('2');
  });

  test(`returns tag of latest ${dockerImageName} image`, async () => {
    mockImages = `
      REPOSITORY             TAG             IMAGE ID      CREATED       SIZE
      ${dockerImageName}     latest-v2       b98b50bdcd9a  2 months ago  861MB
      ${dockerImageName}     latest-v3       b98b50bdcd9a  2 months ago  861MB
    `;
    dockerImages = await getDockerImages();
    const latestVersion = await getLocalImageVersion(dockerImages);
    expect(latestVersion).toBe('3');
  });

  test('discards <none> tags', async () => {
    mockImages = `
      REPOSITORY             TAG      IMAGE ID      CREATED       SIZE
      ${dockerImageName}     <none>   b98b50bdcd9a  2 months ago  861MB
    `;
    dockerImages = await getDockerImages();
    const latestVersion = await getLocalImageVersion(dockerImages);
    expect(latestVersion).toBeUndefined();
  });
});

describe('isSameVersion', () => {
  test('returns false for version < production version', async () => {
    expect(await isSameVersion('2', '3')).toBe(false);
  });

  test('returns true for version === production version', async () => {
    expect(await isSameVersion('3', '3')).toBe(true);
  });

  test('returns false for undefined version', async () => {
    expect(await isSameVersion(undefined, '3')).toBe(false);
  });

  test('returns true for version === 0 while isReleaseCandidate is true', async () => {
    expect(await isSameVersion('0', '3', true)).toBe(true);
  });
});
