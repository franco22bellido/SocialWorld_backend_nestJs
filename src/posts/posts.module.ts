import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostRepository } from './repositories/post.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PostRepositoryPostgres } from './repositories/post.repository.postgres';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostEntity, UserEntity])],
  providers: [PostsService, PostRepository, PostRepositoryPostgres],
  controllers: [PostsController],
})
export class PostsModule {}
