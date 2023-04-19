import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';

export class QuestionRepository extends Repository<Question> {}
