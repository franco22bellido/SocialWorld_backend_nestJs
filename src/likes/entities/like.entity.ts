import { PostEntity } from "src/posts/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";

@Entity({name: "likes"})
export class LikeEntity {

    @Column({primary: true})
    userId: number;

    @Column({primary: true})
    postId: number;


    @ManyToOne(()=> UserEntity, user => user.likes)
    @JoinColumn({
        name: "userId",
        referencedColumnName: "id"
    })
    user: UserEntity;

    
    @ManyToOne(()=> PostEntity, post => post.likes)
    @JoinColumn({
        name: "postId",
        referencedColumnName: "id"
    })
    post: PostEntity
}