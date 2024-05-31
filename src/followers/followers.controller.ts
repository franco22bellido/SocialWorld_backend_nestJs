import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../common/request.user';

@Controller('followers')
@UseGuards(AuthGuard)
export class FollowersController {
  constructor(private readonly _followersService: FollowersService) {}

  @Get('/:username')
  async getFollowers(@Param('username') username: string) {
    return this._followersService.getFollowers(username);
  }

  @Delete('/:followerId')
  deleteFollower(
    @Req() reqUser: RequestUser,
    @Param('followerId', ParseIntPipe) followerId: number,
  ) {
    return this._followersService.deleteFollower(reqUser.user.id, followerId);
  }
}
