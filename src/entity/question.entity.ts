// question.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Survey } from './survey.entity';
import { Choice } from './choice.entity';
import { Answer } from './answer.entity';

//질문 테이블
@ObjectType()
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  question_id: number;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => Int)
  score: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  @Field(() => Survey)
  survey: Survey;

  @OneToMany(() => Choice, (choice) => choice.question)
  @Field(() => [Choice], { nullable: true }) // choices에 대한 GraphQL 타입 추가
  choices: Choice[];

  @OneToMany(() => Answer, (answer) => answer.question)
  @Field(() => [Answer], { nullable: true }) // answers에 대한 GraphQL 타입 추가
  answers: Answer[];
}
