import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
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

  @Get('/')
  async getFollowers(@Req() reqUser: RequestUser) {
    return this._followersService.getFollowers(reqUser.user.id);
  }
  @Post('/:usertofollow')
  async followOne(
    @Req() reqUser: RequestUser,
    @Param('usertofollow', ParseIntPipe) userToFollow: number,
  ) {
    return await this._followersService.followUser(
      reqUser.user.id,
      userToFollow,
    );
  }

  @Delete('/:followerId')
  deleteFollower(
    @Req() reqUser: RequestUser,
    @Param('followerId', ParseIntPipe) followerId: number,
  ) {
    return this._followersService.deleteFollower(reqUser.user.id, followerId);
  }
}
