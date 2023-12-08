// survey.entity.ts
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';

//설문지 테이블

@ObjectType()
@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  survey_id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => String) // created_at에 대한 GraphQL 타입 추가
  created_at: Date;

  @OneToMany(() => Question, (question) => question.survey)
  @Field(() => [Question], { nullable: true })
  questions: Question[];
}
