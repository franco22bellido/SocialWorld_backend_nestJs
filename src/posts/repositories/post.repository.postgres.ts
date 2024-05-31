import { DataSource, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { IPostRepository } from './post.repository.interface';
import { Injectable } from '@nestjs/common';
import { FollowersEntity } from 'src/followers/entities/followers.entity';

@Injectable()
export class PostRepositoryPostgres
  extends Repository<PostEntity>
  implements IPostRepository
{
  constructor(private readonly _dataSource: DataSource) {
    super(PostEntity, _dataSource.createEntityManager());
  }

  async findAllByFollowings(userId: number) {
    const queryOne = this.createQueryBuilder('post')
      .leftJoin(FollowersEntity, 'followers', 'post.userId = followers.idolId')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('followers.followerId = $1')
      .select([
        'post.id as id',
        'post.text as text',
        `post.createdAt as "createdAt"`,
        `post.likesCount as "likesCount"`,
        `post.commentsCount as "commentsCount"`,
        'user.username as username',
      ])
      .getSql();
    const queryTwo = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('post.userId = $1')
      .orderBy(`"createdAt"`, 'DESC')
      .select([
        'post.id as id',
        'post.text as text',
        `post.createdAt as "createdAt"`,
        `post.likesCount as "likesCount"`,
        `post.commentsCount as "commentsCount"`,
        'user.username as username',
      ])
      .getSql();
    const result = await this.query(`${queryOne} UNION ${queryTwo}`, [userId]);
    return result;
  }
}
