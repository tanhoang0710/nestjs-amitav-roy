import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './question.entity';

@Module({
  controllers: [QuizController, QuestionController],
  imports: [TypeOrmModule.forFeature([Quiz, Question])],
  providers: [QuizService, QuestionService],
})
export class QuizModule {}
