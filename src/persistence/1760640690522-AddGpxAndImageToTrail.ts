import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGpxAndImageToTrail1760640690522 implements MigrationInterface {
    name = 'AddGpxAndImageToTrail1760640690522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" ADD "gpxFileUrl" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trails" DROP COLUMN "gpxFileUrl"`);
    }

}
