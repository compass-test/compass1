/**
 * Run 'bolt w @atlaskit/codeshifts format-package-jsons' to execute
 */

import path from 'path';
import meow from 'meow';
import { promises as fs } from 'fs';

import intersection from 'lodash/intersection';
import union from 'lodash/union';

import { getPackagesInfo, PackageInfo } from '@atlaskit/build-utils/tools';
import { AFPackageJson, TeamsJson } from '@atlaskit/build-utils/types';

const STANDARD_KEYS = [
  'name',
  'version',
  'description',
  'publishConfig',
  'private',
  'repository',
  'author',
  'license',
  'main',
  'module',
  'module:es2019',
  'types',
  'sideEffects',
  'atlaskit:src',
  'atlaskit:designLink',
  'atlaskit',
  'atlassian',
  'team',
  'scripts',
  'files',
  'bin',
  'config',
  'dependencies',
  'peerDependencies',
  'devDependencies',
  'optionalDependencies',
  'keywords',
  'techstack',
  'stricter',
] as const;

const sortObject = (obj?: Record<string, any>) => {
  if (!obj) {
    return undefined;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return undefined;
  }
  return keys.sort().reduce((r, k) => {
    // eslint-disable-next-line no-param-reassign
    r[k] = obj[k];
    return r;
  }, {} as typeof obj);
};

type OperationOptions = {
  overwrite?: boolean;
};

const OPERATIONS: Record<
  string,
  (value: any, teamsJson: TeamsJson, options: OperationOptions) => any
> = {
  dependencies: sortObject,
  devDependencies: sortObject,
  peerDependencies: sortObject,
  optionalDependencies: sortObject,
  author: () => 'Atlassian Pty Ltd',
  repository: () => 'https://bitbucket.org/atlassian/atlassian-frontend',
  maintainers: () => undefined,
  atlassian: (
    existingValue: AFPackageJson['atlassian'],
    teamsJson: TeamsJson,
    options: OperationOptions,
  ) => {
    const fields: Record<string, any> = {
      ...existingValue,
    };

    const teamInfo = teamsJson[fields['team']];
    const teamReleaseModel =
      (teamInfo && teamInfo.primaryReleaseModel) || 'continuous';

    fields['releaseModel'] = options.overwrite
      ? teamReleaseModel
      : fields['releaseModel'] || teamReleaseModel;

    return {
      // Place team first
      team: fields['team'],
      ...sortObject(fields),
    };
  },
};

type Flags = {
  dir?: string;
  overwrite?: boolean;
  team?: string;
};

async function main(flags: Flags = {}) {
  const cwd = process.cwd();
  const packagesInfo: PackageInfo[] = await getPackagesInfo(cwd, {});
  const teamsJson: TeamsJson = JSON.parse(
    await fs.readFile(`${__dirname}/../../../teams.json`, 'utf8'),
  );

  if (flags.team && !teamsJson[flags.team]) {
    throw new Error(`Invalid team ${flags.team}, see teams.json`);
  }

  await Promise.all(
    packagesInfo
      .filter(packageInfo =>
        packageInfo.relativeDir.startsWith(flags.dir ? flags.dir : 'packages/'),
      )
      .filter(packageInfo => {
        const pkgOwner =
          packageInfo.config.atlassian && packageInfo.config.atlassian.team;
        return !flags.team || pkgOwner === flags.team;
      })
      .map(packageInfo => {
        const packageJson = packageInfo.config;
        const originalKeys = Object.keys(packageJson);
        // This allows us to add missing keys
        const requiredKeys = [...originalKeys, ...Object.keys(OPERATIONS)];
        const sortedKeys = union(
          intersection(STANDARD_KEYS, requiredKeys),
          originalKeys,
        );

        const fixedPackageJson: Record<string, any> = {};
        sortedKeys.forEach(key => {
          fixedPackageJson[key] = (OPERATIONS[key] || (x => x))(
            packageJson[key],
            teamsJson,
            { overwrite: flags.overwrite },
          );
        });

        const packageJsonPath = path.join(packageInfo.dir, 'package.json');

        return fs.writeFile(
          packageJsonPath,
          `${JSON.stringify(fixedPackageJson, null, 2)}\n`,
        );
      }),
  );
}

if (require.main === module) {
  const cli = meow(
    `
    Usage
      $ bolt w @atlaskit/codeshifts format-package-jsons

      NOTE: Any space separated arguments must be wrapped with double quotes, e.g. --team '"foo bar"'

      Options
        --dir <dir>        Only target packages under <dir>, relative to the root
        --overwrite        Overwrite existing values, only works for certain fields, e.g. releaseModel
        --team '"<team>"'  Only target packages owned by <team>

      Examples

      bolt w @atlaskit/codeshifts format-package-jsons

      bolt w @atlaskit/codeshifts format-package-jsons --team '"Design System Team"'
    `,
    {
      description: 'Formats package.jsons',
      flags: {
        dir: {
          type: 'string',
        },
        overwrite: {
          type: 'boolean',
        },
        team: {
          type: 'string',
        },
      },
    },
  );
  main(cli.flags)
    .then(() => {
      console.log('Done!');
    })
    .catch(e => {
      console.error(e);
      process.exit(1);
    });
}
