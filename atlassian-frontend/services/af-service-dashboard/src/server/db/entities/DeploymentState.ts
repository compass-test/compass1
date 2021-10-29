import { Entity, Column, ManyToOne, UpdateDateColumn } from 'typeorm';

import WithUUID from './WithUUID';
import Deployment from './Deployment';

@Entity()
export default class DeploymentState extends WithUUID {
  @ManyToOne(() => Deployment)
  deployment!: Deployment;

  @Column({
    type: 'enum',
    enum: ['INPROGRESS', 'SUCCESSFUL', 'FAILED'],
  })
  status!: 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED';

  @Column({ nullable: true })
  artefactUrl?: string;

  @Column('simple-array')
  tags!: string[];

  @UpdateDateColumn()
  updatedDate!: Date;

  static getById(id: string) {
    return this.createQueryBuilder('deployment_state')
      .innerJoinAndSelect('deployment_state.deployment', 'deployment')
      .innerJoinAndSelect('deployment.service', 'service')
      .where('deployment_state.id = :id', { id })
      .getOne();
  }

  static async getByServiceIdAndEnvPagination(
    serviceId: string,
    env: string,
    take: number,
    cursor?: Date,
  ) {
    let queryBuilder = this.createQueryBuilder(
      'deployment_state',
    ).innerJoinAndSelect(
      'deployment_state.deployment',
      'deployment',
      'deployment.service = :serviceId AND deployment.env = :env',
      { serviceId, env, cursor },
    );
    if (cursor) {
      queryBuilder = queryBuilder.andWhere(
        'deployment_state.updatedDate < :cursor',
        { cursor },
      );
    }
    return queryBuilder
      .orderBy({
        'deployment_state.updatedDate': 'DESC',
      })
      .take(take)
      .getMany();
  }

  static getByDeploymentPipelineUuid(pipelineUuid: string) {
    return this.createQueryBuilder('deployment_state')
      .innerJoinAndSelect(
        'deployment_state.deployment',
        'deployment',
        'deployment.pipelineUuid = :pipelineUuid',
        { pipelineUuid },
      )
      .getOne();
  }

  static getTagsByServiceId(serviceId: string) {
    return this.createQueryBuilder('deployment_state')
      .select('deployment_state.tags')
      .innerJoin(
        'deployment_state.deployment',
        'deployment',
        'deployment.service = :serviceId',
        { serviceId },
      )
      .getMany();
  }
}
