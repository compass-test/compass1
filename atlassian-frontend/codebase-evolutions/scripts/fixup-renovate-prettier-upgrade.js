/* eslint-disable no-console */
/**
 * Renovate runs this file in a postUpgradeTask which is why I made it js instead of ts.
 * I'll make a ticket to figure out how to make our Renovate execution environment more a-f CI like.
 * Which should make it easier to get things like ts-node to work properly.
 * During my spikes I did add a focussed install, but I still couldn't get ts-node to work.
 */
const bolt = require('bolt');
const path = require('path');
const fse = require('fs-extra');

/*
 This script looks for @atlassian/atlassian-frontend-prettier-config dependencies.
 Parses the version field, and updates the alias to the correct name to match the version field.
 We do this to work around Bolt's dependency check, since for linting rules we don't really care about
 multiple versions anyway.

 Renovate will always update _just_ the alias field i.e. npm:pkg@1.0.0 -> npm:pkg@1.0.1.
 To keep bolt happy, after Renovate has performed that upgrade, we bump the version in the alias to, i.e:
 "pkg-1.0.1": "npm:pkg@1.0.1"

 This way while teams are still merging the prettier upgrade, there will be teams using pkg-1.0.0 & pkg-1.0.1
 since they have different names, bolt will be happy about it.

 Once everyone is upgraded we need to add a unused dependency script to clean the old ones up.
 Also the prettier-config lives in a seperate repo for now (which I still to be setup (ticket pending)).
*/
async function main() {
  const workspaces = await bolt.getWorkspaces();
  return Promise.all(
    workspaces.map(async ws => {
      const originalConfig = ws.config;

      const entry = Object.entries(
        originalConfig.devDependencies || {},
      ).find(([name]) =>
        name.startsWith('@atlassian/atlassian-frontend-prettier-config'),
      );

      if (!entry || !entry.length) {
        return;
      }
      const [packageJsonName, packageJsonVersion] = entry;

      const npmAliasRegex = new RegExp(
        'npm:@atlassian/atlassian-frontend-prettier-config@([0-9.]+)',
      );
      let version;
      const match = packageJsonVersion.match(npmAliasRegex);

      if (match) {
        [, version] = match;
      } else {
        // This else is for when it's not an alias, this way we don't break new packages using a regular deps.
        console.warn(
          `Skipping ${ws.name} because it has a regular dependency on prettier-config`,
        );
        return;
      }

      const newAliasName = `@atlassian/atlassian-frontend-prettier-config-${version}`;
      const newAliasVersion = `npm:@atlassian/atlassian-frontend-prettier-config@${version}`;

      const fixedJson = {
        ...originalConfig,
        prettier: `@atlassian/atlassian-frontend-prettier-config-${version}`,
        devDependencies: Object.fromEntries(
          Object.entries({
            ...originalConfig.devDependencies,
            [packageJsonName]: undefined,
            [newAliasName]: newAliasVersion,
          }).sort(),
        ),
      };
      await fse.writeJSON(path.join(ws.dir, 'package.json'), fixedJson, {
        spaces: 2,
      });

      /*
       Since we change "pkg": "1.0.0" to "pkg": "npm:pkg@1.0.0",
       we also need to update the root level package.json
      */
      const rootPackageJson = await fse.readJson(
        path.join(process.cwd(), './package.json'),
      );
      if (!rootPackageJson.devDependencies[newAliasName]) {
        // This looks complex but it's only because of the sort.
        // Without the sort people will end up having different sorting if the run bolt add.
        rootPackageJson.devDependencies[newAliasName] = newAliasVersion;
        const fixedRootPackageJson = {
          ...rootPackageJson,
          devDependencies: Object.fromEntries(
            Object.entries({
              ...rootPackageJson.devDependencies,
              [newAliasName]: newAliasVersion,
            }).sort(),
          ),
        };
        await fse.writeJson(
          path.join(process.cwd(), './package.json'),
          fixedRootPackageJson,
          {
            spaces: 2,
          },
        );
      }
    }),
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
