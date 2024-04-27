import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsRepository extends Repository<CommentEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(CommentEntity, _dataSource.createEntityManager());
  }

  async findByPostId(postId: number): Promise<CommentEntity[]> {
    return await this.find({ where: { postId }, relations: { user: true } });
  }
}
