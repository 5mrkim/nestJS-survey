// answer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Choice } from './choice.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answer_id: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => Choice, (choice) => choice.answers)
  choice: Choice;

  @Column()
  user_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
