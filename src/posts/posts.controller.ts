import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../common/request.user';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly _postService: PostsService) {}

  @Get('/')
  getAll(@Req() requestUser: RequestUser) {
    return this._postService.getPostsByFollowings(requestUser.user.id);
  }
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) postId: number) {
    return this._postService.findOne(postId);
  }
  @Post('/')
  create(@Body() post: CreatePostDto, @Req() reqUser: RequestUser) {
    return this._postService.craetePost(post, reqUser.user.id);
  }
  @Delete('/:id')
  deleteOne(
    @Param('id', ParseIntPipe) postId: number,
    @Req() reqUser: RequestUser,
  ) {
    return this._postService.deletePost(postId, reqUser.user.id);
  }
}

// @Get('/')
// getAll(
//   @Req() requestUser: RequestUser,
//   @Query('previousPostId', ParseIntPipe) previousPostId: number,
// ) {
//   return this._postService.getPostsByFollowings(
//     requestUser.user.id,
//     previousPostId,
//   );
// }
