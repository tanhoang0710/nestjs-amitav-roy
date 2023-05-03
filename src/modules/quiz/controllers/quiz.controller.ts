import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuiz } from '../dto/CreateQuiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuiz(): Promise<[Quiz[], number]> {
    return await this.quizService.getAllQuiz();
  }

  @Get('/:id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getQuizById(id);
  }

  @Post('/create')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() quizData: CreateQuiz) {
    return await this.quizService.createNewQuiz(quizData);
  }
}
