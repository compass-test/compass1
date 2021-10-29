import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeBranchNameField1607923890759 implements MigrationInterface {
  name = 'removeBranchNameField1607923890759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pull_request" DROP COLUMN "branchName"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pull_request" ADD "branchName" character varying NOT NULL`,
    );
  }
}
