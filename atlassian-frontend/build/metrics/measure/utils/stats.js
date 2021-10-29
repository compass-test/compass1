/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');
const { fStats, fExists } = require('./fs');

const { CHANGED_MAIN_PACKAGES } = process.env;

function buildStats(
  outputPath /*: string */,
  statsGroups /*: Array<Object>*/,
  bitbucketBranch /*: string */,
  targetBranch /*: string */,
  mergeBaseCommit /*: string */,
) {
  return statsGroups.reduce((acc, group) => {
    // eslint-disable-next-line no-shadow
    return group.stats.reduce((acc, stat) => {
      if (stat.group) {
        acc.push(...buildStats(outputPath, [stat]));
        return acc;
      }
      if (!stat.fileName) return acc;
      const filePath = path.resolve(outputPath, stat.fileName);
      // TODO: Maybe use pkg-up
      let pathToPkg = outputPath.split('/.')[0];
      const entryPath = pathToPkg.split('src/')[1];
      pathToPkg = filePath.includes('src')
        ? pathToPkg.split('src')[0]
        : pathToPkg;
      const packageVersion = require(`${pathToPkg}/package.json`).version;
      const packageName = require(`${pathToPkg}/package.json`).name;
      const packageTeam = require(`${pathToPkg}/package.json`).atlassian.team;
      // CHANGED_MAIN_PACKAGES return only the packages that have changed since master.
      // CHANGED_PACKAGES - use for the main scripts - can return either only the packages that have changed since master or
      // those packages and includes their dependents if the flag --dependent='direct' is set.
      // The goal of this code below is to check if the tool runs against the main changed package or a dependent.
      let mainPkg = true;
      if (CHANGED_MAIN_PACKAGES) {
        mainPkg = !!CHANGED_MAIN_PACKAGES.split(' ')
          .map(pkg => path.join(process.cwd(), pkg))
          .includes(pathToPkg);
      }

      if (!fExists(filePath)) return acc;
      acc.push({
        team: packageTeam,
        package: packageName,
        entryPath,
        version: packageVersion,
        bitbucketBranch,
        targetBranch: targetBranch || bitbucketBranch,
        mergeBaseCommit,
        mainPkg,
        dependent: !mainPkg,
        id: stat.id,
        name: stat.name,
        threshold: stat.threshold,
        stats: fStats(filePath),
      });
      return acc;
    }, acc);
  }, []);
}
/**
 * Creates an array of all packages groups in the repo
 * and cacheGroups for them.
 */
function createAtlassianFrontendStatsGroups(
  packagesDir /*: string*/,
  packagePath /*: string*/,
  bitbucketBranch /*: string */,
  targetBranch /*: string */,
  mergeBaseCommit /*: string */,
) {
  // TODO: Maybe use pkg-up
  // or refactor the function to find the package.json.
  const pkgPath = packagePath.includes('src')
    ? packagePath.split('/src/')[0]
    : packagePath;
  const packageVersion = require(`${packagesDir}/${pkgPath}/package.json`)
    .version;
  const packageName = require(`${packagesDir}/${pkgPath}/package.json`).name;
  return fs
    .readdirSync(packagesDir)
    .filter(gr => !gr.startsWith('.'))
    .map(name => {
      const chunkName = `atlassian-frontend-${name}`;
      const test = module =>
        module.context &&
        // is inside packages directory
        module.context.includes(`packages/${name}/`) &&
        // ignore a package that is being measured
        !module.context.includes(pkgPath);

      return {
        name,
        group: true,
        stats: [
          {
            team: name,
            package: packageName,
            version: packageVersion,
            bitbucketBranch,
            targetBranch: targetBranch || bitbucketBranch,
            mergeBaseCommit,
            id: `atlassian-frontend.${name}.main`,
            name: 'main',
            fileName: `${chunkName}.js`,
            cacheGroup: {
              name: chunkName,
              test,
              enforce: true,
              chunks: 'all',
              priority: -5,
            },
          },
          {
            team: name,
            package: packageName,
            version: packageVersion,
            bitbucketBranch,
            targetBranch: targetBranch || bitbucketBranch,
            mergeBaseCommit,
            id: `atlassian-frontend.${name}.async`,
            name: 'async',
            fileName: `${chunkName}-async.js`,
            cacheGroup: {
              name: `${chunkName}-async`,
              test,
              enforce: true,
              chunks: 'async',
              priority: 5,
            },
          },
        ],
      };
    });
}

function diff(
  origOldStats /*:Array<Object> */,
  origNewStats /*:Array<Object> */,
) {
  const oldStats = [].concat(origOldStats);
  const newStats = [].concat(origNewStats);
  const statsWithDiff = [];
  while (oldStats.length) {
    const old = oldStats.shift();
    const matchIndex = newStats.findIndex(st => st.id === old.id);
    if (matchIndex > -1) {
      let isTooBig;
      const match = newStats[matchIndex];
      const gzipSizeDiff = match.stats.gzipSize - old.stats.gzipSize;
      if (match.threshold) {
        const maxSize =
          match.threshold * old.stats.gzipSize + old.stats.gzipSize;
        isTooBig = maxSize < match.stats.gzipSize;
      }
      statsWithDiff.push({
        ...match,
        isTooBig,
        stats: {
          ...match.stats,
          originalSize: old.stats.size,
          newSize: match.stats.size,
          sizeDiff: match.stats.size - old.stats.size,
          gzipOriginalSize: old.stats.gzipSize,
          gzipSize: match.stats.gzipSize,
          gzipSizeDiff,
        },
      });
      newStats.splice(matchIndex, 1);
    } else {
      statsWithDiff.push({
        ...old,
        deleted: true,
        stats: {
          size: 0,
          gzipSize: 0,
          sizeDiff: -old.stats.size,
          gzipSizeDiff: -old.stats.gzipSize,
        },
      });
    }
  }
  return [
    ...statsWithDiff,
    ...newStats.map(stat => {
      // eslint-disable-next-line no-param-reassign
      stat.new = true;
      return stat;
    }),
  ];
}

function clearStats(stats /*:Array<Object> */) {
  return stats
    .filter(item => !item.deleted)
    .map(item => {
      const { new: added, ...details } = item;
      return {
        ...details,
        threshold: undefined,
        isTooBig: undefined,
      };
    });
}

module.exports = {
  buildStats,
  createAtlassianFrontendStatsGroups,
  diff,
  clearStats,
};
