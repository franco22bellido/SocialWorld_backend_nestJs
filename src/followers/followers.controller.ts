import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('followers')
@UseGuards(AuthGuard)
export class FollowersController {
  constructor(private readonly _followersService: FollowersService) {}

  @Get('/followers/:userId')
  async getFollowers(@Param('userId', ParseIntPipe) userId: number) {
    return this._followersService.getFollowers(userId);
  }
  @Get('/idols/:userId')
  async getIdols(@Param('userId', ParseIntPipe) userId: number) {
    return await this._followersService.getIdols(userId);
  }
  @Post('/follow-one/:userToFollow')
  async followOne(@Param('userToFollow', ParseIntPipe) userToFollow: number) {
    return await this._followersService.followUser(1, userToFollow);
  }
}
