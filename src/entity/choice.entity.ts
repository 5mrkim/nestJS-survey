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

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  choice_id: number;

  @Column()
  contents: string;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.choice)
  answers: Answer[];
}
