import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1607404663147 implements MigrationInterface {
  name = 'Initial1607404663147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "release" ("name" character varying NOT NULL, CONSTRAINT "PK_c77230903be90a74ac8c895c7d4" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pull_request" ("bitbucketId" integer NOT NULL, "title" character varying NOT NULL, "author" character varying, "authorEmail" character varying, "bitbucketUrl" character varying NOT NULL, "branchName" character varying NOT NULL, "commitHash" character varying NOT NULL, "mergeDate" TIMESTAMP WITH TIME ZONE NOT NULL, "releaseName" character varying NOT NULL, CONSTRAINT "PK_0f72610a36a70505d17c48110d2" PRIMARY KEY ("bitbucketId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pull_request" ADD CONSTRAINT "FK_4eb7807530f6fad0a02fe51f1f6" FOREIGN KEY ("releaseName") REFERENCES "release"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pull_request" DROP CONSTRAINT "FK_4eb7807530f6fad0a02fe51f1f6"`,
    );
    await queryRunner.query(`DROP TABLE "pull_request"`);
    await queryRunner.query(`DROP TABLE "release"`);
  }
}
