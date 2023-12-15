import {UserEntity} from '../entities/user.entity'
import {Repository, DataSource} from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends Repository<UserEntity>{

    constructor(private _dataSource: DataSource){
        super(UserEntity, _dataSource.createEntityManager())
    }
    async getFollowers(id: number) {
        return await this.findOne({where: {id}, relations: {followers: true}});
    }
}