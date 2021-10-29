import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCreatedDateFieldToRelease1608256298282
  implements MigrationInterface {
  name = 'addCreatedDateFieldToRelease1608256298282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "release" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "release" DROP COLUMN "createdDate"`);
  }
}
