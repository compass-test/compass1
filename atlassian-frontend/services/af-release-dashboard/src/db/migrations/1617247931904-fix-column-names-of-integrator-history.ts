import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixColumnNamesOfIntegratorHistory1617247931904
  implements MigrationInterface {
  name = 'fixColumnNamesOfIntegratorHistory1617247931904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" DROP COLUMN "url"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "integrator_pipeline_history" ADD "url" character varying NOT NULL`,
    );
  }
}
