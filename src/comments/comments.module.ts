import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { CommentsRepository } from './comments.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), AuthModule],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
})
export class CommentsModule {}
