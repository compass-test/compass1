import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1610497457168 implements MigrationInterface {
  name = 'Initial1610497457168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("id" character varying NOT NULL, "name" character varying NOT NULL, "package" character varying NOT NULL, "description" character varying, "team" character varying NOT NULL, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "deployment" ("id" character varying NOT NULL, "pipelineUuid" character varying NOT NULL, "env" character varying NOT NULL, "commit" character varying NOT NULL, "branch" character varying NOT NULL, "packageVersion" character varying NOT NULL, "isRollback" boolean NOT NULL, "serviceId" character varying, CONSTRAINT "PK_ee1f952fc81f37c6fea69c2e248" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service_state" ("id" character varying NOT NULL, "isLocked" boolean NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" character varying, "deploymentId" character varying, CONSTRAINT "PK_0c80a59b32c1fa57c2845f183aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "deployment_state_status_enum" AS ENUM('INPROGRESS', 'SUCCESSFUL', 'FAILED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "deployment_state" ("id" character varying NOT NULL, "status" "deployment_state_status_enum" NOT NULL, "artefactUrl" character varying, "tags" text NOT NULL, "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deploymentId" character varying, CONSTRAINT "PK_7f79c93480575129c42737c4a9b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment" ADD CONSTRAINT "FK_d2d49df09c6161c3e0536e260b9" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_state" ADD CONSTRAINT "FK_8f68c75ce84dde93b4b4cd3450b" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_state" ADD CONSTRAINT "FK_20089a0cf752d451b6c88c16f41" FOREIGN KEY ("deploymentId") REFERENCES "deployment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment_state" ADD CONSTRAINT "FK_5da9f72143e3d9a4257ec55a172" FOREIGN KEY ("deploymentId") REFERENCES "deployment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deployment_state" DROP CONSTRAINT "FK_5da9f72143e3d9a4257ec55a172"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_state" DROP CONSTRAINT "FK_20089a0cf752d451b6c88c16f41"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_state" DROP CONSTRAINT "FK_8f68c75ce84dde93b4b4cd3450b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "deployment" DROP CONSTRAINT "FK_d2d49df09c6161c3e0536e260b9"`,
    );
    await queryRunner.query(`DROP TABLE "deployment_state"`);
    await queryRunner.query(`DROP TYPE "deployment_state_status_enum"`);
    await queryRunner.query(`DROP TABLE "service_state"`);
    await queryRunner.query(`DROP TABLE "deployment"`);
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
