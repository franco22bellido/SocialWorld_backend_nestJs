import { Injectable } from '@nestjs/common/decorators';
import { DataSource, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { FollowersEntity } from 'src/followers/entities/followers.entity';
import { IPostRepository } from './post.repository.interface';

@Injectable()
export class PostRepository
  extends Repository<PostEntity>
  implements IPostRepository
{
  constructor(private readonly _dataSource: DataSource) {
    super(PostEntity, _dataSource.createEntityManager());
  }
  getPostsByUserId(userId: number) {
    throw new Error('Method not implemented.');
  }
  getTrendsOfToday(userId: number) {
    throw new Error('Method not implemented.');
  }

  async findAllByFollowings(userId: number) {
    const queryOne = this.createQueryBuilder('post')
      .leftJoin(FollowersEntity, 'followers', 'post.userId = followers.idolId')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('followers.followerId = :userId', { userId })
      .select([
        'post.id as id',
        'post.text as text',
        'post.likesCount as likesCount',
        'post.commentsCount as commentsCount',
        'user.username as username',
      ])
      .getSql();
    const queryTwo = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('post.userId = :userId', { userId })
      .orderBy('id', 'ASC')
      .select([
        'post.id as id',
        'post.text as text',
        'post.likesCount as likesCount',
        'post.commentsCount as commentsCount',
        'user.username as username',
      ])
      .getSql();
    const result = await this.query(`${queryOne} UNION ${queryTwo}`, [
      userId,
      userId,
    ]);
    return result;
  }
}
