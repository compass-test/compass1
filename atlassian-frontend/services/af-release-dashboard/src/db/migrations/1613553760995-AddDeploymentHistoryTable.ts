import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeploymentHistoryTable1613553760995
  implements MigrationInterface {
  name = 'AddDeploymentHistoryTable1613553760995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "deployment_history" ("lastDeploymentCommitHash" character varying NOT NULL, "isAutoRebase" boolean NOT NULL, "lastDeploymentTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e69470c75304542ed438e4a0351" PRIMARY KEY ("lastDeploymentCommitHash"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "deployment_history"`);
  }
}
