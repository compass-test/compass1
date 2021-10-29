/* eslint-disable no-console */

import spawn from 'spawndamnit';

const deployToStaticService = async () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

  const { MICROS_ENV = 'ddev' } = process.env;

  console.log(`Deploying storybook to ss-search-dialog-story in ${MICROS_ENV}`);

  await spawn(
    'atlas',
    [
      'micros',
      'static',
      'deploy',
      '--service=ss-search-dialog-story',
      `--env=${MICROS_ENV}`,
      `--file=./ss-search-dialog-story.sd.yaml`,
    ],
    {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true,
    },
  );
};

deployToStaticService().catch((e) => {
  console.error(e);
  process.exit(1);
});
