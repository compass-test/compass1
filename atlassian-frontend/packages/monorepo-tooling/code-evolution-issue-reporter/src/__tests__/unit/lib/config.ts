import { Config } from '../../../lib/config';

jest.mock('../../../../src/lib/util/repository', () => {
  const path = require('path');
  return {
    __esModule: true,
    getRepositoryRoot: () =>
      path.dirname(require.resolve('./__fixtures__/issue-reporter.config.js')),
  };
});

describe('Config', () => {
  describe('Config.loadFromRepository', () => {
    it('should try to load the config from the repository root', async () => {
      const config = await Config.loadFromRepository();
      expect(config).toBeTruthy();
      expect(config.getHost()).toEqual('https://example.com/');
    });
  });

  describe('Config.loadFromPath', () => {
    it('should try to load the config from the repository root', async () => {
      const config = await Config.loadFromPath(
        require.resolve('./__fixtures__/issue-reporter.config.js'),
      );
      expect(config).toBeTruthy();
      expect(config.getHost()).toEqual('https://example.com/');
    });

    it('should fail if no config can be found at the provided path', async () => {
      await expect(Config.loadFromPath('some/bogus/path')).rejects.toThrow();
    });
  });
});
