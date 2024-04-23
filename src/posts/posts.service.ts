import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { FollowersEntity } from 'src/followers/entities/followers.entity';

@Injectable()
export class PostsService {
  constructor(private readonly _postRepository: PostRepository) {}

  async findOne(postId: number) {
    const postFound = await this._postRepository.findOne({
      where: { id: postId },
    });
    if (!postFound) {
      throw new NotFoundException('post not found');
    }
    return postFound;
  }
  async craetePost(post: CreatePostDto, userId: number) {
    try {
      const newPost = this._postRepository.create({ ...post, userId });
      return await this._postRepository.save(newPost);
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(id: number, userId: number) {
    const postFound = await this._postRepository.findOne({
      where: { id, userId },
    });
    if (!postFound) {
      throw new NotFoundException('post not found');
    }
    const { affected } = await this._postRepository.delete({
      id,
      userId,
    });
    return {
      message: 'post deleted',
      affected,
      postDeleted: postFound,
    };
  }
  async getPostsByFollowings(userId: number) {
    const result = await this._postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect(
        FollowersEntity,
        'followers',
        'post.userId = followers.idolId',
      )
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('followers.followerId = :userId', { userId })
      .select(['post.id', 'post.text', 'user.username'])
      .getMany();
    return result;
  }
  /**   async updatePost() {}**/

  // async findTheMostsPopular() {
  //   return await this._postRepository
  //     .createQueryBuilder('post')
  //     // .leftJoinAndSelect('post.likes', 'cantidad_likess')
  //     .loadRelationCountAndMap('post.likes', 'post.likes')
  //     .getMany();
  // }
}
