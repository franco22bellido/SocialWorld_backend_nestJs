import { UserEntity } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  constructor(private _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }
  async findByUsername(username: string) {
    const userByUsername = await this.findOne({
      where: { username: username.toLowerCase() },
    });
    return userByUsername;
  }
  async findByUsernameWithProfileAndPosts(username: string) {
    const userByUsername = await this.findOne({
      where: { username: username.toLowerCase() },
      relations: { profile: true, posts: true },
    });
    return userByUsername;
  }
  async findByUsernameAndSelectPassword(username: string) {
    const userByUsername = await this.findOne({
      where: { username: username.toLowerCase() },
      select: { password: true, id: true, username: true },
    });
    return userByUsername;
  }
  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
  async findOneByUsernameOrSimilar(partialUsername: string) {
    return this.createQueryBuilder('user')
      .where('user.username like :partialUsername', {
        partialUsername: `%${partialUsername.toLowerCase()}%`,
      })
      .take(10)
      .getMany();
  }
}
