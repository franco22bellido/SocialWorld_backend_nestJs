import { CommentEntity } from 'src/comments/entities/comment.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 255, type: 'varchar' })
  text: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  craetedAt: Date;
  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: 'int', default: 0, nullable: false })
  commentsCount: number;
  @Column({ type: 'int', default: 0, nullable: false })
  likesCount: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @OneToMany(() => LikeEntity, (likes) => likes.post)
  likes: LikeEntity[];

  @OneToMany(() => CommentEntity, (comments) => comments.post, { eager: false })
  comments: CommentEntity[];
}
