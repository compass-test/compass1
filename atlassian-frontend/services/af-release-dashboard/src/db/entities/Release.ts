import {
  Entity,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
  Column,
} from 'typeorm';
import {
  validateOrReject,
  IsString,
  IsBoolean,
  IsISO8601,
  Allow,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { PullRequest, PullRequestEntity } from './PullRequest';

export enum ReleaseStatus {
  planned = 'planned',
  development = 'development',
  stabilising = 'stabilising',
  'released-to-npm' = 'released-to-npm',
  'adopted-by-one-product' = 'adopted-by-one-product',
  'adopted-by-all-products' = 'adopted-by-all-products',
}

export interface ReleaseEntity {
  name: string;
  createdDate: Date;
  status?: ReleaseStatus;
  stabilizingStatus?: string;
  releasePage?: string;
  isInConfluence?: boolean;
  isInJira?: boolean;
  isInBitbucket?: boolean;
  jiraTicket?: string;
  startDate?: Date;
  dueDate?: Date;
  cutDate?: Date;
  releaseDate?: Date;
  plannedDate?: Date;
  developmentDate?: Date;
  stabilizingDate?: Date;
  releaseToNPMDate?: Date;
  adoptedByOneProductDate?: Date;
  adoptedByAllProductDate?: Date;
  pullRequests: PullRequestEntity[];
}

@Entity()
export class Release implements ReleaseEntity {
  @PrimaryColumn()
  @IsString()
  @MinLength(1)
  name: string;

  @Column({ nullable: true })
  @IsString()
  @MinLength(1)
  jiraTicket: string;

  @Column({ nullable: true })
  @IsString()
  @MinLength(1)
  releasePage: string;

  @Column({ nullable: true })
  @IsString()
  @MinLength(1)
  stabilizingStatus: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ReleaseStatus,
    default: ReleaseStatus.planned,
  })
  @IsString()
  @MinLength(1)
  status: ReleaseStatus;

  @Column({ nullable: true })
  @IsBoolean()
  isInJira: boolean;

  @Column({ nullable: true })
  @IsBoolean()
  isInConfluence: boolean;

  @Column({ nullable: true })
  @IsBoolean()
  isInBitbucket: boolean;

  @Column({ type: 'timestamptz' })
  @IsISO8601({ strict: true })
  createdDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  startDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  dueDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  cutDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  releaseDate: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  plannedDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  developmentDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  stabilizingDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  releaseToNPMDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  adoptedByOneProductDate?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  @IsISO8601({ strict: true })
  adoptedByAllProductDate?: Date;

  @Allow()
  @OneToMany('PullRequest', 'release', {
    cascade: true,
  })
  pullRequests: PullRequest[];

  @BeforeInsert()
  @BeforeUpdate()
  @Exclude()
  async validateInsert() {
    await validateOrReject(this, {
      forbidUnknownValues: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  }
}
