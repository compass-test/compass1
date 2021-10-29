/*
Temporary script used to turn the repo into a yarn workspace for the yarn compatibility check.
Only use node modules! No yarn install
*/

const fs = require('fs').promises;
const path = require('path');

const packageJsonPath = path.resolve(process.cwd(), './package.json');
// eslint-disable-next-line import/no-dynamic-require
const packageJSON = require(packageJsonPath);

const main = async () => {
  packageJSON.workspaces = packageJSON.bolt.workspaces;
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJSON, null, 2));
};

main().catch(err => {
  console.error('Script failed with error ', err);
  process.exit(1);
});
