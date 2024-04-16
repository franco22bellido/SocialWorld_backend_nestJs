import { Injectable } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostsService {

    constructor(
        private readonly _postRepository: PostRepository
    ) {}
    
    async craetePost(post: PostEntity){
        try {
            return await this._postRepository.save(post);
        } catch (error) {
            console.log(error);
        }
    }
    async deletePost(postId: number, userId: number){
        return await this._postRepository.delete({id: postId, userId})
    }
    async updatePost(){}

    
    async findOne(postId: number){
        return await this._postRepository.findOne({where: {id: postId}});
    }

    async findTheMostsPopular(){

        return await this._postRepository
        .createQueryBuilder('post')
        // .leftJoinAndSelect('post.likes', 'cantidad_likess')
        .loadRelationCountAndMap('post.likes', 'post.likes')
        .getMany();

      
    }
    
    async findPostsOfSpecificUser(userId: number){
        return await this._postRepository.find({where: {userId}});    
    }

}