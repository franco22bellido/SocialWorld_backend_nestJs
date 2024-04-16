import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity])
  ],
  providers: [LikesService],
  controllers: [LikesController]
})
export class LikesModule {}
