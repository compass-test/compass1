/* eslint-disable no-console */
import getStorybookUrls from './utils/get-storybook-url';
import spawn from 'spawndamnit';
import rimraf from 'rimraf';

const buildStorybook = async () => {
  const { BITBUCKET_BRANCH } = process.env;
  const { STORYBOOK_PREFIX } = await getStorybookUrls();
  const isMaster = BITBUCKET_BRANCH === 'master';

  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('Building storybook...');

  try {
    rimraf.sync(`${__dirname}/.out`);

    await spawn(
      'bolt',
      [
        'storybook',
        '@atlassian/search-dialog @atlassian/product-search-dialog',
        '--write',
        `--outputDir=${__dirname}/.out/${STORYBOOK_PREFIX}`,
      ],
      {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit',
        shell: true,
      },
    );

    if (isMaster) {
      console.log('Preparing master storybook...');
      await spawn('cp', ['-r', `.out/${STORYBOOK_PREFIX}`, '.out/latest'], {
        cwd: `${__dirname}`,
        stdio: 'inherit',
        shell: true,
      });
    }

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

buildStorybook().catch((e) => {
  console.error(e);
  process.exit(1);
});
