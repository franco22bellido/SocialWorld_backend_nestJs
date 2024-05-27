import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'followers' })
export class FollowersEntity {
  @Column({ primary: true })
  followerId: number;

  @Column({ primary: true })
  idolId: number;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    onDelete: 'CASCADE',
  })
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.idols, { onDelete: 'CASCADE' })
  idol: UserEntity;
}
