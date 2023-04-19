import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuiz } from '../dto/CreateQuiz.dto';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  getAllQuiz() {
    return [1, 2, 3, 'from service'];
  }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id: id,
      },
      relations: ['questions'],
    });
    // return await this.quizRepository.findOneBy({
    //   id,
    // });
  }

  async createNewQuiz(quiz: CreateQuiz) {
    return await this.quizRepository.save(quiz);
  }
}
