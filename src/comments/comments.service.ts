import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {  
    constructor(
        private readonly _commentsRepository : CommentsRepository,
    ){}

    async createComment(userId: number,postId: number, text: string): Promise<CommentEntity>{
        //validar si post existe.
        
        return await this._commentsRepository.save({userId, postId, text});

    }

    async updateComment(commentId: number, newText: string, userId: number): Promise<{}>{
        //validar si existe post
        return await this._commentsRepository.update({id:commentId, userId}, {text: newText});
    }

    async deleteComment(userId: number, commentId:number){
        return await this._commentsRepository.delete({id: commentId, userId});
    }
    async findAllByPostId(postId: number){
        return await this._commentsRepository.findByPostId(postId);
    }
}