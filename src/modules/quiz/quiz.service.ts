import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuiz } from './dto/CreateQuiz.dto';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  getAllQuiz() {
    return [1, 2, 3, 'from service'];
  }

  async createNewQuiz(quiz: CreateQuiz) {
    return await this.quizRepository.save(quiz);
  }
}
