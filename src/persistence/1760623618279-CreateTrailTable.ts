import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTrailTable1760623618279 implements MigrationInterface {
    name = 'CreateTrailTable1760623618279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "distance" double precision NOT NULL, "elevationGain" integer NOT NULL, "difficulty" character varying(20) NOT NULL, "authorId" uuid NOT NULL, "imageUrl" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3f5fcb70ca142a3087a0736bbb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trails"`);
    }

}
