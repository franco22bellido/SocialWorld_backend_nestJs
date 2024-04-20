import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowersEntity } from './entities/followers.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { followersRepository } from './repositories/followers.repository';
import { AuthModule } from 'src/auth/auth.module';
import { FollowingController } from './following.controller';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      FollowersEntity,
      followersRepository,
      UserEntity,
    ]),
  ],
  providers: [FollowersService, followersRepository],
  controllers: [FollowersController, FollowingController],
})
export class FollowersModule {}
