import { createConnection, getConnection, getRepository } from 'typeorm';
import { IntegratorPipelineHistory } from '../../../db/entities/IntegratorPipelineHistory';
import request from 'supertest';
import app from '../../app';

describe('integrator-history', () => {
  beforeEach(() => {
    return createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [IntegratorPipelineHistory],
      synchronize: true,
      logging: false,
    });
  });
  afterEach(async () => {
    let conn = getConnection();
    await conn.dropDatabase();
    return conn.close();
  });

  describe('post', () => {
    it('should insert integrator-history item into database', async () => {
      const integratorHistoryServiceEntity = {
        buildNumber: '123',
        status: 'SUCCESS',
        pipelineTimestamp: '2021-04-01T02:55:00.000Z',
      };

      await request(app)
        .post('/api/v1/integrator-history')
        .send(integratorHistoryServiceEntity)
        .expect(200, {
          status: 'success',
          payload: integratorHistoryServiceEntity,
        });

      const [results, count] = await getRepository(
        IntegratorPipelineHistory,
      ).findAndCount();
      expect(count).toBe(1);
      expect(JSON.stringify(results[0])).toBe(
        JSON.stringify(integratorHistoryServiceEntity),
      );
    });

    it('should return 500 if item is invalid', async () => {
      const integratorHistoryServiceEntity = {
        test: 'incorrect-object',
      };

      await request(app)
        .post('/api/v1/integrator-history')
        .send(integratorHistoryServiceEntity)
        .expect(500);
      const [, count] = await getRepository(
        IntegratorPipelineHistory,
      ).findAndCount();
      expect(count).toBe(0);
    });
  });
  describe('get', () => {
    it('should return last successful integrator pipeline', async () => {
      const pipelineHistory = [
        {
          buildNumber: 'incorrect-success',
          pipelineTimestamp: '2021-01-01T00:00:00.000Z',
          status: 'SUCCESS',
        },
        {
          buildNumber: 'correct-success',
          pipelineTimestamp: '2021-01-04T00:00:00.000Z',
          status: 'SUCCESS',
        },
        {
          buildNumber: 'failed',
          pipelineTimestamp: '2021-01-08T00:00:00.000Z',
          status: 'FAILED',
        },
      ];

      await getRepository(IntegratorPipelineHistory).insert(pipelineHistory);

      const result = await request(app)
        .get('/api/v1/integrator-history')
        .set('Accept', 'application/json');

      expect(result.status).toBe(200);
      expect(result.body.lastSuccess).toEqual({
        buildNumber: 'correct-success',
        pipelineTimestamp: '2021-01-04T00:00:00.000Z',
        status: 'SUCCESS',
      });
    });
    it('should return last failed integrator pipeline', async () => {
      const pipelineHistory = [
        {
          buildNumber: 'incorrect-failed',
          pipelineTimestamp: '2021-01-01T00:00:00.000Z',
          status: 'FAILED',
        },
        {
          buildNumber: 'correct-failed',
          pipelineTimestamp: '2021-01-04T00:00:00.000Z',
          status: 'FAILED',
        },
        {
          buildNumber: 'success',
          pipelineTimestamp: '2021-01-08T00:00:00.000Z',
          status: 'SUCCESS',
        },
      ];

      await getRepository(IntegratorPipelineHistory).insert(pipelineHistory);

      const result = await request(app)
        .get('/api/v1/integrator-history')
        .set('Accept', 'application/json');

      expect(result.status).toBe(200);
      expect(result.body.lastFailure).toEqual({
        buildNumber: 'correct-failed',
        pipelineTimestamp: '2021-01-04T00:00:00.000Z',
        status: 'FAILED',
      });
    });
    it('should return undefined when pipeline does not exist', async () => {
      const result = await request(app)
        .get('/api/v1/integrator-history')
        .set('Accept', 'application/json');

      expect(result.status).toBe(200);
      expect(result.body.lastFailure).toBeUndefined();
      expect(result.body.lastSuccess).toBeUndefined();
    });
  });
});
