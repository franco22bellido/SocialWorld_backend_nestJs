import { UserEntity } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @Column({ type: 'varchar', length: 150, default: '' })
  info: string;
  @Column({ type: 'int', default: 0 })
  followersCount: number;
  @Column({ type: 'int', default: 0 })
  followingCount: number;
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;
}
