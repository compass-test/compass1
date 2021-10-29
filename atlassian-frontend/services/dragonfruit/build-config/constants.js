const COMPASS_PUBLIC_PATH = '/compass';
const PUBLIC_PATH = `${COMPASS_PUBLIC_PATH}/`;

const COMMIT_HASH = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

module.exports = {
  COMPASS_PUBLIC_PATH,
  PUBLIC_PATH,
  COMMIT_HASH,
};
