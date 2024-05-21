import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { PostEntity } from './posts/entities/post.entity';
import { LikeEntity } from './likes/entities/like.entity';
import { CommentEntity } from './comments/entities/comment.entity';
import { FollowersModule } from './followers/followers.module';
import { FollowersEntity } from './followers/entities/followers.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/entities/profile.entity';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => {
        return {
          type: 'postgres',
          ssl: true,
          host: _configService.get<string>('DB_HOST'),
          port: _configService.get<number>('DB_PORT'),
          username: _configService.get<string>('DB_USERNAME'),
          password: _configService.get<string>('DB_PASSWORD'),
          database: _configService.get<string>('DB_NAME'),
          entities: [
            UserEntity,
            PostEntity,
            LikeEntity,
            CommentEntity,
            FollowersEntity,
            ProfileEntity,
          ],
          synchronize: true,
        };
      },
    }),
    PostsModule,
    LikesModule,
    CommentsModule,
    AuthModule,
    FollowersModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
