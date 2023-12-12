import { PostEntity } from "src/posts/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'comments'})
export class CommentEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    text : string;

    @Column()
    postId: number

    @Column()
    userId: number

    @ManyToOne(()=> UserEntity , user => user.comments)
    @JoinColumn({
        name: "userId",
        referencedColumnName: "id"
    })
    user: UserEntity;

    @ManyToOne(()=> PostEntity, post => post.comments)
    @JoinColumn({
        name: "postId",
        referencedColumnName: "id"
    })
    post: PostEntity;
}  
