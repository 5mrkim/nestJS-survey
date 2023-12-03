import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701594841960 implements MigrationInterface {
    name = 'Migration1701594841960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("survey_id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_404ab7430aef7b5ffe57e915505" PRIMARY KEY ("survey_id"))`);
        await queryRunner.query(`CREATE TABLE "choice" ("choice_id" SERIAL NOT NULL, "contents" character varying NOT NULL, "questionQuestionId" integer, CONSTRAINT "PK_ed7ae430629e85d5d905a0382c6" PRIMARY KEY ("choice_id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("question_id" SERIAL NOT NULL, "title" character varying NOT NULL, "score" integer NOT NULL, "surveySurveyId" integer, CONSTRAINT "PK_7c755ccdc03ae2b6206ff00363a" PRIMARY KEY ("question_id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("answer_id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "questionQuestionId" integer, "choiceChoiceId" integer, CONSTRAINT "PK_26e548d2b73776a764f14c2d107" PRIMARY KEY ("answer_id"))`);
        await queryRunner.query(`ALTER TABLE "choice" ADD CONSTRAINT "FK_03c8d32a1b4dec70bbf261d29c8" FOREIGN KEY ("questionQuestionId") REFERENCES "question"("question_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_3b9db4369d99f51b0594960d0cc" FOREIGN KEY ("surveySurveyId") REFERENCES "survey"("survey_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_d6b11fa94dbccb3d64d31fb36c6" FOREIGN KEY ("questionQuestionId") REFERENCES "question"("question_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_9692fa41740a993a3b3535e2432" FOREIGN KEY ("choiceChoiceId") REFERENCES "choice"("choice_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_9692fa41740a993a3b3535e2432"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_d6b11fa94dbccb3d64d31fb36c6"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_3b9db4369d99f51b0594960d0cc"`);
        await queryRunner.query(`ALTER TABLE "choice" DROP CONSTRAINT "FK_03c8d32a1b4dec70bbf261d29c8"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "choice"`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}
