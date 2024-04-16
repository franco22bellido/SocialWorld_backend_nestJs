import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {


    constructor(
        private readonly _commentsService: CommentsService
    ){}

    @Get('/:postId')
    findAllByPost(@Param('postId', ParseIntPipe) postId: number){
        return this._commentsService.findAllByPostId(postId);
    }
    @Post('/:postId')
    createComment(@Param('postId', ParseIntPipe) postId: number, 
        @Body('text') text: string ){
        const userId: number = 1;
        return this._commentsService.createComment(postId, userId, text);
    }
    @Put('/:commentId')
    updateComment(@Param('commentId', ParseIntPipe) commentId: number, 
        @Body('text') text: string ){
        const userId: number = 1;
       return this._commentsService.updateComment(commentId, text, userId);
    }
    @Delete('/:commentId')
    deleteComment(@Param('commentId' , ParseIntPipe) commentId: number){
        const userId: number =1;
        return this._commentsService.deleteComment(userId ,commentId);
    }

    
}