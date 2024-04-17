import { Injectable } from '@nestjs/common';
import { followersRepository } from './repositories/followers.repository';

@Injectable()
export class FollowersService {
  constructor(private readonly _followerRepository: followersRepository) {}

  async getFollowers(userId: number) {
    return await this._followerRepository.find({
      where: { idolId: userId },
      relations: { follower: true },
    });
  }
  async getIdols(userId: number) {
    return await this._followerRepository.find({
      where: { followerId: userId },
      relations: { idol: true },
    });
  }
  async followUser(userId: number, userToFollow: number) {
    return await this._followerRepository.followOne(userId, userToFollow);
  }
  async deleteIdol(userId: number, idolId: number) {
    return await this._followerRepository.delete({
      followerId: userId,
      idolId,
    });
  }

  async deleteFollower(userId: number, followerId: number) {
    return await this._followerRepository.delete({
      idolId: userId,
      followerId,
    });
  }
}
