import { AFPackage } from '@atlaskit/build-utils/types';

import * as releaseModel from './release-model';

jest.mock('@atlaskit/build-utils/getWorkspacesSync', () => {
  return {
    __esModule: true,
    getWorkspacesSync: jest.fn(() => mockedPackages),
  };
});

beforeAll(() => {
  // Silence the logs from the methods tested in this file
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockedPackages: Partial<AFPackage>[] = [
  {
    config: {
      name: '@atlaskit/continuous-a',
      version: '8.0.3',
      atlassian: {
        releaseModel: 'continuous',
      },
    },
    name: '@atlaskit/continuous-a',
    dir: '/workspace/atlassian-frontend/packages/foo/continuous-alpha',
  },
  {
    config: {
      name: '@atlaskit/scheduled-a',
      version: '8.3.0',
      atlassian: {
        releaseModel: 'scheduled',
      },
    },
    name: '@atlaskit/scheduled-a',
    dir: '/workspace/atlassian-frontend/packages/foo/scheduled-alpha',
  },
  {
    config: {
      name: '@atlaskit/continuous-b',
      version: '1.0.0',
      atlassian: {
        releaseModel: 'continuous',
      },
    },
    name: '@atlaskit/continuous-b',
    dir: '/workspace/atlassian-frontend/packages/bar/continuous-beta',
  },
  {
    config: {
      name: '@atlaskit/continuous-c',
      version: '5.1.1',
      atlassian: {
        releaseModel: 'continuous',
      },
    },
    name: '@atlaskit/continuous-c',
    dir: '/workspace/packages/baz/continuous-gamma',
  },
  {
    config: {
      name: '@atlaskit/scheduled-b',
      version: '10.2.4',
      atlassian: {
        releaseModel: 'scheduled',
      },
    },
    name: '@atlaskit/scheduled-b',
    dir: '/workspace/atlassian-frontend/packages/bar/scheduled-beta',
  },
  {
    config: {
      name: '@atlaskit/scheduled-c',
      version: '2.1.15',
      atlassian: {
        releaseModel: 'scheduled',
      },
    },
    name: '@atlaskit/scheduled-c',
    dir: '/workspace/atlassian-frontend/packages/baz/scheduled-gamma',
  },
  {
    config: {
      name: '@atlaskit/website',
      version: '6.8.1',
    },
    name: '@atlaskit/website',
    dir: '/workspace/atlassian-frontend/website',
  },
];

describe('packages', () => {
  it('should discard non-packages', () => {
    const packages: AFPackage[] = releaseModel
      .getPackages()
      .filter(releaseModel.isPackage);
    const paths = packages.map((pkg: AFPackage) => pkg.dir);
    expect(paths.every((path: string) => path.startsWith('packages/'))).toBe(
      false,
    );
  });

  it('should trim path prefix', () => {
    const packages = releaseModel.getPackages().filter(releaseModel.isPackage);
    const paths = packages.map(releaseModel.toPackagePaths);
    expect(paths).toEqual([
      'packages/foo/continuous-alpha',
      'packages/foo/scheduled-alpha',
      'packages/bar/continuous-beta',
      'packages/baz/continuous-gamma',
      'packages/bar/scheduled-beta',
      'packages/baz/scheduled-gamma',
    ]);
  });

  it('should filter scheduled release packages only', () => {
    const packages = releaseModel.getPackages().filter(releaseModel.isPackage);
    const scheduledReleasePackages = packages.filter(
      releaseModel.isScheduledRelease,
    );
    expect(scheduledReleasePackages.map((pkg: AFPackage) => pkg.name)).toEqual([
      '@atlaskit/scheduled-a',
      '@atlaskit/scheduled-b',
      '@atlaskit/scheduled-c',
    ]);
  });

  it('should filter continuous release packages only', () => {
    const packages = releaseModel.getPackages().filter(releaseModel.isPackage);
    const continuousReleasePackages = packages.filter(
      releaseModel.isContinuousRelease,
    );
    expect(
      continuousReleasePackages.map((pkg: AFPackage) => pkg.name),
    ).toEqual([
      '@atlaskit/continuous-a',
      '@atlaskit/continuous-b',
      '@atlaskit/continuous-c',
    ]);
  });
});

describe('getPackagesForBranch', () => {
  let BITBUCKET_BRANCH: string | undefined;
  beforeAll(() => {
    ({ BITBUCKET_BRANCH } = process.env);
  });
  afterEach(() => {
    process.env.BITBUCKET_BRANCH = '';
  });
  afterAll(() => {
    process.env.BITBUCKET_BRANCH = BITBUCKET_BRANCH;
  });

  it('should get continuous release packages when branch is master', () => {
    process.env.BITBUCKET_BRANCH = 'master';
    const packages = releaseModel.getPackagesForBranch();
    expect(packages.split(' ')).toEqual([
      'packages/foo/continuous-alpha',
      'packages/bar/continuous-beta',
      'packages/baz/continuous-gamma',
    ]);
  });

  it('should get scheduled release packages when branch is develop', () => {
    process.env.BITBUCKET_BRANCH = 'develop';
    const packages = releaseModel.getPackagesForBranch();
    expect(packages.split(' ')).toEqual([
      'packages/foo/scheduled-alpha',
      'packages/bar/scheduled-beta',
      'packages/baz/scheduled-gamma',
    ]);
  });

  it('should get scheduled release packages when branch is release-candidate', () => {
    process.env.BITBUCKET_BRANCH = 'release-candidate/foo';
    const packages = releaseModel.getPackagesForBranch();
    expect(packages.split(' ')).toEqual([
      'packages/foo/scheduled-alpha',
      'packages/bar/scheduled-beta',
      'packages/baz/scheduled-gamma',
    ]);
  });

  it(`should get all packages when branch isn't a mainline branch`, () => {
    process.env.BITBUCKET_BRANCH = 'feature/foo';
    const packages = releaseModel.getPackagesForBranch();
    // The absence of packages means it will default to all packages when a test runner runs
    expect(packages).toEqual('');
  });
});
