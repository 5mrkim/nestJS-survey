// survey.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';

//설문지 테이블
@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  survey_id: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];
}
