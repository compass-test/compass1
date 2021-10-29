import express from 'express';
import { STATUS } from '../../../server/constants';
import integratoryHistoryService from '../../services/integrator-history';
import { IntegratorPipelineHistoryEntity } from '../../../db/entities/IntegratorPipelineHistory';

const router = express.Router();

router.post('/integrator-history', async (request, response, next) => {
  try {
    const integratorHistory = request.body;
    const savedintegratorHistory = await integratoryHistoryService.save(
      integratorHistory,
    );
    return response.status(200).json({
      status: STATUS.SUCCESS,
      payload: savedintegratorHistory,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/integrator-history', async (request, response, next) => {
  const lastSuccess = await integratoryHistoryService.getLastPipeline(
    'SUCCESS',
  );
  const lastFailure = await integratoryHistoryService.getLastPipeline('FAILED');
  return response.status(200).json({ lastSuccess, lastFailure });
});

export type IntegratorHistoryGet = {
  lastSuccess?: IntegratorPipelineHistoryEntity;
  lastFailure?: IntegratorPipelineHistoryEntity;
};

export default router;
