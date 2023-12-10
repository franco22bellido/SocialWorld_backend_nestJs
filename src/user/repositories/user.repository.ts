import {UserEntity} from '../entities/user.entity'
import {Repository, DataSource} from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends Repository<UserEntity>{

    con
}