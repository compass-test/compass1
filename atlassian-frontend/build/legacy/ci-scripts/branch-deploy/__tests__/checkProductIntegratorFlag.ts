import { checkProductIntegratorFlag, EnrichedPackage } from '../utils';

const packageA: EnrichedPackage = {
  name: '@atlassian/package-a',
  dir: '',
  relativeDir: '',
  config: {
    version: '0.0.1',
    name: '@atlassian/package-c',
    atlassian: {
      releaseModel: 'continuous',
      disableProductCI: true,
    },
  },
};

const packageB: EnrichedPackage = {
  name: '@atlassian/package-b',
  dir: '',
  relativeDir: '',
  config: {
    version: '0.0.1',
    name: '@atlassian/package-c',
    atlassian: {
      releaseModel: 'scheduled',
      disableProductCI: true,
    },
  },
};

const packageC: EnrichedPackage = {
  name: '@atlassian/package-c',
  dir: '',
  relativeDir: '',
  config: {
    name: '@atlassian/package-c',
    version: '0.0.1',
    atlassian: {
      releaseModel: 'continuous',
    },
  },
};

const packageD: EnrichedPackage = {
  name: '@atlassian/package-d',
  dir: '',
  relativeDir: '',
  config: {
    name: '@atlassian/package-d',
    version: '0.0.1',
    atlassian: {
      releaseModel: 'continuous',
      disableProductCI: true,
    },
  },
};

describe('Product integrator / products CI', () => {
  it('should not be triggered, if all packages are on continuous release and all opt-out flags for each packages are set to `true`', async () => {
    const pkgsWithChangesetsBothContinuousBothSkipCi = [packageA, packageD];

    const shouldNotTriggerProductCI = await checkProductIntegratorFlag(
      pkgsWithChangesetsBothContinuousBothSkipCi,
    );
    expect(shouldNotTriggerProductCI).toBe(true);
  });

  it('should be triggered, if a package is on continuous release, and a package have the opt-out flag set to `true`', async () => {
    const pkgsWithChangesetsBothContinuousNotAllSkipCi = [packageA, packageC];

    const shouldNotTriggerProductCI = await checkProductIntegratorFlag(
      pkgsWithChangesetsBothContinuousNotAllSkipCi,
    );
    expect(shouldNotTriggerProductCI).toBe(false);
  });

  it('should be triggered, if a package is on scheduled release and other packages with continuous have the opt-out flag set to `true`', async () => {
    const pkgsWithChangesetsScheduledContinuousAndSkipCI = [
      packageA,
      packageB,
      packageD,
    ];

    const shouldNotTriggerProductCI = await checkProductIntegratorFlag(
      pkgsWithChangesetsScheduledContinuousAndSkipCI,
    );
    expect(shouldNotTriggerProductCI).toBe(false);
  });
});
