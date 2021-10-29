const bolt = require('bolt');
const get = require('lodash/get');

const getDSTOwnedPackages = async () => {
  const allPackages = await bolt.getWorkspaces();
  const dstPackages = allPackages
    .map((pkg) => pkg.config)
    .filter((pkg) => get(pkg, 'atlassian.team') === 'Design System Team')
    .map((pkg) => pkg.name)
    .sort();

  console.log(JSON.stringify(dstPackages, undefined, 2));
};

getDSTOwnedPackages();
