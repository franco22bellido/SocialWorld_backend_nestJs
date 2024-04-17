import {
  Controller,
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
  getAll(@Req() reqUser: RequestUser) {
    return this._likesService.getAll(reqUser.user.id);
  }

  //   @Get('/')
  //   getMostPopular() {
  //     return this._likesService.findTheMostPopularPosts();
  //   }
}
