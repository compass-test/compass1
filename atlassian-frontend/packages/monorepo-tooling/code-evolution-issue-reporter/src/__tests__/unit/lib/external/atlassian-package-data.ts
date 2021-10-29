import { DefaultAtlassianPackageData } from '../../../../lib/external/atlassian-package-data';

jest.mock('pkg-up', () => {
  return {
    __esModule: true,
    default: ({ cwd }: { cwd: string }) =>
      cwd === 'some/path'
        ? require.resolve('../__fixtures__/package.json')
        : null,
  };
});

describe('atlassian-package-data', () => {
  let packageData: DefaultAtlassianPackageData;
  beforeAll(() => {
    packageData = new DefaultAtlassianPackageData(
      require.resolve('../__fixtures__/teams.json'),
    );
  });

  describe('getAssigneeForPath', () => {
    it('should return the correct assigne for a path', async () => {
      expect(await packageData.getAssigneeForPath('some/path')).toEqual('foo');
    });

    it('should throw an error if no package was found', async () => {
      await expect(
        packageData.getAssigneeForPath('some/other/path'),
      ).rejects.toThrow('No package path found for file some/other/path');
    });

    it('should throw an error if no team.json was found', async () => {
      const packageData = new DefaultAtlassianPackageData('/no/where');
      // documenting the status quo - might be better ways to handle this
      await expect(packageData.getAssigneeForPath('some/path')).rejects.toThrow(
        `ENOENT: no such file or directory, access '/no/where'`,
      );
    });
  });

  describe('getPackageDataForPath', () => {
    it('should return the correct assigne for a path', async () => {
      expect(await packageData.getPackageDataForPath('some/path')).toEqual({
        name: 'mock-package',
        team: 'Test Team',
      });
    });

    it('should throw an error if no package was found', async () => {
      await expect(
        packageData.getPackageDataForPath('some/other/path'),
      ).rejects.toThrow('No package path found for file some/other/path');
    });
  });
});
