import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIntegratorPipelineHistoryTable1617160750365
  implements MigrationInterface {
  name = 'addIntegratorPipelineHistoryTable1617160750365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "integrator_pipeline_history" ("pipelineId" character varying NOT NULL, "status" character varying NOT NULL, "url" character varying NOT NULL, "lastDeploymentTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_70c99b8aff5b4b0e6e6a5344230" PRIMARY KEY ("pipelineId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "integrator_pipeline_history"`);
  }
}
