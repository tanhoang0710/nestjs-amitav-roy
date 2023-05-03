import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { SETTINGS } from 'src/app.utils';
import { User } from './user.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Create user object as response',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register. Try again!',
  })
  async doUserRegistation(
    @Body(SETTINGS.VALIDATION_PIPE)
    userRegister: UserRegisterRequestDto,
  ): Promise<User> {
    return await this.userService.doUserRegistation(userRegister);
  }
}
