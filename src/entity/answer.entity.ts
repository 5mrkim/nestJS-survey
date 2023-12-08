// answer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Choice } from './choice.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // ObjectType 데코레이터 추가
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  answer_id: number;

  @ManyToOne(() => Question, (question) => question.answers)
  @Field(() => Question) // question에 대한 GraphQL 타입 추가
  question: Question;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  @Field(() => Choice) // choice에 대한 GraphQL 타입 추가
  choice: Choice;

  @Column()
  @Field(() => String)
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => String) // created_at에 대한 GraphQL 타입 추가
  created_at: Date;
}
