import { MigrationInterface, QueryRunner } from 'typeorm';

export class refactorDeploymentTable1619412605243
  implements MigrationInterface {
  name = 'refactorDeploymentTable1619412605243';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "lastSyncTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '1999-01-01T00:00:00.000Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "isStale" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "latestCommitHash" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "latestCommitTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '1999-01-01T00:00:00.000Z'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "numberOfPullRequestsBehind" integer NOT NULL DEFAULT '-1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" ADD "confluenceBuildUrl" character varying NOT NULL DEFAULT 'https://'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "confluenceBuildUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "numberOfPullRequestsBehind"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "latestCommitTimestamp"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "latestCommitHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "isStale"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_history" DROP COLUMN "lastSyncTimestamp"`,
    );
  }
}
