import { createConnection, getConnection, getRepository } from 'typeorm';
import request from 'supertest';
import MockDate from 'mockdate';
import {
  DeploymentHistory,
  DeploymentHistoryEntity,
} from '../../../db/entities/DeploymentHistory';
import { DEPLOYMENT_GRACE_PERIOD_IN_HOURS } from '../../constants';
import app from '../../app';

import {
  mockPullRequests,
  mockCommit,
  manipulateMockedPrData,
} from './__tests__/_mocking';

describe('deployment-history', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    MockDate.reset();
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

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('post', () => {
    it('should be up to date when latest commit and deployment hash match', async () => {
      const d = new Date();
      d.setMinutes(d.getDate() - 2);
      const twoDaysAgo = d.toISOString();
      const prData = manipulateMockedPrData([
        {
          index: 0,
          timestamp: twoDaysAgo,
        },
      ]);
      const {
        merge_commit: { hash: deployedCommit },
        closed_on: deployedCommitTimestamp,
      } = prData.values[0];
      mockPullRequests(prData);
      mockCommit(deployedCommit, deployedCommitTimestamp);

      const result = await request(app).post('/api/v1/deployment').send({
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        confluenceBuildUrl: 'https://',
      });
      expect(result.status).toBe(200);
      expect(result.body.status).toEqual('success');
      expect(result.body.payload).toMatchObject({
        isStale: false,
        latestCommitHash: deployedCommit,
        latestCommitTimestamp: deployedCommitTimestamp,
        numberOfPullRequestsBehind: 0,
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        lastDeploymentTimestamp: deployedCommitTimestamp,
        lastSyncTimestamp: expect.any(String),
        confluenceBuildUrl: 'https://',
      });
    });

    it(`should be stale when the next commit after the deployed commit occured at least ${DEPLOYMENT_GRACE_PERIOD_IN_HOURS} hour ago (exceeds deployment grace period)`, async () => {
      const d = new Date();
      const now = d.toISOString();
      d.setMinutes(d.getMinutes() - 60 * DEPLOYMENT_GRACE_PERIOD_IN_HOURS);
      const gracePeriodAgo = d.toISOString();
      d.setDate(d.getDate() - 1);
      const oneDayAgo = d.toISOString();

      const prData = manipulateMockedPrData([
        {
          index: 0,
          timestamp: now,
        },
        {
          index: 1,
          timestamp: gracePeriodAgo,
        },
        {
          index: 2,
          timestamp: oneDayAgo,
        },
      ]);
      const {
        merge_commit: { hash: latestCommit },
        closed_on: latestCommitTimestamp,
      } = prData.values[0];
      const {
        merge_commit: { hash: deployedCommit },
        closed_on: deployedCommitTimestamp,
      } = prData.values[prData.values.length - 1];
      mockPullRequests(prData);
      mockCommit(deployedCommit, deployedCommitTimestamp);

      const result = await request(app).post('/api/v1/deployment').send({
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        confluenceBuildUrl: 'https://',
      });
      expect(result.status).toBe(200);
      expect(result.body.status).toEqual('success');
      expect(result.body.payload).toMatchObject({
        isStale: true,
        latestCommitHash: latestCommit,
        latestCommitTimestamp: latestCommitTimestamp,
        numberOfPullRequestsBehind: 2,
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        lastDeploymentTimestamp: deployedCommitTimestamp,
        lastSyncTimestamp: expect.any(String),
        confluenceBuildUrl: 'https://',
      });
    });

    it('should be up to date when the next commit after the deployed commit occured less than 1 hour ago (within deployment grace period)', async () => {
      const d = new Date();
      const now = d.toISOString();
      d.setMinutes(d.getMinutes() - 59);
      const justUnderAnHourAgo = d.toISOString();
      d.setDate(d.getDate() - 1);
      const oneDayAgo = d.toISOString();

      const prData = manipulateMockedPrData([
        {
          index: 0,
          timestamp: now,
        },
        {
          index: 1,
          timestamp: justUnderAnHourAgo,
        },
        {
          index: 2,
          timestamp: oneDayAgo,
        },
      ]);
      const {
        merge_commit: { hash: latestCommit },
        closed_on: latestCommitTimestamp,
      } = prData.values[0];
      const {
        merge_commit: { hash: deployedCommit },
        closed_on: deployedCommitTimestamp,
      } = prData.values[prData.values.length - 1];
      mockPullRequests(prData);
      mockCommit(deployedCommit, deployedCommitTimestamp);

      const result = await request(app).post('/api/v1/deployment').send({
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        confluenceBuildUrl: 'https://',
      });
      expect(result.status).toBe(200);
      expect(result.body.status).toEqual('success');
      expect(result.body.payload).toMatchObject({
        isStale: false,
        latestCommitHash: latestCommit,
        latestCommitTimestamp: latestCommitTimestamp,
        numberOfPullRequestsBehind: 2,
        isAutoRebase: true,
        lastDeploymentCommitHash: deployedCommit,
        lastDeploymentTimestamp: deployedCommitTimestamp,
        lastSyncTimestamp: expect.any(String),
        confluenceBuildUrl: 'https://',
      });
    });
  });

  describe('get', () => {
    it('should return the latest database row values', async () => {
      const now = new Date().toISOString();
      const payload: DeploymentHistoryEntity = {
        isStale: false,
        latestCommitHash: 'abcdef',
        latestCommitTimestamp: now,
        numberOfPullRequestsBehind: 0,
        isAutoRebase: true,
        lastDeploymentCommitHash: 'c0ffee',
        lastDeploymentTimestamp: now,
        lastSyncTimestamp: now,
        confluenceBuildUrl: 'https://',
      };

      // `insert` mutates the payload (converts date strings to date objects)
      // so we clone it for later comparison.
      const expectedResult = Object.assign({}, payload);

      await getRepository(DeploymentHistory).insert(payload);
      const result = await request(app)
        .get('/api/v1/deployment')
        .set('Accept', 'application/json');

      expect(result.status).toBe(200);
      expect(result.body.status).toEqual('success');
      expect(result.body.payload).toEqual(expectedResult);
    });
  });
});
