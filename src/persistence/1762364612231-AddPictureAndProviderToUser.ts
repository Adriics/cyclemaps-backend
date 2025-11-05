import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPictureAndProviderToUser1762364612231
  implements MigrationInterface
{
  name = "AddPictureAndProviderToUser1762364612231"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "picture" character varying`
    )
    await queryRunner.query(
      `ALTER TABLE "user" ADD "provider" character varying DEFAULT 'local'`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`)
  }
}
