import { Directory, File } from './types';

// SITE_DATA is dynamically generated at runtime by bolt-fs-loader.
// Configuration for bolt-fs-loader is in webpack.config.js since it needs to be dynamically created
// depending on the subset of packages we want to represent on the website.
// @ts-ignore: Those data are populated at run-time and it is not possible to declare those file in typescript.
import data from './SITE_DATA';
// @ts-ignore: Those data are populated at run-time and it is not possible to declare those file in typescript.
import NAV_DATA from './NAV_DATA';
import * as fs from './utils/fs';

const productPackages = ['bitbucket', 'confluence', 'jira', 'trello'];

const siteData: Directory = data;
export default siteData;

const dirs = fs.getDirectories(data.children);

function isInternal(groupId: string, pkgId: string) {
  const pkgInfo = NAV_DATA?.[groupId]?.find(
    (a: { name: string }) => a.name === pkgId,
  );

  const isInternal =
    pkgInfo &&
    pkgInfo.config &&
    pkgInfo.config.atlaskit &&
    pkgInfo.config.atlaskit.internal;

  // We want deprecated packages to not appear on the site as we want to discourage
  // both their usage and findability.
  const isDeprecated =
    pkgInfo &&
    pkgInfo.config &&
    pkgInfo.config.atlassian &&
    pkgInfo.config.atlassian.website &&
    pkgInfo.config.atlassian.website.deprecated;

  return isInternal || isDeprecated;
}

const publicPackages: Directory = {
  type: 'dir',
  id: 'packages',
  children: [],
};

const packageDirs: Directory = fs.getById(dirs, 'packages');

for (const child of fs.getDirectories(packageDirs.children)) {
  const children = child.children.filter(pkg => !isInternal(child.id, pkg.id));
  if (children.length > 0) {
    publicPackages.children.push(Object.assign({}, child, { children }));
  }
}

/* If a package is related to an Atlassian products, it will appear at the bottom of the navigation */
let productsPkgs: Array<Directory | File> = [];
let non_productsPkgs: Array<Directory | File> = [];
for (let pkg of publicPackages.children) {
  if (productPackages.includes(pkg.id)) {
    productsPkgs.push(pkg);
  } else {
    non_productsPkgs.push(pkg);
  }
}

publicPackages.children = non_productsPkgs.concat(productsPkgs);

export const getConfig = (groupId: string, pkgId: string) => {
  return NAV_DATA?.[groupId]?.find(
    (pkg: { name: string }) => pkg.name === pkgId,
  );
};

export const getAllPackageVersions = () => {
  return NAV_DATA?.['ALL-PACKAGES'];
};

export const docs: () => Directory = () => {
  try {
    return fs.getById(dirs, 'build');
  } catch (err) {
    return {
      type: 'dir',
      id: 'build',
      children: [],
    };
  }
};
export const packages: () => Directory = () => fs.getById(dirs, 'packages');
export const externalPackages: () => Directory = () => publicPackages;
