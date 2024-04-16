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

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Ironman312345aAA',
      database: 'social_world',
      entities: [
        UserEntity,
        PostEntity,
        LikeEntity,
        CommentEntity,
        FollowersEntity,
      ],
      synchronize: true,
    }),
    PostsModule,
    LikesModule,
    CommentsModule,
    AuthModule,
    FollowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
