import {
  IntegratorPipelineHistory,
  IntegratorPipelineHistoryEntity,
} from '../../../db/entities/IntegratorPipelineHistory';
import { getRepository } from 'typeorm';

export class IntegratorHistoryService {
  async save(entity: IntegratorPipelineHistoryEntity) {
    const savedEntities = await getRepository(IntegratorPipelineHistory).save(
      entity,
    );
    return savedEntities;
  }

  getLastPipeline(status: string) {
    return getRepository(IntegratorPipelineHistory)
      .createQueryBuilder('integrator_pipeline_history')
      .where({ status })
      .orderBy('integrator_pipeline_history.pipelineTimestamp', 'DESC')
      .getOne();
  }
}

const integratoryHistoryService = new IntegratorHistoryService();

export default integratoryHistoryService;
