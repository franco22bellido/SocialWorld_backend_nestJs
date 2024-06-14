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
  async getPostsByUserId(userId: number) {
    const posts = await this.createQueryBuilder('post')
      .leftJoinAndSelect('post.likes', 'like', 'like.userId = :userId', {
        userId,
      })
      .select([
        `like.userId = ${userId} as "isLiked"`,
        'post.id as id',
        'post.text as text',
        'post.createdAt as "createdAt"',
        'post.imgUrl as "imgUrl"',
        'post.commentsCount as "commentsCount"',
        'post.likesCount as "likesCount"',
      ])
      .orderBy('post.createdAt', 'DESC')
      .where('post.userId = :userId', { userId })
      .getRawMany();

    return posts;
  }

  async getTrendsOfToday(userId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const posts = await this.createQueryBuilder('post')
      .orderBy('post.likesCount', 'DESC')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .leftJoinAndSelect('post.likes', 'like', 'like.userId = :userId', {
        userId,
      })
      .where('post."createdAt" > :today and post."createdAt" < :tomorrow', {
        today,
        tomorrow,
      })
      .select([
        `like.userId = ${userId} as "isLiked"`,
        'post.id as id',
        'post.text as text',
        'post.imgUrl as "imgUrl"',
        'post.createdAt as "createdAt"',
        'post.likesCount as "likesCount"',
        'post.commentsCount as "commentsCount"',
        'user.username as username',
      ])
      .limit(10)
      .getRawMany();
    return posts;
  }

  async findAllByFollowings(userId: number) {
    const queryOne = this.createQueryBuilder('post')
      .leftJoin(FollowersEntity, 'followers', 'post.userId = followers.idolId')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .leftJoinAndSelect('post.likes', 'like', 'like.userId = :userId', {
        userId,
      })
      .where('followers.followerId = $1')
      .select([
        `like.userId = ${userId} as "isLiked"`,
        'post.id as id',
        'post.text as text',
        'post.imgUrl as "imgUrl"',
        `post.createdAt as "createdAt"`,
        `post.likesCount as "likesCount"`,
        `post.commentsCount as "commentsCount"`,
        'user.username as username',
      ])
      .getSql();
    const queryTwo = this.createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .leftJoinAndSelect('post.likes', 'like', 'like.userId = :userId', {
        userId,
      })
      .where('post.userId = $1')
      .orderBy(`"createdAt"`, 'DESC')
      .select([
        `like.userId = ${userId} as "isLiked"`,
        'post.id as id',
        'post.text as text',
        'post.imgUrl as "imgUrl"',
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
