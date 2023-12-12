import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PostEntity } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository, PostEntity])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
