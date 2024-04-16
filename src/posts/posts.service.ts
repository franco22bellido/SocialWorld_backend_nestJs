import { Injectable } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly _postRepository: PostRepository) {}

  async findOne(postId: number) {
    return await this._postRepository.findOne({ where: { id: postId } });
  }
  async findAll() {
    return await this._postRepository.find();
  }
  async craetePost(post: CreatePostDto) {
    try {
      const newPost = this._postRepository.create({ ...post, userId: 1 });
      return await this._postRepository.save(newPost);
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(postId: number, userId: number) {
    return await this._postRepository.delete({ id: postId, userId });
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
