import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FollowersEntity } from '../entities/followers.entity';

@Injectable()
export class followersRepository extends Repository<FollowersEntity> {
  constructor(private readonly _dataSource: DataSource) {
    super(FollowersEntity, _dataSource.createEntityManager());
  }

  async followOne(userId: number, userToFollow: number) {
    const newFollower = this.create({
      followerId: userId,
      idolId: userToFollow,
    });
    const followerSaved = await this.save(newFollower);
    return followerSaved;
  }
  async getFollowers(userId: number) {
    return await this.createQueryBuilder('followers')
      .leftJoin('followers.idol', 'idol', 'followers.followerId = :userId', {
        userId,
      })
      .where('followers.followerId = :userId', { userId })
      .select([
        'followers.idolId as "id"',
        `idol.username as "username"`,
        `idol.email as "email"`,
      ])
      .getRawMany();
  }
  async getFollowing(userId: number) {
    return await this.createQueryBuilder('followers')
      .leftJoin(
        'followers.follower',
        'follower',
        'followers.idolId = :userId',
        { userId },
      )
      .where('followers.idolId = :userId', { userId })
      .select([
        'followers.followerId as "id"',
        `follower.username as "username"`,
        `follower.email as "email"`,
      ])
      .getRawMany();
  }
}
