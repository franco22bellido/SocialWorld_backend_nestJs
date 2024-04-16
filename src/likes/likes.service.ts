import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(LikeEntity)
        private readonly likesRepository: Repository<LikeEntity>
    ){
    }

    async findTheMostPopularPosts(){
        //limit 10
        return await 
        this.likesRepository.createQueryBuilder('likes').
         select("COUNT(*) AS cantidadDeLikes")
        .leftJoinAndSelect('likes.post', 'post')
        .orderBy('cantidadDeLikes', 'DESC')
        .take(10)
        .groupBy('likes.postId')
        .getRawMany();


    }

    
}