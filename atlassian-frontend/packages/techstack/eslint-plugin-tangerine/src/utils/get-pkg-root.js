const path = require('path');

const pkgUp = require('pkg-up');

/** Get the directory of the closest package.json in the tree relative to currentFilepath.
 *
 * @param currentFilepath The filepath you want to get the pkg root relative to.
 *
 * Returns the closest directory or the current working directory if a package.json cannot be found.
 */
const getPkgRoot = currentFilepath => {
  const pkgRoot = pkgUp.sync({ cwd: currentFilepath });

  if (pkgRoot == null) {
    return process.cwd();
  }

  return path.dirname(pkgRoot);
};

module.exports = getPkgRoot;
