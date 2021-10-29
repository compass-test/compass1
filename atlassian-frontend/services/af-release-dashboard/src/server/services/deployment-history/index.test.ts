import deploymentHistory from './index';
import { createConnection, getConnection, getRepository } from 'typeorm';
import {
  DeploymentHistoryEntity,
  DeploymentHistory,
} from '../../../db/entities/DeploymentHistory';

function getMockedDeployment(): DeploymentHistoryEntity {
  return {
    lastSyncTimestamp: '2021-03-16T03:18:49.722696+00:00',
    lastDeploymentCommitHash: '163be6c20819',
    isAutoRebase: true,
    lastDeploymentTimestamp: '2021-03-16T03:18:49.722696+00:00',
    isStale: false,
    latestCommitHash: '163be6c20819',
    latestCommitTimestamp: '2021-03-16T03:18:49.722696+00:00',
    numberOfPullRequestsBehind: 0,
    confluenceBuildUrl: 'https://',
  };
}

describe('deployment history', () => {
  beforeEach(() => {
    return createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [DeploymentHistory],
      synchronize: true,
      logging: false,
    });
  });

  afterEach(async () => {
    let conn = getConnection();
    await conn.dropDatabase();
    return conn.close();
  });

  describe('get:', () => {
    it('should get latest deployment info when entries exist', async () => {
      const expectation = getMockedDeployment();
      await getRepository(DeploymentHistory).insert(expectation);
      const result = await deploymentHistory.get();
      expect(result).toEqual(expectation);
    });

    it('should get fallback deployment info when no entries exist', async () => {
      const result = await deploymentHistory.get();
      expect(result).toEqual({
        isStale: true,
        latestCommitHash: '',
        latestCommitTimestamp: '',
        numberOfPullRequestsBehind: -1,
        isAutoRebase: false,
        lastDeploymentCommitHash: '',
        lastDeploymentTimestamp: '',
        lastSyncTimestamp: new Date().toISOString(),
        confluenceBuildUrl: '',
      });
    });
  });

  describe('save:', () => {
    it('should retain provided deployment info', async () => {
      const expectation = getMockedDeployment();
      await deploymentHistory.save(expectation);

      const result = await deploymentHistory.get();

      // `save` converts the date strings to date objects within the database
      expect(result).toMatchObject({
        ...expectation,
        lastSyncTimestamp: new Date(expectation.lastSyncTimestamp),
        lastDeploymentTimestamp: new Date(expectation.lastDeploymentTimestamp),
        latestCommitTimestamp: new Date(expectation.latestCommitTimestamp),
      });
    });
  });
});
