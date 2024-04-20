import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PostEntity } from 'src/posts/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileEntity } from 'src/profile/entities/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';

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
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
