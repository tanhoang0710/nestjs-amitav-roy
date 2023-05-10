import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuiz } from '../dto/CreateQuiz.dto';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { OnEvent } from '@nestjs/event-emitter';
import { events } from '../../../common/constants/event.constants';
import { ResponseAddEvent } from '../events/response-add.event';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}

  async getAllQuiz(): Promise<[Quiz[], number]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      // .skip(1)
      // .take(1)
      .getManyAndCount();
  }

  async getQuizById(id: number): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id: id,
      },
      relations: ['questions', 'questions.options'],
    });
    // return await this.quizRepository.findOneBy({
    //   id,
    // });
  }

  async createNewQuiz(quiz: CreateQuiz) {
    return await this.quizRepository.save(quiz);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const qb = this.quizRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<Quiz>(qb, options);
  }

  @OnEvent(events.RESPONSE_SUBMITTED)
  checkQuizComleted(payload: ResponseAddEvent) {
    console.log('checkQuizComleted', payload);
  }
}
