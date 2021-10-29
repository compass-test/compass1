import {
  Entity,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';
import {
  IsInt,
  IsString,
  IsISO8601,
  IsBoolean,
  validateOrReject,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export interface DeploymentHistoryEntity {
  lastSyncTimestamp: string;
  lastDeploymentCommitHash: string;
  isAutoRebase: boolean;
  lastDeploymentTimestamp: string;
  isStale: boolean;
  latestCommitHash: string;
  latestCommitTimestamp: string;
  numberOfPullRequestsBehind: number;
  confluenceBuildUrl: string;
}

const FALLBACK_TIMESTAMP = '1999-01-01T00:00:00.000Z';

@Entity('deployment_history')
export class DeploymentHistory implements DeploymentHistoryEntity {
  @CreateDateColumn({ default: FALLBACK_TIMESTAMP })
  @IsISO8601({ strict: true })
  lastSyncTimestamp: string;

  @Column()
  @IsString()
  @PrimaryColumn()
  lastDeploymentCommitHash: string;

  @Column()
  @IsBoolean()
  isAutoRebase: boolean;

  @CreateDateColumn()
  @IsISO8601({ strict: true })
  lastDeploymentTimestamp: string;

  @Column({ default: false })
  @IsBoolean()
  isStale: boolean;

  @Column({ default: '' })
  @IsString()
  latestCommitHash: string;

  @CreateDateColumn({ default: FALLBACK_TIMESTAMP })
  @IsISO8601({ strict: true })
  latestCommitTimestamp: string;

  @Column({ default: -1 })
  @IsInt()
  numberOfPullRequestsBehind: number;

  @Column({ default: 'https://' })
  @IsString()
  confluenceBuildUrl: string;

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
