import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/user.enum';
@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: admin-role.guard.ts:8 ~ AdminRoleGuard ~ canActivate ~ request:',
      req?.user,
    );

    if (req?.user) {
      const { id } = req.user;
      const user = await this.userService.getUserById(id);
      return user.role === UserRoles.ADMIN;
    }

    return false;
  }
}
