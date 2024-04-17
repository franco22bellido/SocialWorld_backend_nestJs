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
  async getAll(userId: number) {
    return await this.likesRepository.find({ where: { userId } });
  }
  //   deleteOne() {}
  //   getOne() {}

  //getCountLikesOfOnePost
  //proximamente agregar una propiedad true o false a la entidad
  //para poder dar dislike
  async findTheMostPopularPosts() {
    //limit 10
    return await this.likesRepository
      .createQueryBuilder('likes')
      .select('COUNT(*) AS cantidadDeLikes')
      .leftJoinAndSelect('likes.post', 'post')
      .orderBy('cantidadDeLikes', 'DESC')
      .take(10)
      .groupBy('likes.postId')
      .getRawMany();
  }
}
