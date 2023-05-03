import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../services/quiz.service';
import { CreateQuiz } from '../dto/CreateQuiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
  }

  @Get('/:id')
  @ApiOkResponse()
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
