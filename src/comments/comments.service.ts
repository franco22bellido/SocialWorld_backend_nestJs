import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly _commentsRepository: CommentsRepository) {}

  async createComment(userId: number, postId: number, text: string) {
    console.log(userId, postId, text);
    return await this._commentsRepository.save({ userId, postId, text });
  }

  async updateComment(id: number, text: string, userId: number) {
    const commentFound = await this._commentsRepository.findOne({
      where: { id, userId },
    });
    if (!commentFound)
      throw new NotFoundException('comment not found in your comment list');
    commentFound.text = text;
    return await this._commentsRepository.save(commentFound);
  }

  async deleteComment(userId: number, commentId: number) {
    return await this._commentsRepository.delete({ id: commentId, userId });
  }
  async findAllByPostId(postId: number) {
    return await this._commentsRepository.findByPostId(postId);
  }
}
