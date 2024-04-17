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
import { RequestUser } from 'src/common/request.user';

@Controller('followers')
@UseGuards(AuthGuard)
export class FollowersController {
  constructor(private readonly _followersService: FollowersService) {}

  @Get('/')
  async getFollowers(@Req() reqUser: RequestUser) {
    return this._followersService.getFollowers(reqUser.user.id);
  }
  @Get('/idols')
  async getIdols(@Req() reqUser: RequestUser) {
    return await this._followersService.getIdols(reqUser.user.id);
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
  @Delete('/idols/:idolId')
  deleteIdol(
    @Param('idolId', ParseIntPipe) idolId: number,
    @Req() reqUser: RequestUser,
  ) {
    return this._followersService.deleteIdol(reqUser.user.id, idolId);
  }

  @Delete('/:followerId')
  deleteFollower(
    @Req() reqUser: RequestUser,
    @Param('followerId', ParseIntPipe) followerId: number,
  ) {
    return this._followersService.deleteFollower(reqUser.user.id, followerId);
  }
}
