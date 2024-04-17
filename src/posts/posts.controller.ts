import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
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
  create(@Body() post: CreatePostDto) {
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
