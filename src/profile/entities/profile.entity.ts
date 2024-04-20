import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 100 })
  firstname: string;
  @Column({ type: 'varchar', length: 100 })
  lastname: string;
  @Column({ type: 'int', default: 0 })
  followersCount: number;
  @Column({ type: 'int', default: 0 })
  followingCount: number;
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserEntity;
}
