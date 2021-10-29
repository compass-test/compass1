import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBranchToPullRequest1615348370277 implements MigrationInterface {
  name = 'addBranchToPullRequest1615348370277';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pull_request" ADD "branch" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pull_request" DROP COLUMN "branch"`);
  }
}
