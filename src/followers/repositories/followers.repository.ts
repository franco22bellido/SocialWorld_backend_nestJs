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
}
