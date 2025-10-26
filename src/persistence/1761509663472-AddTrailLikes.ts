import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTrailLikes1761509663472 implements MigrationInterface {
    name = 'AddTrailLikes1761509663472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trail_likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "trail_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "unique_user_trail_like" UNIQUE ("user_id", "trail_id"), CONSTRAINT "PK_f85b7cc0642676080a5947508b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trail_likes" ADD CONSTRAINT "FK_df1f4038341ee9cfabbd93aaf93" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trail_likes" ADD CONSTRAINT "FK_adf29b22b476ce3c864880f8ef1" FOREIGN KEY ("trail_id") REFERENCES "trails"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trail_likes" DROP CONSTRAINT "FK_adf29b22b476ce3c864880f8ef1"`);
        await queryRunner.query(`ALTER TABLE "trail_likes" DROP CONSTRAINT "FK_df1f4038341ee9cfabbd93aaf93"`);
        await queryRunner.query(`DROP TABLE "trail_likes"`);
    }

}
