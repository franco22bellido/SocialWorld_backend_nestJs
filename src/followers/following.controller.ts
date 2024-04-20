import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  async getFollowing(@Req() { user }: RequestUser) {
    return await this._followersService.getIdols(user.id);
  }
  @Delete('/:followingId')
  deleteFollowing(
    @Param('followingId', ParseIntPipe) followingId: number,
    @Req() { user }: RequestUser,
  ) {
    return this._followersService.deleteIdol(user.id, followingId);
  }
}
