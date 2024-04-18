import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestUser } from 'src/common/request.user';
import { FindUsersDto } from './dto/find-users.dto';
import { UserDeleteDto } from './dto/delete-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/')
  async getUsers(@Body() { username }: FindUsersDto) {
    return this._userService.findOneByUsernameOrSimilar(username);
  }
  @Get('/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this._userService.findByUsername(username);
  }
  @Delete('/')
  async deleteUser(
    @Body() { password }: UserDeleteDto,
    @Req() { user }: RequestUser,
  ) {
    return this._userService.deleteOne(user.username, password);
  }
}
