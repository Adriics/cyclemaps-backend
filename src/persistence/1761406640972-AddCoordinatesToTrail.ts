import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoordinatesToTrail1761406640972 implements MigrationInterface {
    name = 'AddCoordinatesToTrail1761406640972'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" ADD "coordinates" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" DROP COLUMN "coordinates"`);
    }

}
