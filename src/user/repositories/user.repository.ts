import { UserEntity } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }
  async findByUsername(username: string) {
    const userByUsername = await this.findOne({ where: { username } });
    return userByUsername;
  }
  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
}
