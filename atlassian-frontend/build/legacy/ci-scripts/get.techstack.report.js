// eslint-disable-next-line import/no-extraneous-dependencies
const { getTechstackReport } = require('@atlassian/techstack-runtime');

const report = getTechstackReport({
  rootPath: '.',
  pathToPackages: 'packages',
  exclusions: ['__fixtures__'],
});

console.log(JSON.stringify(report, null, 2));
