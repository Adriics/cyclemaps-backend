import { MigrationInterface, QueryRunner } from "typeorm";

export class MakePasswordNullable1762364985465 implements MigrationInterface {
    name = 'MakePasswordNullable1762364985465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
    }

}
