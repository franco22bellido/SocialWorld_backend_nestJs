import { UserEntity } from 'src/user/entities/user.entity';
import {Column, Entity, ManyToOne} from 'typeorm'

@Entity({name : "followers"})
export class FollowersEntity{

    @Column({primary: true})
    followerId : number;

    @Column({primary: true})
    idolId: number;

    @ManyToOne(()=> UserEntity, user => user.followers)
    follower: UserEntity;

    @ManyToOne(()=> UserEntity, user => user.idols)
    idol: UserEntity;

}