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
import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestUser } from 'src/common/request.user';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private readonly _likesService: LikesService) {}

  @Post('/:postId')
  createLike(
    @Req() reqUser: RequestUser,
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this._likesService.create(postId, reqUser.user.id);
  }
  @Get('/')
  getAllLikes(@Req() reqUser: RequestUser) {
    return this._likesService.getAll(reqUser.user.id);
  }
  @Delete('/:postId')
  deleteOneLike(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() { user }: RequestUser,
  ) {
    return this._likesService.deleteOne(postId, user.id);
  }

  @Get('/:postId')
  getOneByPostId(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() { user }: RequestUser,
  ) {
    return this._likesService.getOneByPostId(postId, user.id);
  }
}
