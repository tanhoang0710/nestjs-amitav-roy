import { Module } from '@nestjs/common';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { UserModule } from '../user/user.module';
import { ResponseController } from './controllers/response.controller';
import { ResponseService } from './services/response.service';

@Module({
  controllers: [
    QuizController,
    QuestionController,
    OptionController,
    ResponseController,
  ],
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option]), UserModule],
  providers: [QuizService, QuestionService, OptionService, ResponseService],
})
export class QuizModule {}
