import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PostEntity } from '../posts/entities/post.entity';
import { AuthModule } from '../auth/auth.module';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { ProfileModule } from '../profile/profile.module';
import { PostRepositoryPostgres } from 'src/posts/repositories/post.repository.postgres';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ProfileModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserRepository,
      PostEntity,
      ProfileEntity,
    ]),
  ],
  providers: [UserService, UserRepository, PostRepositoryPostgres],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
