import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { followersRepository } from './repositories/followers.repository';

@Injectable()
export class FollowersService {
  constructor(private readonly _followerRepository: followersRepository) {}

  async getFollowers(username: string) {
    return await this._followerRepository.getFollowers(username);
  }
  async getIdols(username: string) {
    return await this._followerRepository.getFollowing(username);
  }
  async followUser(userId: number, userToFollow: number) {
    try {
      return await this._followerRepository.followOne(userId, userToFollow);
    } catch (error: any) {
      if (error.driverError?.code === 23503) {
        return new NotFoundException(
          'error to searching, user follow not found',
        );
      }
      return new HttpException(
        'error to follow user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
  async findOneFollowingById(userId: number, followingId: number) {
    const relationFound = await this._followerRepository.findOne({
      where: { followerId: userId, idolId: followingId },
    });
    if (!relationFound) {
      return { message: 'you dont follow this user', state: false };
    }
    return { message: 'you are following this user', state: true };
  }
}
