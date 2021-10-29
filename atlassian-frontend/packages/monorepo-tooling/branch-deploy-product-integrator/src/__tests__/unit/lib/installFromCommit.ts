import {
  filteredPackagesPerProduct,
  getRealPackageName,
  getNpmPackageInstallLine,
} from '../../../lib/installFromCommit';

const pkgsInstalledInConfluence = [
  '@atlaskit/avatar',
  '@atlaskit/avatar-group',
  '@atlaskit/badge',
  '@atlaskit/banner',
  '@atlaskit/blanket',
  '@atlaskit/breadcrumbs',
  '@atlaskit/button',
];

const pkgsInstalledInJira = [
  '@atlaskit/avatar-group',
  '@atlaskit/badge',
  '@atlaskit/drawer',
  '@atlaskit/editor-core',
];

const changedPackages1 = ['@atlaskit/button'];
const changedPackages2 = [
  '@atlaskit/button',
  '@atlaskit/badge',
  '@atlaskit/drawer',
];

const soxPkg = '@atlassiansox/test';

describe('InstallFromCommit', () => {
  describe('Confluence', () => {
    const changedPackagesConfluence = filteredPackagesPerProduct(
      changedPackages1,
      pkgsInstalledInConfluence,
    );
    const changedPackagesEmptyConfluence = filteredPackagesPerProduct(
      [soxPkg],
      pkgsInstalledInConfluence,
    );
    test('should only install packages that exist in the Confluence repo', () => {
      expect(changedPackagesConfluence[0]).toBe('@atlaskit/button');
    });
    test('should install only one package in Confluence', async () => {
      expect(changedPackagesConfluence).toHaveLength(1);
    });
    test('should not install packages if they do no exist in Confluence', async () => {
      expect(changedPackagesEmptyConfluence).toHaveLength(0);
    });
  });
  describe('Jira', () => {
    const changedPackagesJira = filteredPackagesPerProduct(
      changedPackages2,
      pkgsInstalledInJira,
    );

    const changedPackagesEmptyJira = filteredPackagesPerProduct(
      [soxPkg],
      pkgsInstalledInJira,
    );
    test('should only install packages that exist in the Jira repo', () => {
      expect(changedPackagesJira[0]).toBe('@atlaskit/badge');
      expect(changedPackagesJira[1]).toBe('@atlaskit/drawer');
    });

    test('should install only 2 packages in Jira', async () => {
      expect(changedPackagesJira).toHaveLength(2);
    });
    test('should not install packages if they do no exist in product', async () => {
      expect(changedPackagesEmptyJira).toHaveLength(0);
    });
  });

  test('should get the proper package name if sox', async () => {
    expect(getRealPackageName(soxPkg)).toBe('@atlassian/not-sox-test');
  });
  test('should install the packages with commit version alpha-abcdefgh', async () => {
    expect(
      getNpmPackageInstallLine(changedPackages1[0], 'alpha-abcdefgh'),
    ).toBe('@atlaskit/button@alpha-abcdefgh');
  });
});
