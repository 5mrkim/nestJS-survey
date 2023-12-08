import { ObjectType } from '@nestjs/graphql';
// choice.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  choice_id: number;

  @Column()
  @Field(() => String)
  contents: string;

  @ManyToOne(() => Question, (question) => question.choices)
  @Field(() => Question)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.choice)
  @Field(() => [Answer], { nullable: true })
  answers: Answer[];
}
