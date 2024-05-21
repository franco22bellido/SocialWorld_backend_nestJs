import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likesRepository: Repository<LikeEntity>,
  ) {}

  async create(postId: number, userId: number) {
    const newLike = this.likesRepository.create({ postId, userId });
    try {
      const likeSaved = await this.likesRepository.save(newLike);
      return {
        message: 'you liked a publication!',
        likeSaved,
      };
    } catch (error) {
      return new HttpException('internal server error', 500);
    }
  }
  async getAllByUserId(userId: number) {
    return await this.likesRepository.find({ where: { userId } });
  }
  async getOneByPostId(postId: number, userId: number) {
    const likeFound = await this.likesRepository.findOne({
      where: { postId, userId },
    });
    if (likeFound) {
      return {
        message: 'you liked this post',
        state: true,
      };
    }
    return {
      message: 'you dont liked this post',
      state: false,
    };
  }
  async deleteOne(postId: number, userId: number) {
    return await this.likesRepository.delete({ postId, userId });
  }
  //inactive
  async getAllByPostId(postId: number) {
    return await this.likesRepository.find({
      where: { postId },
    });
  }
  //proximamente agregar una propiedad true o false a la entidad
  //para poder dar dislike
  // async findTheMostPopularPosts() {
  //   //limit 10
  //   return await this.likesRepository
  //     .createQueryBuilder('likes')
  //     .select('COUNT(*) AS cantidadDeLikes')
  //     .leftJoinAndSelect('likes.post', 'post')
  //     .orderBy('cantidadDeLikes', 'DESC')
  //     .take(10)
  //     .groupBy('likes.postId')
  //     .getRawMany();
  // }
}
