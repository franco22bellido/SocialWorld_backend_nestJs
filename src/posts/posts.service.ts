import { Injectable, NotFoundException } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly _postRepository: PostRepository) {}

  async findAll(userId: number) {
    return await this._postRepository.find({ where: { userId } });
  }
  async findOne(postId: number, userId: number) {
    const postFound = await this._postRepository.findOne({
      where: { id: postId, userId },
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
  /**   async updatePost() {}**/

  async findTheMostsPopular() {
    return await this._postRepository
      .createQueryBuilder('post')
      // .leftJoinAndSelect('post.likes', 'cantidad_likess')
      .loadRelationCountAndMap('post.likes', 'post.likes')
      .getMany();
  }

  async findPostsOfSpecificUser(userId: number) {
    return await this._postRepository.find({ where: { userId } });
  }
}
