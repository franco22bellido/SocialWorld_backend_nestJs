import {
  Controller,
  Delete,
  Get,
  Put,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly _postService: PostsService) {}

  @Get('/')
  getAll() {
    return this._postService.findAll();
  }
  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) postId: number) {
    return this._postService.findOne(postId);
  }
  @Post('/')
  create(@Body() post) {
    return this._postService.craetePost(post);
  }
  @Delete('/:id')
  deleteOne(@Param('id', ParseIntPipe) postId: number) {
    const userId = 1;
    return this._postService.deletePost(postId, userId);
  }
  //   @Put('/:id')
  //   updateOne(
  //     @Param('id', ParseIntPipe) postId: number,
  //     @Body() post: PostEntity,
  //   ) {
  //     return this._postService.(postId, post);
  //   }
  @Get('/most-popular')
  async mostPopular() {
    return await this._postService.findTheMostsPopular();
  }
}
