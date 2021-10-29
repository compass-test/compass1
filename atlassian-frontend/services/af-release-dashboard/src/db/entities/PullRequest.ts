import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import {
  IsInt,
  IsEmail,
  IsString,
  IsISO8601,
  IsUrl,
  validateOrReject,
  IsOptional,
  Allow,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { Release } from './Release';

export type PullRequestUserInputs = Omit<PullRequest, 'release' | 'validate'>;

export interface PullRequestEntity {
  branch: string;
  bitbucketId: number;
  title: string;
  author?: string;
  authorEmail?: string;
  bitbucketUrl: string;
  commitHash: string;
  mergeDate: string;
}

@Entity()
export class PullRequest implements PullRequestEntity {
  @Column({ nullable: true })
  @IsString()
  branch: string;

  @PrimaryColumn()
  @IsInt()
  bitbucketId: number;

  @Column()
  @IsString()
  title: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  author: string;

  @Column({ nullable: true })
  @IsEmail()
  @IsOptional()
  authorEmail: string;

  @Column()
  @IsUrl()
  bitbucketUrl: string;

  @Column()
  @IsString()
  commitHash: string;

  @Column({ type: 'timestamptz' })
  @IsISO8601({ strict: true })
  mergeDate: string;

  @Allow()
  @ManyToOne('Release', 'pullRequests', {
    nullable: false,
  })
  release: Release;

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
