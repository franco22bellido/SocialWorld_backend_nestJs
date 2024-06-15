import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepositoryPostgres } from './repositories/post.repository.postgres';

@Injectable()
export class PostsService {
  constructor(private readonly _postRepository: PostRepositoryPostgres) {}

  async getTrends(userId: number) {
    try {
      const posts = await this._postRepository.getTrendsOfToday(userId);
      return posts;
    } catch (error) {
      return new InternalServerErrorException(error);
    }
  }

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
  async getPostsByFollowings(userId: number, lastPostId: number) {
    return this._postRepository.findAllByFollowings(userId, lastPostId);
  }
}
