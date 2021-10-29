import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsString, IsISO8601, validateOrReject } from 'class-validator';
import { Exclude } from 'class-transformer';

export interface IntegratorPipelineHistoryEntity {
  buildNumber: string;
  status: string;
  pipelineTimestamp: string;
}

@Entity('integrator_pipeline_history')
export class IntegratorPipelineHistory
  implements IntegratorPipelineHistoryEntity {
  @Column()
  @IsString()
  @PrimaryColumn()
  buildNumber: string;

  @Column()
  status: string;

  @CreateDateColumn()
  @IsISO8601({ strict: true })
  pipelineTimestamp: string;

  @BeforeInsert()
  @BeforeUpdate()
  @Exclude()
  async validate() {
    await validateOrReject(this, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }
}
