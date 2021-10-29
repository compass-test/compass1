import fs from 'fs';
import path from 'path';
import {
  getPackagesOnScheduledReleases,
  getPackagesOnContinuousReleases,
} from '@atlaskit/build-utils/packages';
// eslint-disable-next-line @atlassian/tangerine/import/no-relative-package-imports
import teamsJson from '../../../../teams.json';

import packageJson from '../package.json';

const AFGroupName = 'Atlassian-frontend Scheduled Releases Upgrade';
const disableOtherUpdatesGroupName =
  'Negate everything else not coming from atlassian-frontend';

interface Renovate {
  default: Rules;
  'disable-other-upgrades'?: Rules;
  'disable-other-upgrades-except-af'?: Rules;
  'editor-only'?: Rules;
  continuousByTeam?: Rules;
}

type Rules = {
  extends?: string[];
  packageRules: PackageRule[];
  separateMajorMinor?: boolean;
  rangeStrategy?: string;
  prConcurrentLimit?: number;
  postUpdateOptions?: Array<string>;
};

type PackageRule = {
  packagePatterns?: string;
  groupName: string;
  packageNames: string[];
  excludePackageNames: string[];
  excludePackagePatterns: string[];
  enabled?: boolean;
  reviewers?: string[];
};

(async function () {
  // Read package.json
  let pkgJson: Renovate = packageJson['renovate-config'];

  // Generate packageNames -> schedule
  const AFScheduledReleasesUpgradePackages = (
    await getPackagesOnScheduledReleases()
  )
    .filter((pkg: any) => !pkg.config.private)
    .filter(
      ({ name }: any) =>
        name.startsWith('@atlaskit') || name.startsWith('@atlassian'),
    );

  pkgJson.default = {
    extends: ['config:base', '@atlaskit:continuousByTeam'],
    packageRules: [
      {
        groupName: AFGroupName,
        packageNames: AFScheduledReleasesUpgradePackages.map(
          (pkg: any) => pkg.name,
        ),
        enabled: true,
        excludePackagePatterns: [],
        excludePackageNames: [],
        reviewers: ['mdejongh', 'rbellebon'],
      },
    ],
  };

  const AFContinuousReleasesUpgradePackages = (
    await getPackagesOnContinuousReleases()
  )
    .filter((pkg: any) => !pkg.config.private)
    .filter(
      ({ name }: any) =>
        name.startsWith('@atlaskit') || name.startsWith('@atlassian'),
    );

  const continuousReleasesUpgradeGroups: PackageRule[] = [];

  AFContinuousReleasesUpgradePackages.forEach((pkg: any) => {
    const teamName = pkg.config.atlassian.team;
    if (!teamsJson[teamName]) {
      console.error(`[${pkg.name}] Couldn't find team ${teamName}`);
      return;
    }

    let teamGroup = continuousReleasesUpgradeGroups.find(
      ({ groupName }) => groupName === teamName,
    );

    if (!teamGroup) {
      teamGroup = {
        groupName: teamName,
        packageNames: [],
        enabled: true,
        excludePackagePatterns: [],
        excludePackageNames: [],
        reviewers: teamsJson[teamName].contributors,
      };
      continuousReleasesUpgradeGroups.push(teamGroup);
    }

    teamGroup.packageNames.push(pkg.name);
  });

  console.log(continuousReleasesUpgradeGroups);

  pkgJson.continuousByTeam = { packageRules: continuousReleasesUpgradeGroups };

  // Generate excludePackageNames
  const disableOtherUpgradesExceptAFPackages = [
    ...AFContinuousReleasesUpgradePackages.map(({ name }: any) => name),
    ...AFScheduledReleasesUpgradePackages.map(({ name }: any) => name),
  ];

  if (pkgJson['disable-other-upgrades-except-af']) {
    const [disablePackageRules] = pkgJson[
      'disable-other-upgrades-except-af'
    ].packageRules.filter(
      rule => rule.groupName === disableOtherUpdatesGroupName,
    );
    disablePackageRules.excludePackageNames = disableOtherUpgradesExceptAFPackages;
  }

  const pkgJsonPath = path.join(
    process.cwd(),
    'packages/monorepo-tooling/renovate-config/package.json',
  );
  packageJson['renovate-config'] = pkgJson;
  const pkgJsonStr = JSON.stringify(packageJson, null, 2);
  console.log(`Updating package.json for renovate config...`);
  fs.writeFileSync(pkgJsonPath, pkgJsonStr);
})();
