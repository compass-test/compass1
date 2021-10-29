/* eslint-disable no-console */
import spawn from 'spawndamnit';
import { getSimplePackageName } from './utils/get-simple-package-name';
import { getChangedPackages } from './utils/get-changed-packages';
import fs from 'fs';

const buildStorybook = async () => {
  const { MICROS_ENV } = process.env;

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Building analytics...');

  const changedPackage = await getChangedPackages();

  if (!changedPackage.length) {
    console.log('No changed packages detected, skipping analytics');
    process.exit(0);
  }

  for (const pkg of changedPackage) {
    try {
      console.log(`Deploying ${pkg.name}`);

      const simplePackageName = getSimplePackageName(pkg.name);

      const expectedGeneratedFile = `${__dirname}/.out/${simplePackageName}.json`;

      const fileExists = fs.existsSync(expectedGeneratedFile);

      if (!fileExists) {
        console.log(
          'No generated analytics file found. Either the build step failed or no analytics.spec.yaml was defined for the package',
        );
        continue;
      }

      const env = MICROS_ENV || 'stg';

      console.log(`Pushing analytics for ${pkg.name} to ${env}`);

      await spawn(
        'bolt',
        [
          'analytics-spec:push',
          `--file=${expectedGeneratedFile}`,
          `--env=${env}`,
          '--verbose',
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
