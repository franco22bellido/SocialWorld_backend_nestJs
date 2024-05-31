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
  async getFollowers(username: string) {
    return await this.createQueryBuilder('followers')
      .leftJoinAndSelect(
        'followers.follower',
        'follower',
        'followers.followerId = follower.id',
      )
      .leftJoin('followers.idol', 'idol', 'followers.idolId = idol.id')
      .where('idol.username = :username', { username })
      .select([
        'followers.followerId as "id"',
        'follower.username as "username"',
        'follower.email as "email"',
      ])
      .getRawMany();
  }
  async getFollowing(username: string) {
    return await this.createQueryBuilder('followers')
      .leftJoinAndSelect('followers.idol', 'idol', 'followers.idolId = idol.id')
      .leftJoin(
        'followers.follower',
        'follower',
        'followers.followerId = follower.id',
      )
      .where('follower.username = :username', { username })
      .select([
        'idol.username as "username"',
        'idol.email as "email"',
        'followers.idolId as "id"',
      ])
      .getRawMany();
  }
}
