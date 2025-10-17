import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHashToTrail1760642761065 implements MigrationInterface {
    name = 'AddHashToTrail1760642761065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" ADD "hash" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "trails" ADD CONSTRAINT "UQ_c98745ef995bef14e1f8ab9fd42" UNIQUE ("hash")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" DROP CONSTRAINT "UQ_c98745ef995bef14e1f8ab9fd42"`);
        await queryRunner.query(`ALTER TABLE "trails" DROP COLUMN "hash"`);
    }

}
