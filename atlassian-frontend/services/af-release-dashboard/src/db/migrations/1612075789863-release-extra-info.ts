import { MigrationInterface, QueryRunner } from 'typeorm';

export class releaseExtraInfo1612075789863 implements MigrationInterface {
  name = 'releaseExtraInfo1612075789863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "release" ADD "jiraTicket" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "releasePage" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "stabilizingStatus" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "release_status_enum" AS ENUM('planned', 'development', 'stabilising', 'released-to-npm', 'adopted-by-one-product', 'adopted-by-all-products')`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "status" "release_status_enum" DEFAULT 'planned'`,
    );
    await queryRunner.query(`ALTER TABLE "release" ADD "isInJira" boolean`);
    await queryRunner.query(
      `ALTER TABLE "release" ADD "isInConfluence" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "isInBitbucket" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "startDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "dueDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "cutDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "releaseDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "plannedDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "developmentDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "stabilizingDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "releaseToNPMDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "adoptedByOneProductDate" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" ADD "adoptedByAllProductDate" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "adoptedByAllProductDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "adoptedByOneProductDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "releaseToNPMDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "stabilizingDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "developmentDate"`,
    );
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "plannedDate"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "releaseDate"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "cutDate"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "dueDate"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "startDate"`);
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "isInBitbucket"`,
    );
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "isInConfluence"`,
    );
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "isInJira"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "release_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "release" DROP COLUMN "stabilizingStatus"`,
    );
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "releasePage"`);
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "jiraTicket"`);
  }
}
