import { PackageJSON } from 'bolt';

const allowList = ['@atlassian/atlassian-frontend-repo-docs'];

export const isPublicPackage = (pkg: PackageJSON): boolean =>
  allowList.includes(pkg.name) ||
  (!pkg.private &&
    (pkg.publishConfig === undefined ||
      pkg.publishConfig.registry === 'https://registry.npmjs.org/'));
