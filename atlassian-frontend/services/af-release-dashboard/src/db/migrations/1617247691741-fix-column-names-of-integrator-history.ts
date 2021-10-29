import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixColumnNamesOfIntegratorHistory1617247691741
  implements MigrationInterface {
  name = 'fixColumnNamesOfIntegratorHistory1617247691741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP CONSTRAINT "PK_70c99b8aff5b4b0e6e6a5344230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "pipelineId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "lastDeploymentTimestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "buildNumber" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD CONSTRAINT "PK_5131af5033ae275191bb0f15689" PRIMARY KEY ("buildNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "pipelineTimestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "pipelineTimestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP CONSTRAINT "PK_5131af5033ae275191bb0f15689"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "buildNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "lastDeploymentTimestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "pipelineId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD CONSTRAINT "PK_70c99b8aff5b4b0e6e6a5344230" PRIMARY KEY ("pipelineId")`,
    );
  }
}
