import { Injectable } from "@nestjs/common/decorators";
import { DataSource, Repository } from "typeorm";
import { PostEntity } from "../entities/post.entity";

@Injectable()
export class PostRepository extends Repository<PostEntity>{

    constructor(private readonly _dataSource: DataSource){
        super(PostEntity, _dataSource.createEntityManager())
    }

    findPostsByUserId(){}
}