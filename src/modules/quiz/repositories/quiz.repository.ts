import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

export class QuizRepository extends Repository<Quiz> {}
