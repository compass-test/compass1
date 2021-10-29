import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixDatetimeType1617238929942 implements MigrationInterface {
  name = 'fixDatetimeType1617238929942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "lastDeploymentTimestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "lastDeploymentTimestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "lastDeploymentTimestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "lastDeploymentTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }
}
