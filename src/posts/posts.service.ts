import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { FollowersEntity } from 'src/followers/entities/followers.entity';

@Injectable()
export class PostsService {
  constructor(private readonly _postRepository: PostRepository) {}

  async findOne(postId: number) {
    const postFound = await this._postRepository.findOne({
      where: { id: postId },
      relations: { user: true },
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
      if (error instanceof HttpException) {
        throw error;
      }
      throw new InternalServerErrorException('internal server error', {
        cause: error,
      });
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
    const queryOne = this._postRepository
      .createQueryBuilder('post')
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
    const queryTwo = this._postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user', 'post.userId = user.id')
      .where('post.userId = :userId', { userId })
      .orderBy('id', 'DESC')
      .select([
        'post.id as id',
        'post.text as text',
        'post.likesCount as likesCount',
        'post.commentsCount as commentsCount',
        'user.username as username',
      ])
      .getSql();
    const result = await this._postRepository.query(
      `${queryOne} UNION ${queryTwo}`,
      [userId, userId],
    );
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
