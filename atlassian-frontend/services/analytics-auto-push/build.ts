/* eslint-disable no-console */
import spawn from 'spawndamnit';
import rimraf from 'rimraf';
import globby from 'globby';
import { getSimplePackageName } from './utils/get-simple-package-name';
import { getChangedPackages } from './utils/get-changed-packages';
import fs from 'fs';

const buildStorybook = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Building analytics...');

  const changedPackage = await getChangedPackages();

  if (!changedPackage.length) {
    console.log('No changed packages detected, skipping analytics');
    process.exit(0);
  }

  rimraf.sync(`${__dirname}/.out`);
  fs.mkdirSync('.out');

  for (const pkg of changedPackage) {
    try {
      const dir = pkg.dir;
      console.log(`Finding analytics.spec.yaml in ${dir}`);

      const files = await globby('**/analytics.spec.yaml', {
        cwd: dir,
        absolute: true,
      });

      if (!files.length) {
        console.log(`No analytics.spec.yaml found in ${dir}`);
        continue;
      }

      const analyticsSpecFileLocation = files[0];

      console.log(`Found analytics spec file ${analyticsSpecFileLocation}`);

      const simplePackageName = getSimplePackageName(pkg.name);

      await spawn(
        'bolt',
        [
          'analytics-spec:generate',
          `--file=${analyticsSpecFileLocation}`,
          `--output=${__dirname}/.out/${simplePackageName}.json`,
          // TODO pick up owner from commit
          `--owner=ci`,
        ],
        {
          cwd: __dirname,
          stdio: 'inherit',
          shell: true,
        },
      );
    } catch (e) {
      console.error(e);
    }
  }
};

buildStorybook().catch((e) => {
  console.error(e);
  process.exit(1);
});
