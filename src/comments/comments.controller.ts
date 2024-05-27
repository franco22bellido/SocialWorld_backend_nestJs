import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateCommentDto } from './dto/comment.dto';
import { RequestUser } from '../common/request.user';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly _commentsService: CommentsService) {}

  @Get('/:postId')
  findAllByPost(@Param('postId', ParseIntPipe) postId: number) {
    return this._commentsService.findAllByPostId(postId);
  }
  @Post('/:postId')
  createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() commentDto: CreateCommentDto,
    @Req() reqUser: RequestUser,
  ) {
    return this._commentsService.createComment(
      reqUser.user.id,
      postId,
      commentDto.text,
    );
  }
  @Put('/:commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() commentDto: CreateCommentDto,
    @Req() reqUser: RequestUser,
  ) {
    return this._commentsService.updateComment(
      commentId,
      commentDto.text,
      reqUser.user.id,
    );
  }
  @Delete('/:commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Req() reqUser: RequestUser,
  ) {
    return this._commentsService.deleteComment(reqUser.user.id, commentId);
  }
}
