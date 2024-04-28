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
import { AuthGuard } from '../auth/auth.guard';
import { FollowersService } from './followers.service';
import { RequestUser } from 'src/common/request.user';

@Controller('following')
@UseGuards(AuthGuard)
export class FollowingController {
  constructor(private readonly _followersService: FollowersService) {}

  @Get('/')
  async getFollowings(@Req() { user }: RequestUser) {
    return await this._followersService.getIdols(user.id);
  }

  @Get('/:followingId')
  async getFollowingById(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Req() { user }: RequestUser,
  ) {
    return await this._followersService.findOneFollowingById(
      user.id,
      followingId,
    );
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
  @Delete('/:followingId')
  deleteFollowing(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Req() { user }: RequestUser,
  ) {
    return this._followersService.deleteIdol(user.id, followingId);
  }
}
