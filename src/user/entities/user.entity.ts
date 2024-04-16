import { CommentEntity } from 'src/comments/entities/comment.entity';
import { FollowersEntity } from 'src/followers/entities/followers.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @OneToMany(() => PostEntity, (posts) => posts.user)
  posts: PostEntity[];

  @OneToMany(() => LikeEntity, (likes) => likes.user)
  likes: LikeEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.user)
  comments: CommentEntity[];

  @OneToMany(() => FollowersEntity, (followers) => followers.follower)
  followers: FollowersEntity[];

  @OneToMany(() => FollowersEntity, (idols) => idols.idol)
  idols: FollowersEntity[];
}
